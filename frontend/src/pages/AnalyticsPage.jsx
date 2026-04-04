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
  const criticalReports = reports.filter((r) => r.severity === "Critical").length;
  const resolvedReports = reports.filter((r) => r.status === "Resolved").length;
  const suspiciousReports = reports.filter((r) => r.anomaly_flag).length;

  const waterSanitation =
    reports.filter((r) => r.category === "Water" || r.category === "Sanitation").length;
  const wifiTech =
    reports.filter((r) => r.category === "Wi-Fi/Network" || r.category === "Equipment").length;
  const safetyInfra =
    reports.filter((r) => r.category === "Safety" || r.category === "Electricity").length;

  const totalCategoryBase = waterSanitation + wifiTech + safetyInfra || 1;

  const waterPercent = Math.round((waterSanitation / totalCategoryBase) * 100);
  const wifiPercent = Math.round((wifiTech / totalCategoryBase) * 100);
  const safetyPercent = Math.round((safetyInfra / totalCategoryBase) * 100);

  if (loading) {
    return <div className="page-wrap"><p>Loading analytics...</p></div>;
  }

  return (
    <div className="page-wrap">
      <div className="section-header">
        <h2>Admin Analytics</h2>
        <p>System overview and AI anomaly detection insights.</p>
      </div>

      <div className="analytics-top-stats">
        <div className="analytics-top-card blue-line">
          <div>
            <span>Total Reports</span>
            <strong>{totalReports}</strong>
          </div>
          <div className="analytics-card-icon blue-soft">📊</div>
        </div>

        <div className="analytics-top-card red-line">
          <div>
            <span>Critical Issues</span>
            <strong>{criticalReports}</strong>
          </div>
          <div className="analytics-card-icon red-soft">🔥</div>
        </div>

        <div className="analytics-top-card green-line">
          <div>
            <span>Resolved</span>
            <strong>{resolvedReports}</strong>
          </div>
          <div className="analytics-card-icon green-soft">✅</div>
        </div>

        <div className="analytics-top-card purple-line">
          <div>
            <span>Spam/Fakes Blocked</span>
            <strong>{suspiciousReports}</strong>
          </div>
          <div className="analytics-card-icon purple-soft">🛡</div>
        </div>
      </div>

      <div className="analytics-main-grid">
        <div className="analytics-panel large-panel">
          <h3>Reports by Category</h3>

          <div className="category-row">
            <div className="category-info">
              <span>Water & Sanitation</span>
              <strong>{waterPercent}%</strong>
            </div>
            <div className="progress-track">
              <div className="progress-fill blue-fill" style={{ width: `${waterPercent}%` }}></div>
            </div>
          </div>

          <div className="category-row">
            <div className="category-info">
              <span>Wi-Fi & Tech</span>
              <strong>{wifiPercent}%</strong>
            </div>
            <div className="progress-track">
              <div className="progress-fill purple-fill" style={{ width: `${wifiPercent}%` }}></div>
            </div>
          </div>

          <div className="category-row">
            <div className="category-info">
              <span>Safety & Infrastructure</span>
              <strong>{safetyPercent}%</strong>
            </div>
            <div className="progress-track">
              <div className="progress-fill red-fill" style={{ width: `${safetyPercent}%` }}></div>
            </div>
          </div>
        </div>

        <div className="analytics-panel engine-panel">
          <div className="engine-icon-wrap">
            <div className="engine-icon">🤖</div>
          </div>
          <h3>AI Engine Status: Active</h3>
          <p>
            The AI has automatically triaged 100% of incoming reports, helping
            reduce manual sorting effort and improving visibility of urgent and suspicious cases.
          </p>
        </div>
      </div>
    </div>
  );
}

export default AnalyticsPage;