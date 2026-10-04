import { useState } from "react";
import { useTranslation } from "react-i18next";
import {
  CircleAlert,
  CircleCheck,
  Clock,
  LoaderCircle,
  Mail,
  MapPin,
  MessageSquare,
  Phone,
  Send,
  User,
} from "lucide-react";
import API from "../Services/api";
import PageHeader from "../Components/PageHeader";
import Reveal from "../Components/Reveal";

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

  const infoItems = [
    {
      icon: MapPin,
      label: t("contact.addressLabel"),
      value: t("contact.address"),
    },
    {
      icon: Phone,
      label: t("contact.phoneLabel"),
      value: t("contact.phone"),
      href: `tel:${t("contact.phone").replace(/\s/g, "")}`,
    },
    {
      icon: Mail,
      label: t("contact.emailLabel"),
      value: t("contact.email"),
      href: `mailto:${t("contact.email")}`,
    },
    { icon: Clock, label: t("contact.hoursLabel"), value: t("contact.hours") },
  ];

  const fieldIcon =
    "pointer-events-none absolute top-3.5 left-4 h-5 w-5 text-stone-400";

  return (
    <div>
      <PageHeader
        icon={Mail}
        title={t("contact.title")}
        subtitle={t("contact.subtitle")}
      />

      <section className="mx-auto max-w-6xl px-6 py-16">
        <div className="grid gap-8 lg:grid-cols-5">
          <Reveal className="lg:col-span-2">
            <div className="relative h-full overflow-hidden rounded-3xl bg-gradient-to-br from-maroon-800 to-maroon-950 p-8 text-white shadow-xl">
              <div className="pointer-events-none absolute -right-16 -bottom-16 h-56 w-56 rounded-full bg-gold-300/15 blur-2xl" />
              <h2 className="relative text-2xl font-bold">
                {t("contact.infoTitle")}
              </h2>

              <ul className="relative mt-8 space-y-6">
                {infoItems.map(({ icon: Icon, label, value, href }) => (
                  <li key={label} className="flex gap-4">
                    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gold-300 text-maroon-900">
                      <Icon className="h-5 w-5" aria-hidden="true" />
                    </span>
                    <div>
                      <p className="text-sm font-semibold text-gold-200">
                        {label}
                      </p>
                      {href ? (
                        <a
                          href={href}
                          className="mt-0.5 block text-maroon-50 transition hover:text-gold-300"
                        >
                          {value}
                        </a>
                      ) : (
                        <p className="mt-0.5 text-maroon-50">{value}</p>
                      )}
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>

          <Reveal delay={150} className="lg:col-span-3">
            <div className="h-full rounded-3xl bg-white p-8 shadow-xl ring-1 shadow-stone-900/5 ring-stone-200/70">
              <h2 className="text-2xl font-bold text-maroon-900">
                {t("contact.formTitle")}
              </h2>

              {status && (
                <div
                  role="status"
                  className={`mt-6 flex animate-fade-up items-center gap-3 rounded-xl px-4 py-3 text-sm ${
                    status === "success"
                      ? "bg-green-50 text-green-800 ring-1 ring-green-200"
                      : "bg-red-50 text-red-700 ring-1 ring-red-200"
                  }`}
                >
                  {status === "success" ? (
                    <CircleCheck
                      className="h-5 w-5 shrink-0"
                      aria-hidden="true"
                    />
                  ) : (
                    <CircleAlert
                      className="h-5 w-5 shrink-0"
                      aria-hidden="true"
                    />
                  )}
                  {t(`contact.${status}`)}
                </div>
              )}

              <form onSubmit={handleSubmit} className="mt-6 space-y-5">
                <div className="grid gap-5 sm:grid-cols-2">
                  <label className="block">
                    <span className="mb-1.5 block text-sm font-semibold text-stone-700">
                      {t("contact.name")}
                    </span>
                    <span className="relative block">
                      <User className={fieldIcon} aria-hidden="true" />
                      <input
                        type="text"
                        name="name"
                        value={form.name}
                        onChange={handleChange}
                        required
                        autoComplete="name"
                        className="input pl-11"
                      />
                    </span>
                  </label>

                  <label className="block">
                    <span className="mb-1.5 block text-sm font-semibold text-stone-700">
                      {t("contact.emailLabel")}
                    </span>
                    <span className="relative block">
                      <Mail className={fieldIcon} aria-hidden="true" />
                      <input
                        type="email"
                        name="email"
                        value={form.email}
                        onChange={handleChange}
                        required
                        autoComplete="email"
                        className="input pl-11"
                      />
                    </span>
                  </label>
                </div>

                <label className="block">
                  <span className="mb-1.5 block text-sm font-semibold text-stone-700">
                    {t("contact.message")}
                  </span>
                  <span className="relative block">
                    <MessageSquare className={fieldIcon} aria-hidden="true" />
                    <textarea
                      name="message"
                      rows="5"
                      value={form.message}
                      onChange={handleChange}
                      required
                      className="input resize-y pl-11"
                    />
                  </span>
                </label>

                <button
                  type="submit"
                  disabled={sending}
                  className="group inline-flex w-full items-center justify-center gap-2 rounded-xl bg-maroon-800 py-3.5 font-semibold text-white shadow-lg shadow-maroon-900/20 transition hover:-translate-y-0.5 hover:bg-maroon-700 disabled:translate-y-0 disabled:opacity-70 sm:w-auto sm:px-10"
                >
                  {sending ? (
                    <LoaderCircle
                      className="h-5 w-5 animate-spin"
                      aria-hidden="true"
                    />
                  ) : (
                    <Send
                      className="h-5 w-5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                      aria-hidden="true"
                    />
                  )}
                  {sending ? t("contact.sending") : t("contact.send")}
                </button>
              </form>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
};

export default Contact;
