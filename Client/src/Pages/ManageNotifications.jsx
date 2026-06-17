import { useEffect, useState } from "react";
import API from "../Services/api";

const ManageNotifications = () => {
  const [notifications, setNotifications] = useState([]);
  const [editingId, setEditingId] = useState(null);

  const [form, setForm] = useState({
    title_en: "",
    title_si: "",
    summary_en: "",
    summary_si: "",
    content_en: "",
    content_si: "",
    imageUrl: "",
    category_en: "General",
    category_si: "සාමාන්‍ය",
    isSpecial: false,
    isPublished: true,
  });

  const fetchNotifications = async () => {
    try {
      const { data } = await API.get("/notifications/admin/all");
      setNotifications(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchNotifications();
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setForm({
      ...form,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const resetForm = () => {
    setForm({
      title_en: "",
      title_si: "",
      summary_en: "",
      summary_si: "",
      content_en: "",
      content_si: "",
      imageUrl: "",
      category_en: "General",
      category_si: "සාමාන්‍ය",
      isSpecial: false,
      isPublished: true,
    });

    setEditingId(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (editingId) {
        await API.put(`/notifications/${editingId}`, form);
      } else {
        await API.post("/notifications", form);
      }

      resetForm();
      fetchNotifications();
    } catch (error) {
      console.log(error);
      alert(error.response?.data?.message || "Operation failed");
    }
  };

  const handleEdit = (item) => {
    setEditingId(item._id);

    setForm({
      title_en: item.title?.en || "",
      title_si: item.title?.si || "",
      summary_en: item.summary?.en || "",
      summary_si: item.summary?.si || "",
      content_en: item.content?.en || "",
      content_si: item.content?.si || "",
      imageUrl: item.imageUrl || "",
      category_en: item.category?.en || "General",
      category_si: item.category?.si || "සාමාන්‍ය",
      isSpecial: item.isSpecial ?? false,
      isPublished: item.isPublished ?? true,
    });
  };

  const handleDelete = async (id) => {
    const ok = window.confirm("Delete this notification?");
    if (!ok) return;

    try {
      await API.delete(`/notifications/${id}`);
      fetchNotifications();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-bold text-blue-900">Manage Notifications</h2>

      <form
        onSubmit={handleSubmit}
        className="mt-6 grid gap-4 rounded-xl bg-white p-6 shadow-md"
      >
        <input
          type="text"
          name="title_en"
          placeholder="Title (English)"
          value={form.title_en}
          onChange={handleChange}
          className="rounded-lg border p-3"
          required
        />

        <input
          type="text"
          name="title_si"
          placeholder="Title (Sinhala)"
          value={form.title_si}
          onChange={handleChange}
          className="rounded-lg border p-3"
          required
        />

        <input
          type="text"
          name="summary_en"
          placeholder="Summary (English)"
          value={form.summary_en}
          onChange={handleChange}
          className="rounded-lg border p-3"
        />

        <input
          type="text"
          name="summary_si"
          placeholder="Summary (Sinhala)"
          value={form.summary_si}
          onChange={handleChange}
          className="rounded-lg border p-3"
        />

        <input
          type="text"
          name="imageUrl"
          placeholder="Image URL"
          value={form.imageUrl}
          onChange={handleChange}
          className="rounded-lg border p-3"
        />

        <input
          type="text"
          name="category_en"
          placeholder="Category (English)"
          value={form.category_en}
          onChange={handleChange}
          className="rounded-lg border p-3"
        />

        <input
          type="text"
          name="category_si"
          placeholder="Category (Sinhala)"
          value={form.category_si}
          onChange={handleChange}
          className="rounded-lg border p-3"
        />

        <textarea
          name="content_en"
          placeholder="Content (English)"
          value={form.content_en}
          onChange={handleChange}
          className="rounded-lg border p-3"
          rows="5"
          required
        ></textarea>

        <textarea
          name="content_si"
          placeholder="Content (Sinhala)"
          value={form.content_si}
          onChange={handleChange}
          className="rounded-lg border p-3"
          rows="5"
          required
        ></textarea>

        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            name="isSpecial"
            checked={form.isSpecial}
            onChange={handleChange}
          />
          Special Notification
        </label>

        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            name="isPublished"
            checked={form.isPublished}
            onChange={handleChange}
          />
          Published
        </label>

        <button
          className={`rounded-lg py-3 font-semibold text-white ${
            editingId ? "bg-green-600" : "bg-blue-900"
          }`}
        >
          {editingId ? "Update Notification" : "Add Notification"}
        </button>

        {editingId && (
          <button
            type="button"
            onClick={resetForm}
            className="rounded-lg bg-gray-400 py-2 text-white"
          >
            Cancel Edit
          </button>
        )}
      </form>

      <div className="mt-8 grid gap-4">
        {notifications.map((item) => (
          <div key={item._id} className="rounded-xl bg-white p-4 shadow">
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <div>
                <h3 className="font-bold text-blue-900">
                  {item.title?.en || "No English title"}
                </h3>
                <p className="text-sm text-gray-600">
                  {item.title?.si || "No Sinhala title"}
                </p>
                <p className="mt-1 text-sm text-gray-500">
                  {item.category?.en || ""} / {item.category?.si || ""}
                </p>
                <p className="mt-1 text-sm text-gray-500">
                  {item.isSpecial ? "Special" : "Normal"} |{" "}
                  {item.isPublished ? "Published" : "Draft"}
                </p>
              </div>

              <div className="flex gap-2">
                <button
                  onClick={() => handleEdit(item)}
                  className="rounded bg-yellow-500 px-4 py-2 text-white"
                >
                  Edit
                </button>

                <button
                  onClick={() => handleDelete(item._id)}
                  className="rounded bg-red-500 px-4 py-2 text-white"
                >
                  Delete
                </button>
              </div>
            </div>

            {item.imageUrl && (
              <img
                src={item.imageUrl}
                alt={item.title?.en || "Notification"}
                className="mt-4 h-40 w-full rounded-lg object-cover"
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ManageNotifications;
