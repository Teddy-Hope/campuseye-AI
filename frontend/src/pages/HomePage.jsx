import { Link } from "react-router-dom";

function HomePage() {
  return (
    <div style={{ padding: "30px" }}>
      <h1>CampusEye AI</h1>
      <p>Turning campus complaints into smart action.</p>

      <div style={{ marginTop: "20px", display: "flex", gap: "10px" }}>
        <Link to="/report">
          <button>Submit Report</button>
        </Link>

        <Link to="/reports">
          <button>View Reports</button>
        </Link>
      </div>
    </div>
  );
}

export default HomePage;