import { Routes, Route } from "react-router-dom";
import Navbar from "./Components/Navbar";
import Footer from "./Components/Footer";
import ProtectedRoute from "./Components/ProtectedRoute";
import Home from "./Pages/Home";
import Contact from "./Pages/Contact";
import Staff from "./Pages/Staff";
import Vision from "./Pages/Vision";
import SpecialNotifications from "./Pages/SpecialNotifications";
import AdminLogin from "./Pages/AdminLogin";
import AdminDashboard from "./Pages/AdminDashBoard";

function App() {
  return (
    <div className="flex min-h-screen flex-col">
      <Routes>
        <Route
          path="/admin/dashboard"
          element={
            <ProtectedRoute>
              <AdminDashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="*"
          element={
            <>
              <Navbar />
              <main className="flex-1">
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/contact" element={<Contact />} />
                  <Route path="/staff" element={<Staff />} />
                  <Route path="/vision" element={<Vision />} />
                  <Route
                    path="/special-notifications"
                    element={<SpecialNotifications />}
                  />
                  <Route path="/admin/login" element={<AdminLogin />} />
                </Routes>
              </main>
              <Footer />
            </>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
