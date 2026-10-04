import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  ArrowRight,
  Bell,
  ExternalLink,
  Images,
  Inbox,
  LayoutDashboard,
  LogOut,
  Users,
} from "lucide-react";
import ManageHero from "./ManageHero";
import ManageStaff from "./ManageStaff";
import ManageNotifications from "./ManageNotifications";
import ManageMessages from "./ManageMessages";
import { clearToken } from "../Services/auth";
import logo from "../assets/amv-logo.png";

const sections = [
  { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
  {
    id: "hero",
    label: "Hero Slides",
    icon: Images,
    text: "Homepage banner images and captions",
  },
  {
    id: "staff",
    label: "Staff",
    icon: Users,
    text: "Teachers and staff profiles",
  },
  {
    id: "notifications",
    label: "Notifications",
    icon: Bell,
    text: "Announcements for students and parents",
  },
  {
    id: "messages",
    label: "Messages",
    icon: Inbox,
    text: "Messages sent from the Contact page",
  },
];

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [section, setSection] = useState("dashboard");

  const logout = () => {
    clearToken();
    navigate("/admin/login");
  };

  const renderSection = () => {
    if (section === "hero") return <ManageHero />;
    if (section === "staff") return <ManageStaff />;
    if (section === "notifications") return <ManageNotifications />;
    if (section === "messages") return <ManageMessages />;

    return (
      <div>
        <h1 className="text-3xl font-bold text-maroon-900">Admin Dashboard</h1>
        <p className="mt-2 text-stone-600">
          Welcome to the school website administration panel.
        </p>

        <div className="mt-10 grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
          {sections.slice(1).map(({ id, label, icon: Icon, text }, i) => (
            <button
              key={id}
              type="button"
              onClick={() => setSection(id)}
              style={{ animationDelay: `${i * 80}ms` }}
              className="group animate-fade-up rounded-2xl bg-white p-6 text-left shadow-md ring-1 ring-stone-200/70 transition duration-300 hover:-translate-y-1.5 hover:shadow-xl"
            >
              <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-maroon-50 text-maroon-800 transition group-hover:bg-maroon-800 group-hover:text-gold-300">
                <Icon className="h-6 w-6" aria-hidden="true" />
              </span>
              <h2 className="mt-4 text-lg font-bold text-maroon-900">
                {label}
              </h2>
              <p className="mt-1 text-sm text-stone-500">{text}</p>
              <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-maroon-700">
                Manage
                <ArrowRight
                  className="h-4 w-4 transition-transform group-hover:translate-x-1"
                  aria-hidden="true"
                />
              </span>
            </button>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="flex min-h-screen flex-col bg-stone-100 md:flex-row">
      <aside className="bg-gradient-to-b from-maroon-900 to-maroon-950 text-white md:sticky md:top-0 md:h-screen md:w-64 md:shrink-0">
        <div className="flex items-center gap-3 border-b border-maroon-800 p-5">
          <img
            src={logo}
            alt=""
            className="h-10 w-10 rounded-full ring-2 ring-gold-300/60"
          />
          <div>
            <p className="font-display text-lg leading-tight font-bold">
              Admin Panel
            </p>
            <Link
              to="/"
              className="inline-flex items-center gap-1 text-xs text-maroon-200 hover:text-gold-300"
            >
              View website
              <ExternalLink className="h-3 w-3" aria-hidden="true" />
            </Link>
          </div>
        </div>

        <nav className="flex gap-1 overflow-x-auto p-3 md:flex-col md:gap-1.5 md:p-4">
          {sections.map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              type="button"
              onClick={() => setSection(id)}
              aria-current={section === id ? "page" : undefined}
              className={`flex shrink-0 items-center gap-3 rounded-xl px-4 py-2.5 text-left text-sm font-medium transition ${
                section === id
                  ? "bg-gold-300 text-maroon-900 shadow"
                  : "text-maroon-100 hover:bg-maroon-800 hover:text-white"
              }`}
            >
              <Icon className="h-5 w-5" aria-hidden="true" />
              {label}
            </button>
          ))}

          <button
            type="button"
            onClick={logout}
            className="flex shrink-0 items-center gap-3 rounded-xl px-4 py-2.5 text-sm font-medium text-maroon-100 transition hover:bg-red-600 hover:text-white md:mt-6"
          >
            <LogOut className="h-5 w-5" aria-hidden="true" />
            Logout
          </button>
        </nav>
      </aside>

      <main key={section} className="flex-1 animate-fade-in p-6 md:p-10">
        {renderSection()}
      </main>
    </div>
  );
};

export default AdminDashboard;
