import { BrowserRouter, Routes, Route, NavLink } from "react-router-dom";
import HomePage from "./pages/HomePage";
import ReportPage from "./pages/ReportPage";
import ReportsPage from "./pages/ReportsPage";
import OfficeDashboardPage from "./pages/OfficeDashboardPage";
import AnalyticsPage from "./pages/AnalyticsPage";

function App() {
  return (
    <BrowserRouter>
      <div className="app-root">
        <header className="topbar">
          <div className="topbar-brand">
            <div className="brand-dot"></div>
            <span>CampusEye AI</span>
          </div>

          <nav className="topbar-nav">
            <NavLink to="/report" className="topbar-link">
              Submit Issue
            </NavLink>
            <NavLink to="/reports" className="topbar-link">
              My Reports
            </NavLink>
            <NavLink to="/office-dashboard" className="topbar-link">
              Office Desk
            </NavLink>
            <NavLink to="/analytics" className="topbar-link">
              Admin Analytics
            </NavLink>
          </nav>
        </header>

        <main className="main-shell">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/report" element={<ReportPage />} />
            <Route path="/reports" element={<ReportsPage />} />
            <Route path="/office-dashboard" element={<OfficeDashboardPage />} />
            <Route path="/analytics" element={<AnalyticsPage />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;