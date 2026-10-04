import { useEffect } from "react";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import Navbar from "./Components/NavBar";
import Footer from "./Components/Footer";
import BackToTop from "./Components/BackToTop";
import ProtectedRoute from "./Components/ProtectedRoute";
import Home from "./Pages/Home";
import Contact from "./Pages/Contact";
import Staff from "./Pages/Staff";
import Vision from "./Pages/Vision";
import Notifications from "./Pages/Notifications";
import AdminLogin from "./Pages/AdminLogin";
import AdminDashboard from "./Pages/AdminDashBoard";
import NotFound from "./Pages/NotFound";

function App() {
  const { pathname } = useLocation();

  // a new page should open at the top, not where the last one was scrolled
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [pathname]);

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
              {/* key: replay the fade-in on every page change */}
              <main key={pathname} className="flex-1 animate-fade-in">
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/contact" element={<Contact />} />
                  <Route path="/staff" element={<Staff />} />
                  <Route path="/vision" element={<Vision />} />
                  <Route path="/notifications" element={<Notifications />} />
                  {/* old address, kept so existing links still work */}
                  <Route
                    path="/special-notifications"
                    element={<Navigate to="/notifications" replace />}
                  />
                  <Route path="/admin/login" element={<AdminLogin />} />
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </main>
              <Footer />
              <BackToTop />
            </>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
