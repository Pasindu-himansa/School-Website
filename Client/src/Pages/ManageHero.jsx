import { useEffect, useRef, useState } from "react";
import API from "../Services/api.js";
import { Images, Pencil, Plus, Save, Trash2, X } from "lucide-react";

const ManageHero = () => {
  const [slides, setSlides] = useState([]);
  const [reloadKey, setReloadKey] = useState(0);
  const [editingId, setEditingId] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState("");
  const fileInputRef = useRef(null);

  const [form, setForm] = useState({
    title_en: "",
    title_si: "",
    subtitle_en: "",
    subtitle_si: "",
    buttonText_en: "",
    buttonText_si: "",
    buttonLink: "",
    order: 1,
    isActive: true,
  });

  useEffect(() => {
    API.get("/hero/admin")
      .then(({ data }) => setSlides(data))
      .catch((error) => console.log("Error fetching slides:", error));
  }, [reloadKey]);

  const reloadSlides = () => setReloadKey((key) => key + 1);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const releasePreview = () => {
    if (imagePreview.startsWith("blob:")) {
      URL.revokeObjectURL(imagePreview);
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      releasePreview();
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  // React doesn't control file inputs, so clear the chosen file by hand
  const clearImage = () => {
    releasePreview();
    setImageFile(null);
    setImagePreview("");
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const resetForm = () => {
    setForm({
      title_en: "",
      title_si: "",
      subtitle_en: "",
      subtitle_si: "",
      buttonText_en: "",
      buttonText_si: "",
      buttonLink: "",
      order: 1,
      isActive: true,
    });
    setEditingId(null);
    clearImage();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();

      // Append all text fields
      Object.entries(form).forEach(([key, value]) => {
        formData.append(key, value);
      });

      // Append image only if a new one was selected
      if (imageFile) {
        formData.append("image", imageFile);
      }

      if (editingId) {
        await API.put(`/hero/${editingId}`, formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
      } else {
        await API.post("/hero", formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
      }

      resetForm();
      reloadSlides();
    } catch (error) {
      console.log("Error saving slide:", error);
      alert(error.response?.data?.message || "Operation failed");
    }
  };

  const handleEdit = (slide) => {
    setEditingId(slide._id);
    clearImage();
    setImagePreview(slide.imageUrl || "");

    setForm({
      title_en: slide.title?.en || "",
      title_si: slide.title?.si || "",
      subtitle_en: slide.subtitle?.en || "",
      subtitle_si: slide.subtitle?.si || "",
      buttonText_en: slide.buttonText?.en || "",
      buttonText_si: slide.buttonText?.si || "",
      buttonLink: slide.buttonLink || "",
      order: slide.order || 1,
      isActive: slide.isActive ?? true,
    });
  };

  const handleDelete = async (id) => {
    const ok = window.confirm("Delete this slide?");
    if (!ok) return;

    try {
      await API.delete(`/hero/${id}`);
      reloadSlides();
    } catch (error) {
      console.log("Error deleting slide:", error);
      alert(error.response?.data?.message || "Delete failed");
    }
  };

  return (
    <div>
      <h2 className="flex items-center gap-3 text-2xl font-bold text-maroon-900">
        <Images className="h-7 w-7 text-maroon-700" aria-hidden="true" />
        Manage Hero Slides
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
          name="subtitle_en"
          placeholder="Subtitle (English)"
          value={form.subtitle_en}
          onChange={handleChange}
          className="input"
        />
        <input
          type="text"
          name="subtitle_si"
          placeholder="Subtitle (Sinhala)"
          value={form.subtitle_si}
          onChange={handleChange}
          className="input"
        />

        {/* Image Upload */}
        <div className="input">
          <label className="mb-2 block text-sm font-medium text-stone-700">
            Hero Image {editingId && "(leave empty to keep current image)"}
          </label>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/jpeg,image/png,image/webp"
            onChange={handleImageChange}
            className="file-input w-full"
            required={!editingId}
          />
          {imagePreview && (
            <img
              src={imagePreview}
              alt="Preview"
              className="mt-3 h-40 w-full rounded-lg object-cover"
            />
          )}
        </div>

        <input
          type="text"
          name="buttonText_en"
          placeholder="Button Text (English)"
          value={form.buttonText_en}
          onChange={handleChange}
          className="input"
        />
        <input
          type="text"
          name="buttonText_si"
          placeholder="Button Text (Sinhala)"
          value={form.buttonText_si}
          onChange={handleChange}
          className="input"
        />
        <input
          type="text"
          name="buttonLink"
          placeholder="Button Link"
          value={form.buttonLink}
          onChange={handleChange}
          className="input"
        />
        <input
          type="number"
          name="order"
          min="1"
          max="3"
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
          {editingId ? "Update Slide" : "Add Slide"}
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
        {slides.map((slide) => (
          <div
            key={slide._id}
            className="animate-fade-up rounded-2xl bg-white p-5 shadow-sm ring-1 ring-stone-200/70 transition hover:shadow-md"
          >
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <div>
                <h3 className="font-bold text-maroon-900">
                  {slide.title?.en || "No English title"}
                </h3>
                <p className="text-sm text-stone-600">
                  {slide.title?.si || "No Sinhala title"}
                </p>
                <p className="mt-1 text-sm text-stone-500">
                  Order: {slide.order} |{" "}
                  {slide.isActive ? "Active" : "Inactive"}
                </p>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => handleEdit(slide)}
                  className="inline-flex items-center gap-1.5 rounded-lg bg-gold-300 px-4 py-2 font-medium text-maroon-900 transition hover:bg-gold-200"
                >
                  <Pencil className="h-4 w-4" aria-hidden="true" />
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(slide._id)}
                  className="inline-flex items-center gap-1.5 rounded-lg bg-red-600 px-4 py-2 font-medium text-white transition hover:bg-red-700"
                >
                  <Trash2 className="h-4 w-4" aria-hidden="true" />
                  Delete
                </button>
              </div>
            </div>
            {slide.imageUrl && (
              <img
                src={slide.imageUrl}
                alt={slide.title?.en || "Hero slide"}
                className="mt-4 h-40 w-full rounded-lg object-cover"
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ManageHero;
