import { useEffect, useState } from "react";
import { getAllReports } from "../services/reportService";

function AnalyticsPage() {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchReports = async () => {
      try {
        const res = await getAllReports();
        setReports(res.data.data || []);
      } catch (error) {
        console.error("Error fetching analytics data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchReports();
  }, []);

  const totalReports = reports.length;
  const newReports = reports.filter((r) => r.status === "New").length;
  const resolvedReports = reports.filter((r) => r.status === "Resolved").length;
  const suspiciousReports = reports.filter((r) => r.anomaly_flag).length;
  const duplicateReports = reports.filter((r) => r.duplicate_flag).length;

  const severityCounts = {
    Low: reports.filter((r) => r.severity === "Low").length,
    Medium: reports.filter((r) => r.severity === "Medium").length,
    High: reports.filter((r) => r.severity === "High").length,
    Critical: reports.filter((r) => r.severity === "Critical").length
  };

  const categoryCounts = {
    Water: reports.filter((r) => r.category === "Water").length,
    "Wi-Fi/Network": reports.filter((r) => r.category === "Wi-Fi/Network").length,
    Electricity: reports.filter((r) => r.category === "Electricity").length,
    Sanitation: reports.filter((r) => r.category === "Sanitation").length,
    Equipment: reports.filter((r) => r.category === "Equipment").length,
    Safety: reports.filter((r) => r.category === "Safety").length,
    Administration: reports.filter((r) => r.category === "Administration").length
  };

  if (loading) {
    return <div className="page-container"><p>Loading analytics...</p></div>;
  }

  return (
    <div className="page-container">
      <div className="page-header">
        <h2>Analytics Dashboard</h2>
        <p>Overview of campus issue trends and system activity.</p>
      </div>

      <div className="stats-grid">
        <div className="stat-card">
          <h3>Total Reports</h3>
          <p>{totalReports}</p>
        </div>

        <div className="stat-card">
          <h3>New Reports</h3>
          <p>{newReports}</p>
        </div>

        <div className="stat-card">
          <h3>Resolved Reports</h3>
          <p>{resolvedReports}</p>
        </div>

        <div className="stat-card">
          <h3>Suspicious Reports</h3>
          <p>{suspiciousReports}</p>
        </div>

        <div className="stat-card">
          <h3>Duplicate Reports</h3>
          <p>{duplicateReports}</p>
        </div>
      </div>

      <div className="analytics-grid">
        <div className="panel">
          <h3>Reports by Severity</h3>
          <ul className="analytics-list">
            <li><span>Low</span><strong>{severityCounts.Low}</strong></li>
            <li><span>Medium</span><strong>{severityCounts.Medium}</strong></li>
            <li><span>High</span><strong>{severityCounts.High}</strong></li>
            <li><span>Critical</span><strong>{severityCounts.Critical}</strong></li>
          </ul>
        </div>

        <div className="panel">
          <h3>Reports by Category</h3>
          <ul className="analytics-list">
            <li><span>Water</span><strong>{categoryCounts.Water}</strong></li>
            <li><span>Wi-Fi/Network</span><strong>{categoryCounts["Wi-Fi/Network"]}</strong></li>
            <li><span>Electricity</span><strong>{categoryCounts.Electricity}</strong></li>
            <li><span>Sanitation</span><strong>{categoryCounts.Sanitation}</strong></li>
            <li><span>Equipment</span><strong>{categoryCounts.Equipment}</strong></li>
            <li><span>Safety</span><strong>{categoryCounts.Safety}</strong></li>
            <li><span>Administration</span><strong>{categoryCounts.Administration}</strong></li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default AnalyticsPage;