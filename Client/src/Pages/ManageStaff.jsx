import { useEffect, useState } from "react";
import API from "../services/api";

const ManageStaff = () => {
  const [staff, setStaff] = useState([]);
  const [editingId, setEditingId] = useState(null);

  const [form, setForm] = useState({
    name_en: "",
    name_si: "",
    position_en: "",
    position_si: "",
    photo: null,
    email: "",
    phone: "",
    bio_en: "",
    bio_si: "",
    order: 0,
    isActive: true,
  });

  const fetchStaff = async () => {
    try {
      const { data } = await API.get("/staff/admin");
      setStaff(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchStaff();
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]:
        type === "checkbox" ? checked : type === "file" ? files[0] : value,
    }));
  };

  const resetForm = () => {
    setForm({
      name_en: "",
      name_si: "",
      position_en: "",
      position_si: "",
      photo: null,
      email: "",
      phone: "",
      bio_en: "",
      bio_si: "",
      order: 0,
      isActive: true,
    });
    setEditingId(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name_en", form.name_en);
    formData.append("name_si", form.name_si);
    formData.append("position_en", form.position_en);
    formData.append("position_si", form.position_si);
    formData.append("email", form.email);
    formData.append("phone", form.phone);
    formData.append("bio_en", form.bio_en);
    formData.append("bio_si", form.bio_si);
    formData.append("order", form.order);
    formData.append("isActive", form.isActive);

    if (form.photo) {
      formData.append("photo", form.photo);
    }

    try {
      if (editingId) {
        await API.put(`/staff/${editingId}`, formData);
      } else {
        await API.post("/staff", formData);
      }

      resetForm();
      fetchStaff();
    } catch (error) {
      console.log(error);
      alert(error.response?.data?.message || "Operation failed");
    }
  };

  const handleEdit = (member) => {
    setEditingId(member._id);

    setForm({
      name_en: member.name?.en || "",
      name_si: member.name?.si || "",
      position_en: member.position?.en || "",
      position_si: member.position?.si || "",
      photo: null,
      email: member.email || "",
      phone: member.phone || "",
      bio_en: member.bio?.en || "",
      bio_si: member.bio?.si || "",
      order: member.order || 0,
      isActive: member.isActive ?? true,
    });
  };

  const handleDelete = async (id) => {
    const ok = window.confirm("Delete this staff member?");
    if (!ok) return;

    try {
      await API.delete(`/staff/${id}`);
      fetchStaff();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-bold text-blue-900">Manage Staff</h2>

      <form
        onSubmit={handleSubmit}
        className="mt-6 grid gap-4 rounded-xl bg-white p-6 shadow-md"
      >
        <input
          type="text"
          name="name_en"
          placeholder="Name (English)"
          value={form.name_en}
          onChange={handleChange}
          className="rounded-lg border p-3"
          required
        />

        <input
          type="text"
          name="name_si"
          placeholder="Name (Sinhala)"
          value={form.name_si}
          onChange={handleChange}
          className="rounded-lg border p-3"
          required
        />

        <input
          type="text"
          name="position_en"
          placeholder="Position (English)"
          value={form.position_en}
          onChange={handleChange}
          className="rounded-lg border p-3"
          required
        />

        <input
          type="text"
          name="position_si"
          placeholder="Position (Sinhala)"
          value={form.position_si}
          onChange={handleChange}
          className="rounded-lg border p-3"
          required
        />

        <input
          type="file"
          name="photo"
          onChange={handleChange}
          className="rounded-lg border p-3"
        />

        <input
          type="email"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          className="rounded-lg border p-3"
        />

        <input
          type="text"
          name="phone"
          placeholder="Phone"
          value={form.phone}
          onChange={handleChange}
          className="rounded-lg border p-3"
        />

        <textarea
          name="bio_en"
          placeholder="Bio (English)"
          value={form.bio_en}
          onChange={handleChange}
          rows="4"
          className="rounded-lg border p-3"
        />

        <textarea
          name="bio_si"
          placeholder="Bio (Sinhala)"
          value={form.bio_si}
          onChange={handleChange}
          rows="4"
          className="rounded-lg border p-3"
        />

        <input
          type="number"
          name="order"
          placeholder="Order"
          value={form.order}
          onChange={handleChange}
          className="rounded-lg border p-3"
        />

        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            name="isActive"
            checked={form.isActive}
            onChange={handleChange}
          />
          Active
        </label>

        <button
          className={`rounded-lg py-3 font-semibold text-white ${
            editingId ? "bg-green-600" : "bg-blue-900"
          }`}
        >
          {editingId ? "Update Staff" : "Add Staff Member"}
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
        {staff.map((member) => (
          <div key={member._id} className="rounded-xl bg-white p-4 shadow">
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <div>
                <h3 className="font-bold text-blue-900">
                  {member.name?.en || "No English name"}
                </h3>
                <p className="text-sm text-gray-600">
                  {member.name?.si || "No Sinhala name"}
                </p>
                <p className="mt-1 text-sm text-gray-500">
                  {member.position?.en || ""} / {member.position?.si || ""}
                </p>
              </div>

              <div className="flex gap-2">
                <button
                  onClick={() => handleEdit(member)}
                  className="rounded bg-yellow-500 px-4 py-2 text-white cursor-pointer"
                >
                  Edit
                </button>

                <button
                  onClick={() => handleDelete(member._id)}
                  className="rounded bg-red-500 px-4 py-2 text-white cursor-pointer"
                >
                  Delete
                </button>
              </div>
            </div>

            {member.photo && (
              <img
                src={member.photo}
                alt={member.name?.en || "Staff"}
                className="mt-4 h-40 w-40 rounded-lg object-cover"
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ManageStaff;
