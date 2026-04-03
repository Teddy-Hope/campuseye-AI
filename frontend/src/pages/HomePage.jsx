import { Link } from "react-router-dom";

function HomePage() {
  return (
    <div className="page-container">
      <div className="hero-card">
        <h1>CampusEye AI</h1>
        <p>
          An AI-powered platform that transforms campus complaints into
          structured action for faster, smarter, and more transparent issue resolution.
        </p>

        <div className="hero-actions">
          <Link to="/report">
            <button>Submit Report</button>
          </Link>

          <Link to="/office-dashboard">
            <button className="secondary-btn">Open Office Dashboard</button>
          </Link>
        </div>
      </div>

      <div className="stats-grid">
        <div className="stat-card">
          <h3>AI Triage</h3>
          <p>Classifies issues and estimates urgency automatically.</p>
        </div>

        <div className="stat-card">
          <h3>Duplicate Detection</h3>
          <p>Finds repeated reports to reduce noise and improve efficiency.</p>
        </div>

        <div className="stat-card">
          <h3>Anomaly Detection</h3>
          <p>Flags suspicious or spam-like submissions.</p>
        </div>

        <div className="stat-card">
          <h3>Office Routing</h3>
          <p>Sends issues to the right office for faster resolution.</p>
        </div>
      </div>
    </div>
  );
}

export default HomePage;