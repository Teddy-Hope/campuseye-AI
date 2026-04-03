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
  const inProgressReports = reports.filter((r) => r.status === "In Progress").length;
  const resolvedReports = reports.filter((r) => r.status === "Resolved").length;
  const suspiciousReports = reports.filter((r) => r.anomaly_flag).length;

  return (
    <div className="page-container">
      <div className="page-header">
        <h2>Office Dashboard</h2>
        <p>Track, prioritize, and resolve campus issues from one place.</p>
      </div>

      <div className="stats-grid">
        <div className="stat-card">
          <h3>Total Reports</h3>
          <p>{totalReports}</p>
        </div>

        <div className="stat-card">
          <h3>New</h3>
          <p>{newReports}</p>
        </div>

        <div className="stat-card">
          <h3>In Progress</h3>
          <p>{inProgressReports}</p>
        </div>

        <div className="stat-card">
          <h3>Resolved</h3>
          <p>{resolvedReports}</p>
        </div>

        <div className="stat-card">
          <h3>Suspicious</h3>
          <p>{suspiciousReports}</p>
        </div>
      </div>

      <div className="panel filter-panel">
        <div className="filter-group">
          <div className="form-group small">
            <label>Status Filter</label>
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

          <div className="form-group small">
            <label>Severity Filter</label>
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
      </div>

      {loading ? (
        <p>Loading dashboard...</p>
      ) : filteredReports.length === 0 ? (
        <div className="panel">
          <p>No reports found.</p>
        </div>
      ) : (
        <div className="card-grid">
          {filteredReports.map((report) => (
            <div key={report.id} className="report-card">
              <div className="report-top">
                <h3>{report.title}</h3>
                <span
                  className={`badge severity-${report.severity
                    .toLowerCase()
                    .replace(" ", "-")}`}
                >
                  {report.severity}
                </span>
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

              <div className="meta-grid">
                <p><strong>ID:</strong> {report.id}</p>
                <p><strong>Location:</strong> {report.location}</p>
                <p><strong>Category:</strong> {report.category}</p>
                <p><strong>Status:</strong> {report.status}</p>
                <p><strong>Office:</strong> {report.office_route}</p>
                <p><strong>Duplicate:</strong> {report.duplicate_flag ? "Yes" : "No"}</p>
                <p><strong>Suspicious:</strong> {report.anomaly_flag ? "Yes" : "No"}</p>
                <p><strong>Anomaly Score:</strong> {report.anomaly_score}</p>
              </div>

              <p><strong>Summary:</strong> {report.ai_summary}</p>
              <p><strong>Description:</strong> {report.description}</p>

              <div className="timestamp-box">
                <p><strong>Created:</strong> {formatDateTime(report.created_at)}</p>
                <p><strong>Updated:</strong> {formatDateTime(report.updated_at)}</p>
              </div>

              <div className="button-row">
                <button onClick={() => handleStatusChange(report.id, "In Review")}>
                  In Review
                </button>
                <button onClick={() => handleStatusChange(report.id, "In Progress")}>
                  In Progress
                </button>
                <button onClick={() => handleStatusChange(report.id, "Resolved")}>
                  Resolved
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