const db = require("./db");

const initDb = () => {
  const createReportsTable = `
    CREATE TABLE IF NOT EXISTS reports (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT NOT NULL,
      description TEXT NOT NULL,
      location TEXT NOT NULL,
      image_url TEXT,
      status TEXT NOT NULL,
      category TEXT,
      severity TEXT,
      ai_summary TEXT,
      office_route TEXT,
      duplicate_flag INTEGER DEFAULT 0,
      duplicate_of INTEGER,
      anomaly_flag INTEGER DEFAULT 0,
      anomaly_score REAL DEFAULT 0,
      created_at TEXT,
      updated_at TEXT
    )
  `;

  db.run(createReportsTable, (err) => {
    if (err) {
      console.error("Error creating reports table:", err.message);
    } else {
      console.log("Reports table ready");
    }
  });
};

module.exports = initDb;