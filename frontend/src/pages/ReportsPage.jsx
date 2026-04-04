import { useEffect, useState } from "react";
import { getAllReports } from "../services/reportService";
import { formatDateTime } from "../utils/formatDate";

function ReportsPage() {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchReports = async () => {
    try {
      const res = await getAllReports();
      setReports(res.data.data || []);
    } catch (error) {
      console.error("Error fetching reports:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReports();
  }, []);

  const totalReports = reports.length;
  const resolvedReports = reports.filter((r) => r.status === "Resolved").length;
  const suspiciousReports = reports.filter((r) => r.anomaly_flag).length;

  return (
    <div className="page-wrap">
      <div className="section-header">
        <h2>My Reports</h2>
        <p>Track all submitted issues, AI results, and resolution progress.</p>
      </div>

      <div className="dashboard-stats">
        <div className="dashboard-stat-card">
          <span>Total Reports</span>
          <strong>{totalReports}</strong>
        </div>
        <div className="dashboard-stat-card">
          <span>Resolved</span>
          <strong>{resolvedReports}</strong>
        </div>
        <div className="dashboard-stat-card">
          <span>Suspicious</span>
          <strong>{suspiciousReports}</strong>
        </div>
      </div>

      {loading ? (
        <p>Loading reports...</p>
      ) : reports.length === 0 ? (
        <div className="empty-card">No reports found.</div>
      ) : (
        <div className="reports-grid">
          {reports.map((report) => (
            <div key={report.id} className="issue-card enhanced-card">
              <div className="issue-card-header">
                <div>
                  <div className="issue-id-line">Report #{report.id}</div>
                  <h3>{report.title}</h3>
                </div>

                <div className="badge-group">
                  <span
                    className={`status-badge severity-${report.severity
                      .toLowerCase()
                      .replace(" ", "-")}`}
                  >
                    {report.severity}
                  </span>
                  <span
                    className={`status-chip status-${report.status
                      .toLowerCase()
                      .replace(/\s+/g, "-")}`}
                  >
                    {report.status}
                  </span>
                </div>
              </div>

              {report.image_url && (
                <div className="report-image-box">
                  <img
                    src={report.image_url}
                    alt={report.title}
                    className="report-image"
                  />
                </div>
              )}

              <div className="meta-card-grid">
                <div className="meta-card">
                  <span>Location</span>
                  <strong>{report.location}</strong>
                </div>
                <div className="meta-card">
                  <span>Category</span>
                  <strong>{report.category}</strong>
                </div>
                <div className="meta-card">
                  <span>Office Route</span>
                  <strong>{report.office_route}</strong>
                </div>
                <div className="meta-card">
                  <span>Duplicate</span>
                  <strong>{report.duplicate_flag ? "Yes" : "No"}</strong>
                </div>
                <div className="meta-card">
                  <span>Suspicious</span>
                  <strong>{report.anomaly_flag ? "Yes" : "No"}</strong>
                </div>
                <div className="meta-card">
                  <span>Anomaly Score</span>
                  <strong>{report.anomaly_score}</strong>
                </div>
              </div>

              <div className="content-block">
                <span>Description</span>
                <p>{report.description}</p>
              </div>

              <div className="content-block summary-block">
                <span>AI Summary</span>
                <p>{report.ai_summary}</p>
              </div>

              <div className="time-row">
                <div className="time-pill">
                  <span>Created</span>
                  <strong>{formatDateTime(report.created_at)}</strong>
                </div>
                <div className="time-pill">
                  <span>Updated</span>
                  <strong>{formatDateTime(report.updated_at)}</strong>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default ReportsPage;