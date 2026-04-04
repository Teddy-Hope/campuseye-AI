import { Link } from "react-router-dom";

function HomePage() {
  return (
    <div className="page-wrap">
      <section className="home-hero">
        <div className="home-hero-left">
          <div className="hero-badge">AI-powered Campus Issue Intelligence</div>
          <h1>See campus problems. Prioritize faster. Resolve smarter.</h1>
          <p>
            CampusEye AI helps students report real campus issues with images,
            location, and clear details. The platform uses AI to classify,
            prioritize, detect suspicious reports, and route each issue to the
            right office.
          </p>

          <div className="hero-actions">
            <Link to="/report">
              <button className="primary-btn">Submit an Issue</button>
            </Link>

            <Link to="/analytics">
              <button className="secondary-btn">View Analytics</button>
            </Link>
          </div>

          <div className="hero-mini-stats">
            <div className="mini-stat-card">
              <strong>AI Triage</strong>
              <span>Automatic issue classification</span>
            </div>
            <div className="mini-stat-card">
              <strong>Smart Routing</strong>
              <span>Routes issues to the right office</span>
            </div>
            <div className="mini-stat-card">
              <strong>Anomaly Detection</strong>
              <span>Flags suspicious or spam reports</span>
            </div>
          </div>
        </div>

        <div className="home-hero-right">
          <div className="hero-visual-card">
            <div className="hero-visual-header">
              <span>Live AI Workflow</span>
              <div className="status-pill">ACTIVE</div>
            </div>

            <div className="hero-visual-body">
              <div className="workflow-step">
                <div className="step-icon blue">1</div>
                <div>
                  <strong>Student submits issue</strong>
                  <p>Water outage reported in Dorm 2 with photo evidence.</p>
                </div>
              </div>

              <div className="workflow-step">
                <div className="step-icon cyan">2</div>
                <div>
                  <strong>AI analyzes report</strong>
                  <p>Category: Water | Severity: High | Office: Facilities</p>
                </div>
              </div>

              <div className="workflow-step">
                <div className="step-icon purple">3</div>
                <div>
                  <strong>System checks for abuse</strong>
                  <p>Duplicate and suspicious behavior detection is applied.</p>
                </div>
              </div>

              <div className="workflow-step">
                <div className="step-icon green">4</div>
                <div>
                  <strong>Office receives task</strong>
                  <p>Issue is routed to the correct office and tracked.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="visual-feature-section">
        <div className="section-header">
          <h2>How the system works</h2>
          <p>Designed to make campus issue reporting fast, visual, and understandable.</p>
        </div>

        <div className="visual-feature-grid">
          <div className="visual-feature-card">
            <div className="visual-icon blue-bg">📍</div>
            <h3>Report with context</h3>
            <p>
              Students submit issues with title, description, location, and optional image evidence.
            </p>
          </div>

          <div className="visual-feature-card">
            <div className="visual-icon cyan-bg">🤖</div>
            <h3>AI understands the issue</h3>
            <p>
              The AI engine classifies the problem, assigns severity, and generates a short summary.
            </p>
          </div>

          <div className="visual-feature-card">
            <div className="visual-icon purple-bg">🛡</div>
            <h3>Attack-resistant reporting</h3>
            <p>
              Duplicate detection and anomaly scoring reduce spam, fake reports, and suspicious abuse.
            </p>
          </div>

          <div className="visual-feature-card">
            <div className="visual-icon green-bg">🏢</div>
            <h3>Office action workflow</h3>
            <p>
              Offices track issue status from New to Resolved with clearer visibility and accountability.
            </p>
          </div>
        </div>
      </section>

      <section className="impact-banner">
        <div className="impact-left">
          <h3>Why this matters</h3>
          <p>
            Campus complaints are usually scattered in chats, ignored, or delayed.
            CampusEye AI turns unstructured complaints into visible, trackable, and actionable campus intelligence.
          </p>
        </div>

        <div className="impact-right">
          <div className="impact-box">
            <strong>Faster resolution</strong>
            <span>Urgent issues are prioritized automatically</span>
          </div>
          <div className="impact-box">
            <strong>Stronger trust</strong>
            <span>Students can see clearer progress and transparency</span>
          </div>
          <div className="impact-box">
            <strong>Better operations</strong>
            <span>Campus offices receive better-organized issue flows</span>
          </div>
        </div>
      </section>
    </div>
  );
}

export default HomePage;