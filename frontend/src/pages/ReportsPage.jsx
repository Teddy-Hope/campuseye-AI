import { useEffect, useState } from "react";
import { getAllReports } from "../services/reportService";

function ReportsPage() {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchReports = async () => {
    try {
      const res = await getAllReports();
      setReports(res.data.data);
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
    <div style={{ padding: "30px" }}>
      <h2>All Reports</h2>

      {loading ? (
        <p>Loading reports...</p>
      ) : reports.length === 0 ? (
        <p>No reports found.</p>
      ) : (
        <div style={{ display: "grid", gap: "15px" }}>
          {reports.map((report) => (
            <div
              key={report.id}
              style={{
                border: "1px solid #ccc",
                padding: "15px",
                borderRadius: "8px"
              }}
            >
              <h3>{report.title}</h3>
              <p><strong>Location:</strong> {report.location}</p>
              <p><strong>Category:</strong> {report.category}</p>
              <p><strong>Severity:</strong> {report.severity}</p>
              <p><strong>Status:</strong> {report.status}</p>
              <p><strong>Office:</strong> {report.office_route}</p>
              <p><strong>Summary:</strong> {report.ai_summary}</p>
              <p><strong>Duplicate:</strong> {report.duplicate_flag ? "Yes" : "No"}</p>
              <p><strong>Suspicious:</strong> {report.anomaly_flag ? "Yes" : "No"}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default ReportsPage;