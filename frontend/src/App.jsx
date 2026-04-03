import { BrowserRouter, Routes, Route, NavLink } from "react-router-dom";
import HomePage from "./pages/HomePage";
import ReportPage from "./pages/ReportPage";
import ReportsPage from "./pages/ReportsPage";
import OfficeDashboardPage from "./pages/OfficeDashboardPage";
import AnalyticsPage from "./pages/AnalyticsPage";

function App() {
  return (
    <BrowserRouter>
      <div className="app-shell">
        <aside className="sidebar">
          <div className="brand">
            <h2>CampusEye AI</h2>
            <p>Smart campus issue management</p>
          </div>

          <nav className="sidebar-nav">
            <NavLink to="/" end className="nav-link">
              Home
            </NavLink>
            <NavLink to="/report" className="nav-link">
              Submit Report
            </NavLink>
            <NavLink to="/reports" className="nav-link">
              Reports
            </NavLink>
            <NavLink to="/office-dashboard" className="nav-link">
              Office Dashboard
            </NavLink>
            <NavLink to="/analytics" className="nav-link">
              Analytics
            </NavLink>
          </nav>
        </aside>

        <main className="main-content">
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