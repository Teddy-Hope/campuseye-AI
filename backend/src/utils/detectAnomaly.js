const reports = require("./reportStore");

const suspiciousWords = ["aaa", "test", "spam", "fake", "asdf", "qwerty"];

const detectAnomaly = (description, location) => {
  const text = description.toLowerCase().trim();

  let anomalyScore = 0;
  let anomalyFlag = false;

  if (text.length < 10) {
    anomalyScore += 0.3;
  }

  if (suspiciousWords.some((word) => text.includes(word))) {
    anomalyScore += 0.4;
  }

  const similarRecentReports = reports.filter(
    (report) =>
      report.description.toLowerCase().trim() === text &&
      report.location.toLowerCase() === location.toLowerCase()
  );

  if (similarRecentReports.length >= 2) {
    anomalyScore += 0.4;
  }

  if (anomalyScore >= 0.5) {
    anomalyFlag = true;
  }

  return {
    anomaly_flag: anomalyFlag,
    anomaly_score: Number(anomalyScore.toFixed(2))
  };
};

module.exports = {
  detectAnomaly
};