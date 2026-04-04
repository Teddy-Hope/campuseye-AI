import { useState } from "react";
import { BrowserRouter, Routes, Route, NavLink, Navigate } from "react-router-dom";
import HomePage from "./pages/HomePage";
import ReportPage from "./pages/ReportPage";
import ReportsPage from "./pages/ReportsPage";
import OfficeDashboardPage from "./pages/OfficeDashboardPage";
import AnalyticsPage from "./pages/AnalyticsPage";

function App() {
  // Hackathon Trick: በቀላሉ Student እና Admin ሆነን ገጹን ለማየት State እንጠቀማለን
  const [role, setRole] = useState("student"); // Default is 'student'

  return (
    <BrowserRouter>
      <div className="app-root">
        <header className="topbar">
          <div className="topbar-brand">
            <div className="brand-dot"></div>
            <span>CampusEye AI</span>
          </div>

          <nav className="topbar-nav">
            {/* ተማሪም ሆነ አድሚን እነዚህን ማየት ይችላሉ */}
            <NavLink to="/report" className="topbar-link">
              Submit Issue
            </NavLink>
            <NavLink to="/reports" className="topbar-link">
              My Reports
            </NavLink>

            {/* እነዚህን ደግሞ አድሚን ብቻ ነው የሚያያቸው */}
            {role === "admin" && (
              <>
                <NavLink to="/office-dashboard" className="topbar-link">
                  Office Desk
                </NavLink>
                <NavLink to="/analytics" className="topbar-link">
                  Admin Analytics
                </NavLink>
              </>
            )}
          </nav>

          {/* ለ Demo የሚሆን Role Switcher (ይህን ዳኞች ይወዱታል!) */}
          <div className="demo-role-switcher" style={{ marginLeft: "auto", marginRight: "20px" }}>
            <select
              value={role}
              onChange={(e) => setRole(e.target.value)}
              style={{
                padding: "6px 12px",
                borderRadius: "8px",
                border: "1px solid #ccc",
                backgroundColor: "#f8f9fa",
                cursor: "pointer",
                fontWeight: "bold",
                color: "#333"
              }}
            >
              <option value="student">👨‍🎓 Student View</option>
              <option value="admin">👨‍💼 Admin View</option>
            </select>
          </div>
        </header>

        <main className="main-shell">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/report" element={<ReportPage />} />
            <Route path="/reports" element={<ReportsPage />} />

            {/* ጥበቃ (Route Guards): ተማሪ URL ላይ ጽፎ እንዳይገባ ይከላከላል */}
            <Route 
              path="/office-dashboard" 
              element={role === "admin" ? <OfficeDashboardPage /> : <Navigate to="/" replace />} 
            />
            <Route 
              path="/analytics" 
              element={role === "admin" ? <AnalyticsPage /> : <Navigate to="/" replace />} 
            />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;