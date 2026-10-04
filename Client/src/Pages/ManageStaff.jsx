import { useEffect, useRef, useState } from "react";
import API from "../Services/api";
import { Pencil, Plus, Save, Trash2, Users, X } from "lucide-react";

const ManageStaff = () => {
  const [staff, setStaff] = useState([]);
  const [reloadKey, setReloadKey] = useState(0);
  const [editingId, setEditingId] = useState(null);
  const photoInputRef = useRef(null);

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

  useEffect(() => {
    API.get("/staff/admin")
      .then(({ data }) => setStaff(data))
      .catch((error) => console.log(error));
  }, [reloadKey]);

  const reloadStaff = () => setReloadKey((key) => key + 1);

  // React doesn't control file inputs, so clear the chosen file by hand
  const clearPhotoInput = () => {
    if (photoInputRef.current) {
      photoInputRef.current.value = "";
    }
  };

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
    clearPhotoInput();
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
      reloadStaff();
    } catch (error) {
      console.log(error);
      alert(error.response?.data?.message || "Operation failed");
    }
  };

  const handleEdit = (member) => {
    setEditingId(member._id);
    clearPhotoInput();

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
      reloadStaff();
    } catch (error) {
      console.log(error);
      alert(error.response?.data?.message || "Delete failed");
    }
  };

  return (
    <div>
      <h2 className="flex items-center gap-3 text-2xl font-bold text-maroon-900">
        <Users className="h-7 w-7 text-maroon-700" aria-hidden="true" />
        Manage Staff
      </h2>

      <form
        onSubmit={handleSubmit}
        className="mt-6 grid gap-4 rounded-2xl bg-white p-6 shadow-md ring-1 ring-stone-200/70"
      >
        <input
          type="text"
          name="name_en"
          placeholder="Name (English)"
          value={form.name_en}
          onChange={handleChange}
          className="input"
          required
        />

        <input
          type="text"
          name="name_si"
          placeholder="Name (Sinhala)"
          value={form.name_si}
          onChange={handleChange}
          className="input"
          required
        />

        <input
          type="text"
          name="position_en"
          placeholder="Position (English)"
          value={form.position_en}
          onChange={handleChange}
          className="input"
          required
        />

        <input
          type="text"
          name="position_si"
          placeholder="Position (Sinhala)"
          value={form.position_si}
          onChange={handleChange}
          className="input"
          required
        />

        <input
          ref={photoInputRef}
          type="file"
          name="photo"
          accept="image/jpeg,image/png,image/webp"
          onChange={handleChange}
          className="input file-input"
        />

        <input
          type="email"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          className="input"
        />

        <input
          type="text"
          name="phone"
          placeholder="Phone"
          value={form.phone}
          onChange={handleChange}
          className="input"
        />

        <textarea
          name="bio_en"
          placeholder="Bio (English)"
          value={form.bio_en}
          onChange={handleChange}
          rows="4"
          className="input"
        />

        <textarea
          name="bio_si"
          placeholder="Bio (Sinhala)"
          value={form.bio_si}
          onChange={handleChange}
          rows="4"
          className="input"
        />

        <input
          type="number"
          name="order"
          placeholder="Order"
          value={form.order}
          onChange={handleChange}
          className="input"
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
          className={`inline-flex items-center justify-center gap-2 rounded-xl py-3 font-semibold text-white shadow transition hover:-translate-y-0.5 ${editingId ? "bg-green-700 hover:bg-green-600" : "bg-maroon-800 hover:bg-maroon-700"}`}
        >
          {editingId ? (
            <Save className="h-5 w-5" aria-hidden="true" />
          ) : (
            <Plus className="h-5 w-5" aria-hidden="true" />
          )}
          {editingId ? "Update Staff" : "Add Staff Member"}
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
        {staff.map((member) => (
          <div
            key={member._id}
            className="animate-fade-up rounded-2xl bg-white p-5 shadow-sm ring-1 ring-stone-200/70 transition hover:shadow-md"
          >
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <div>
                <h3 className="font-bold text-maroon-900">
                  {member.name?.en || "No English name"}
                </h3>
                <p className="text-sm text-stone-600">
                  {member.name?.si || "No Sinhala name"}
                </p>
                <p className="mt-1 text-sm text-stone-500">
                  {member.position?.en || ""} / {member.position?.si || ""}
                </p>
              </div>

              <div className="flex gap-2">
                <button
                  onClick={() => handleEdit(member)}
                  className="inline-flex items-center gap-1.5 rounded-lg bg-gold-300 px-4 py-2 font-medium text-maroon-900 transition hover:bg-gold-200"
                >
                  <Pencil className="h-4 w-4" aria-hidden="true" />
                  Edit
                </button>

                <button
                  onClick={() => handleDelete(member._id)}
                  className="inline-flex items-center gap-1.5 rounded-lg bg-red-600 px-4 py-2 font-medium text-white transition hover:bg-red-700"
                >
                  <Trash2 className="h-4 w-4" aria-hidden="true" />
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
