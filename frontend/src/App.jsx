import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import HomePage from "./pages/HomePage";
import ReportPage from "./pages/ReportPage";
import ReportsPage from "./pages/ReportsPage";

function App() {
  return (
    <BrowserRouter>
      <div style={{ padding: "20px", borderBottom: "1px solid #ddd" }}>
        <nav style={{ display: "flex", gap: "15px" }}>
          <Link to="/">Home</Link>
          <Link to="/report">Submit Report</Link>
          <Link to="/reports">View Reports</Link>
        </nav>
      </div>

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/report" element={<ReportPage />} />
        <Route path="/reports" element={<ReportsPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;