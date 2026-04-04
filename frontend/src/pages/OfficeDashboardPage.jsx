import { useEffect, useState } from "react";
import { getAllReports, updateReportStatus } from "../services/reportService";
import { formatDateTime } from "../utils/formatDate";

function OfficeDashboardPage() {
  const [reports, setReports] = useState([]);
  const [filteredReports, setFilteredReports] = useState([]);
  const [loading, setLoading] = useState(true);

  const [statusFilter, setStatusFilter] = useState("All");
  const [severityFilter, setSeverityFilter] = useState("All");

  const fetchReports = async () => {
    try {
      const res = await getAllReports();
      const data = res.data.data || [];
      setReports(data);
      setFilteredReports(data);
    } catch (error) {
      console.error("Error fetching reports:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReports();
  }, []);

  useEffect(() => {
    let updatedReports = [...reports];

    if (statusFilter !== "All") {
      updatedReports = updatedReports.filter(
        (report) => report.status === statusFilter
      );
    }

    if (severityFilter !== "All") {
      updatedReports = updatedReports.filter(
        (report) => report.severity === severityFilter
      );
    }

    setFilteredReports(updatedReports);
  }, [statusFilter, severityFilter, reports]);

  const handleStatusChange = async (id, newStatus) => {
    try {
      await updateReportStatus(id, newStatus);
      fetchReports();
    } catch (error) {
      console.error("Error updating status:", error);
      alert("Failed to update status");
    }
  };

  const totalReports = reports.length;
  const newReports = reports.filter((r) => r.status === "New").length;
  const inReviewReports = reports.filter((r) => r.status === "In Review").length;
  const inProgressReports = reports.filter((r) => r.status === "In Progress").length;
  const resolvedReports = reports.filter((r) => r.status === "Resolved").length;
  const criticalReports = reports.filter((r) => r.severity === "Critical").length;

  return (
    <div className="page-wrap">
      <div className="section-header">
        <h2>Office Desk</h2>
        <p>Review, prioritize, and resolve campus issues from one professional workflow.</p>
      </div>

      <div className="dashboard-stats">
        <div className="dashboard-stat-card">
          <span>Total Reports</span>
          <strong>{totalReports}</strong>
        </div>
        <div className="dashboard-stat-card">
          <span>New</span>
          <strong>{newReports}</strong>
        </div>
        <div className="dashboard-stat-card">
          <span>In Review</span>
          <strong>{inReviewReports}</strong>
        </div>
        <div className="dashboard-stat-card">
          <span>In Progress</span>
          <strong>{inProgressReports}</strong>
        </div>
        <div className="dashboard-stat-card">
          <span>Resolved</span>
          <strong>{resolvedReports}</strong>
        </div>
        <div className="dashboard-stat-card">
          <span>Critical</span>
          <strong>{criticalReports}</strong>
        </div>
      </div>

      <div className="filter-bar polished-filter-bar">
        <div className="filter-field">
          <label>Status</label>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="All">All</option>
            <option value="New">New</option>
            <option value="In Review">In Review</option>
            <option value="In Progress">In Progress</option>
            <option value="Resolved">Resolved</option>
          </select>
        </div>

        <div className="filter-field">
          <label>Severity</label>
          <select
            value={severityFilter}
            onChange={(e) => setSeverityFilter(e.target.value)}
          >
            <option value="All">All</option>
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
            <option value="Critical">Critical</option>
          </select>
        </div>
      </div>

      {loading ? (
        <p>Loading dashboard...</p>
      ) : filteredReports.length === 0 ? (
        <div className="empty-card">No reports found.</div>
      ) : (
        <div className="reports-grid">
          {filteredReports.map((report) => (
            <div key={report.id} className="issue-card enhanced-card">
              <div className="issue-card-header">
                <div>
                  <div className="issue-id-line">Issue #{report.id}</div>
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

              <div className="action-row polished-action-row">
                <button
                  className="outline-btn"
                  onClick={() => handleStatusChange(report.id, "In Review")}
                >
                  Move to Review
                </button>
                <button
                  className="progress-btn"
                  onClick={() => handleStatusChange(report.id, "In Progress")}
                >
                  Start Progress
                </button>
                <button
                  className="success-btn"
                  onClick={() => handleStatusChange(report.id, "Resolved")}
                >
                  Mark Resolved
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default OfficeDashboardPage;