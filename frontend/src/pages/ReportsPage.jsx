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

  return (
    <div className="page-container">
      <div className="page-header">
        <h2>All Reports</h2>
        <p>View all submitted campus issues and their AI classification results.</p>
      </div>

      {loading ? (
        <p>Loading reports...</p>
      ) : reports.length === 0 ? (
        <div className="panel">
          <p>No reports found.</p>
        </div>
      ) : (
        <div className="card-grid">
          {reports.map((report) => (
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
                <p><strong>Location:</strong> {report.location}</p>
                <p><strong>Category:</strong> {report.category}</p>
                <p><strong>Status:</strong> {report.status}</p>
                <p><strong>Office:</strong> {report.office_route}</p>
                <p><strong>Duplicate:</strong> {report.duplicate_flag ? "Yes" : "No"}</p>
                <p><strong>Suspicious:</strong> {report.anomaly_flag ? "Yes" : "No"}</p>
              </div>

              <p><strong>Summary:</strong> {report.ai_summary}</p>
              <p><strong>Description:</strong> {report.description}</p>

              <div className="timestamp-box">
                <p><strong>Created:</strong> {formatDateTime(report.created_at)}</p>
                <p><strong>Updated:</strong> {formatDateTime(report.updated_at)}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default ReportsPage;