const db = require("../database/db");

const suspiciousWords = ["aaa", "test", "spam", "fake", "asdf", "qwerty"];

const detectAnomaly = (description, location) => {
  return new Promise((resolve, reject) => {
    const text = description.toLowerCase().trim();

    let anomalyScore = 0;
    let anomalyFlag = false;

    if (text.length < 10) {
      anomalyScore += 0.3;
    }

    if (suspiciousWords.some((word) => text.includes(word))) {
      anomalyScore += 0.4;
    }

    const query = `
      SELECT COUNT(*) as count
      FROM reports
      WHERE LOWER(description) = LOWER(?)
        AND LOWER(location) = LOWER(?)
    `;

    db.get(query, [description, location], (err, row) => {
      if (err) {
        return reject(err);
      }

      if (row.count >= 2) {
        anomalyScore += 0.4;
      }

      if (anomalyScore >= 0.5) {
        anomalyFlag = true;
      }

      resolve({
        anomaly_flag: anomalyFlag,
        anomaly_score: Number(anomalyScore.toFixed(2))
      });
    });
  });
};

module.exports = {
  detectAnomaly
};