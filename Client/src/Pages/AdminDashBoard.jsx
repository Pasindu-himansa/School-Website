import { useState } from "react";
import { useNavigate } from "react-router-dom";
import ManageHero from "./ManageHero";
import ManageStaff from "./ManageStaff";
import ManageNotifications from "./ManageNotifications";

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [section, setSection] = useState("dashboard");

  const logout = () => {
    localStorage.removeItem("adminToken");
    navigate("/admin/login");
  };

  const renderSection = () => {
    if (section === "hero") return <ManageHero />;
    if (section === "staff") return <ManageStaff />;
    if (section === "notifications") return <ManageNotifications />;

    return (
      <div>
        <h1 className="text-3xl font-bold text-blue-900">Admin Dashboard</h1>
        <p className="mt-4 text-gray-600">
          Welcome to the school website administration panel.
        </p>

        <div className="mt-10 grid gap-6 md:grid-cols-3">
          <div className="rounded-xl bg-white p-6 shadow-md">
            <h2 className="text-lg font-semibold text-gray-700">Hero Slides</h2>
            <p className="mt-3 text-3xl font-bold text-blue-900">Manage</p>
          </div>

          <div className="rounded-xl bg-white p-6 shadow-md">
            <h2 className="text-lg font-semibold text-gray-700">
              Staff Members
            </h2>
            <p className="mt-3 text-3xl font-bold text-blue-900">Manage</p>
          </div>

          <div className="rounded-xl bg-white p-6 shadow-md">
            <h2 className="text-lg font-semibold text-gray-700">
              Notifications
            </h2>
            <p className="mt-3 text-3xl font-bold text-blue-900">Manage</p>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      <aside className="w-64 bg-blue-900 text-white">
        <div className="border-b border-blue-800 p-6 text-2xl font-bold">
          Admin Panel
        </div>

        <nav className="flex flex-col gap-2 p-4">
          <button
            onClick={() => setSection("dashboard")}
            className="rounded-lg px-4 py-2 text-left hover:bg-blue-800"
          >
            Dashboard
          </button>

          <button
            onClick={() => setSection("hero")}
            className="rounded-lg px-4 py-2 text-left hover:bg-blue-800"
          >
            Hero Slides
          </button>

          <button
            onClick={() => setSection("staff")}
            className="rounded-lg px-4 py-2 text-left hover:bg-blue-800"
          >
            Staff
          </button>

          <button
            onClick={() => setSection("notifications")}
            className="rounded-lg px-4 py-2 text-left hover:bg-blue-800"
          >
            Notifications
          </button>

          <button
            onClick={logout}
            className="mt-6 rounded-lg bg-red-500 px-4 py-2 hover:bg-red-600"
          >
            Logout
          </button>
        </nav>
      </aside>

      <main className="flex-1 p-10">{renderSection()}</main>
    </div>
  );
};

export default AdminDashboard;
