import { useEffect, useState } from "react";
import API from "../Services/api";
import { Bell, Pencil, Plus, Save, Trash2, X } from "lucide-react";

const ManageNotifications = () => {
  const [notifications, setNotifications] = useState([]);
  const [reloadKey, setReloadKey] = useState(0);
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

  useEffect(() => {
    API.get("/notifications/admin/all")
      .then(({ data }) => setNotifications(data))
      .catch((error) => console.log(error));
  }, [reloadKey]);

  const reloadNotifications = () => setReloadKey((key) => key + 1);

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
      reloadNotifications();
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
      reloadNotifications();
    } catch (error) {
      console.log(error);
      alert(error.response?.data?.message || "Delete failed");
    }
  };

  return (
    <div>
      <h2 className="flex items-center gap-3 text-2xl font-bold text-maroon-900">
        <Bell className="h-7 w-7 text-maroon-700" aria-hidden="true" />
        Manage Notifications
      </h2>

      <form
        onSubmit={handleSubmit}
        className="mt-6 grid gap-4 rounded-2xl bg-white p-6 shadow-md ring-1 ring-stone-200/70"
      >
        <input
          type="text"
          name="title_en"
          placeholder="Title (English)"
          value={form.title_en}
          onChange={handleChange}
          className="input"
          required
        />

        <input
          type="text"
          name="title_si"
          placeholder="Title (Sinhala)"
          value={form.title_si}
          onChange={handleChange}
          className="input"
          required
        />

        <input
          type="text"
          name="summary_en"
          placeholder="Summary (English)"
          value={form.summary_en}
          onChange={handleChange}
          className="input"
        />

        <input
          type="text"
          name="summary_si"
          placeholder="Summary (Sinhala)"
          value={form.summary_si}
          onChange={handleChange}
          className="input"
        />

        <input
          type="text"
          name="imageUrl"
          placeholder="Image URL"
          value={form.imageUrl}
          onChange={handleChange}
          className="input"
        />

        <input
          type="text"
          name="category_en"
          placeholder="Category (English)"
          value={form.category_en}
          onChange={handleChange}
          className="input"
        />

        <input
          type="text"
          name="category_si"
          placeholder="Category (Sinhala)"
          value={form.category_si}
          onChange={handleChange}
          className="input"
        />

        <textarea
          name="content_en"
          placeholder="Content (English)"
          value={form.content_en}
          onChange={handleChange}
          className="input"
          rows="5"
          required
        ></textarea>

        <textarea
          name="content_si"
          placeholder="Content (Sinhala)"
          value={form.content_si}
          onChange={handleChange}
          className="input"
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
          className={`inline-flex items-center justify-center gap-2 rounded-xl py-3 font-semibold text-white shadow transition hover:-translate-y-0.5 ${editingId ? "bg-green-700 hover:bg-green-600" : "bg-maroon-800 hover:bg-maroon-700"}`}
        >
          {editingId ? (
            <Save className="h-5 w-5" aria-hidden="true" />
          ) : (
            <Plus className="h-5 w-5" aria-hidden="true" />
          )}
          {editingId ? "Update Notification" : "Add Notification"}
        </button>

        {editingId && (
          <button
            type="button"
            onClick={resetForm}
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-stone-200 py-2.5 font-medium text-stone-700 transition hover:bg-stone-300"
          >
            <X className="h-4 w-4" aria-hidden="true" />
            Cancel Edit
          </button>
        )}
      </form>

      <div className="mt-8 grid gap-4">
        {notifications.map((item) => (
          <div
            key={item._id}
            className="animate-fade-up rounded-2xl bg-white p-5 shadow-sm ring-1 ring-stone-200/70 transition hover:shadow-md"
          >
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <div>
                <h3 className="font-bold text-maroon-900">
                  {item.title?.en || "No English title"}
                </h3>
                <p className="text-sm text-stone-600">
                  {item.title?.si || "No Sinhala title"}
                </p>
                <p className="mt-1 text-sm text-stone-500">
                  {item.category?.en || ""} / {item.category?.si || ""}
                </p>
                <p className="mt-1 text-sm text-stone-500">
                  {item.isSpecial ? "Special" : "Normal"} |{" "}
                  {item.isPublished ? "Published" : "Draft"}
                </p>
              </div>

              <div className="flex gap-2">
                <button
                  onClick={() => handleEdit(item)}
                  className="inline-flex items-center gap-1.5 rounded-lg bg-gold-300 px-4 py-2 font-medium text-maroon-900 transition hover:bg-gold-200"
                >
                  <Pencil className="h-4 w-4" aria-hidden="true" />
                  Edit
                </button>

                <button
                  onClick={() => handleDelete(item._id)}
                  className="inline-flex items-center gap-1.5 rounded-lg bg-red-600 px-4 py-2 font-medium text-white transition hover:bg-red-700"
                >
                  <Trash2 className="h-4 w-4" aria-hidden="true" />
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
