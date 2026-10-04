import { useState } from "react";
import { useTranslation } from "react-i18next";
import API from "../Services/api";

const Contact = () => {
  const { t } = useTranslation();

  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [sending, setSending] = useState(false);
  const [status, setStatus] = useState(null); // "success" | "error"

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSending(true);
    setStatus(null);

    try {
      await API.post("/messages", form);
      setStatus("success");
      setForm({ name: "", email: "", message: "" });
    } catch (error) {
      console.log("Error sending message:", error);
      setStatus("error");
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="bg-gray-50 py-16">
      <div className="mx-auto max-w-6xl px-6">
        <h1 className="mb-10 text-center text-4xl font-bold text-blue-900">
          {t("contact.title")}
        </h1>

        <div className="grid gap-10 md:grid-cols-2">
          <div className="rounded-xl bg-white p-8 shadow-md">
            <h2 className="mb-4 text-2xl font-semibold text-blue-900">
              {t("contact.infoTitle")}
            </h2>

            <div className="space-y-4 text-gray-700">
              <p>
                <strong>{t("contact.addressLabel")}:</strong>
                <br />
                {t("contact.address")}
              </p>

              <p>
                <strong>{t("contact.phoneLabel")}:</strong>
                <br />
                {t("contact.phone")}
              </p>

              <p>
                <strong>{t("contact.emailLabel")}:</strong>
                <br />
                {t("contact.email")}
              </p>

              <p>
                <strong>{t("contact.hoursLabel")}:</strong>
                <br />
                {t("contact.hours")}
              </p>
            </div>
          </div>

          <div className="rounded-xl bg-white p-8 shadow-md">
            <h2 className="mb-4 text-2xl font-semibold text-blue-900">
              {t("contact.formTitle")}
            </h2>

            {status && (
              <div
                className={`mb-5 rounded-lg px-4 py-3 text-sm ${
                  status === "success"
                    ? "bg-green-100 text-green-800"
                    : "bg-red-100 text-red-700"
                }`}
              >
                {t(`contact.${status}`)}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block text-sm font-semibold text-gray-700">
                  {t("contact.name")}
                </label>

                <input
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  required
                  className="mt-1 w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-blue-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700">
                  {t("contact.emailLabel")}
                </label>

                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  required
                  className="mt-1 w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-blue-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700">
                  {t("contact.message")}
                </label>

                <textarea
                  name="message"
                  rows="4"
                  value={form.message}
                  onChange={handleChange}
                  required
                  className="mt-1 w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-blue-500 focus:outline-none"
                ></textarea>
              </div>

              <button
                type="submit"
                disabled={sending}
                className="w-full rounded-lg bg-blue-900 py-2 font-semibold text-white transition hover:bg-blue-800 disabled:opacity-70"
              >
                {sending ? t("contact.sending") : t("contact.send")}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
