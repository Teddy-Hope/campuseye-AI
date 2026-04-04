import { useState } from "react";
import { createReport } from "../services/reportService";

function ReportPage() {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    location: "",
    image_url: ""
  });

  const [imagePreview, setImagePreview] = useState("");
  const [response, setResponse] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];

    if (!file) return;

    const previewUrl = URL.createObjectURL(file);

    setImagePreview(previewUrl);
    setFormData((prev) => ({
      ...prev,
      image_url: previewUrl
    }));
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
        location: "",
        image_url: ""
      });

      setImagePreview("");
    } catch (error) {
      console.error("Error creating report:", error);
      alert("Failed to create report");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page-wrap">
      <div className="form-layout">
        <div className="form-card">
          <div className="card-top-line"></div>

          <div className="card-header">
            <h2>Report a Campus Issue</h2>
            <p>
              Provide details below. Our AI will automatically categorize,
              assign priority, and route it to the correct office.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="issue-form">
            <div className="form-group">
              <label>Issue Title</label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="e.g., No water in Dorm 2 Block B"
                required
              />
            </div>

            <div className="form-group">
              <label>Description</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Please describe the problem in detail..."
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
                placeholder="e.g., Main Library, 2nd Floor"
                required
              />
            </div>

            <div className="form-group">
              <label>Photo Evidence (Optional)</label>
              <label className="upload-box">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  hidden
                />
                <div className="upload-inner">
                  <div className="upload-icon">⬆</div>
                  <p className="upload-title">Click to upload image</p>
                  <span>PNG, JPG up to 5MB</span>
                </div>
              </label>
            </div>

            {imagePreview && (
              <div className="image-preview-box">
                <img
                  src={imagePreview}
                  alt="Preview"
                  className="report-image-preview"
                />
              </div>
            )}

            <button type="submit" className="submit-btn" disabled={loading}>
              {loading ? "Submitting..." : "Submit to AI Triage ✨"}
            </button>
          </form>
        </div>

        {response && (
          <div className="result-card">
            <h3>AI Triage Result</h3>

            <div className="result-grid">
              <div className="result-item">
                <span>ID</span>
                <strong>{response.id}</strong>
              </div>
              <div className="result-item">
                <span>Category</span>
                <strong>{response.category}</strong>
              </div>
              <div className="result-item">
                <span>Severity</span>
                <strong>{response.severity}</strong>
              </div>
              <div className="result-item">
                <span>Office Route</span>
                <strong>{response.office_route}</strong>
              </div>
              <div className="result-item">
                <span>Status</span>
                <strong>{response.status}</strong>
              </div>
              <div className="result-item">
                <span>Duplicate</span>
                <strong>{response.duplicate_flag ? "Yes" : "No"}</strong>
              </div>
              <div className="result-item">
                <span>Suspicious</span>
                <strong>{response.anomaly_flag ? "Yes" : "No"}</strong>
              </div>
            </div>

            <div className="result-summary">
              <span>AI Summary</span>
              <p>{response.ai_summary}</p>
            </div>

            {response.image_url && (
              <div className="image-preview-box">
                <img
                  src={response.image_url}
                  alt="Uploaded issue"
                  className="report-image-preview"
                />
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default ReportPage;