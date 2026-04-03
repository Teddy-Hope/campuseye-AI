import { useState } from "react";
import { createReport } from "../services/reportService";

function ReportPage() {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    location: ""
  });

  const [response, setResponse] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      const res = await createReport(formData);
      setResponse(res.data.data);

      setFormData({
        title: "",
        description: "",
        location: ""
      });
    } catch (error) {
      console.error("Error creating report:", error);
      alert("Failed to create report");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page-container">
      <div className="page-header">
        <h2>Submit Campus Report</h2>
        <p>Describe the issue clearly so the system can classify it accurately.</p>
      </div>

      <div className="panel form-panel">
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Title</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="Example: Water issue in Dorm 2"
              required
            />
          </div>

          <div className="form-group">
            <label>Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Explain the issue clearly..."
              required
            />
          </div>

          <div className="form-group">
            <label>Location</label>
            <input
              type="text"
              name="location"
              value={formData.location}
              onChange={handleChange}
              placeholder="Example: Dorm 2"
              required
            />
          </div>

          <button type="submit" disabled={loading}>
            {loading ? "Submitting..." : "Submit Report"}
          </button>
        </form>
      </div>

      {response && (
        <div className="panel result-panel">
          <h3>Report Created Successfully</h3>
          <div className="result-grid">
            <p><strong>ID:</strong> {response.id}</p>
            <p><strong>Category:</strong> {response.category}</p>
            <p><strong>Severity:</strong> {response.severity}</p>
            <p><strong>Office Route:</strong> {response.office_route}</p>
            <p><strong>Status:</strong> {response.status}</p>
            <p><strong>Duplicate:</strong> {response.duplicate_flag ? "Yes" : "No"}</p>
            <p><strong>Suspicious:</strong> {response.anomaly_flag ? "Yes" : "No"}</p>
          </div>
          <p><strong>AI Summary:</strong> {response.ai_summary}</p>
        </div>
      )}
    </div>
  );
}

export default ReportPage;