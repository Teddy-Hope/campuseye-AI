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
    <div style={{ padding: "30px" }}>
      <h2>Submit Campus Report</h2>

      <form onSubmit={handleSubmit} style={{ maxWidth: "500px" }}>
        <div style={{ marginBottom: "12px" }}>
          <label>Title</label>
          <br />
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            style={{ width: "100%", padding: "8px" }}
            required
          />
        </div>

        <div style={{ marginBottom: "12px" }}>
          <label>Description</label>
          <br />
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            style={{ width: "100%", padding: "8px", minHeight: "100px" }}
            required
          />
        </div>

        <div style={{ marginBottom: "12px" }}>
          <label>Location</label>
          <br />
          <input
            type="text"
            name="location"
            value={formData.location}
            onChange={handleChange}
            style={{ width: "100%", padding: "8px" }}
            required
          />
        </div>

        <button type="submit" disabled={loading}>
          {loading ? "Submitting..." : "Submit Report"}
        </button>
      </form>

      {response && (
        <div style={{ marginTop: "30px", padding: "15px", border: "1px solid #ccc" }}>
          <h3>Report Created Successfully</h3>
          <p><strong>ID:</strong> {response.id}</p>
          <p><strong>Category:</strong> {response.category}</p>
          <p><strong>Severity:</strong> {response.severity}</p>
          <p><strong>Office Route:</strong> {response.office_route}</p>
          <p><strong>Status:</strong> {response.status}</p>
          <p><strong>AI Summary:</strong> {response.ai_summary}</p>
          <p><strong>Duplicate:</strong> {response.duplicate_flag ? "Yes" : "No"}</p>
          <p><strong>Suspicious:</strong> {response.anomaly_flag ? "Yes" : "No"}</p>
        </div>
      )}
    </div>
  );
}

export default ReportPage;