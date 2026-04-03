const reports = require("./reportStore");

const normalizeText = (text) => {
  return text.toLowerCase().replace(/[^\w\s]/g, "").trim();
};

const detectDuplicateReport = (description, location, category) => {
  const normalizedDescription = normalizeText(description);

  const duplicateReport = reports.find((report) => {
    const sameLocation =
      report.location.toLowerCase() === location.toLowerCase();

    const sameCategory =
      report.category.toLowerCase() === category.toLowerCase();

    const existingDescription = normalizeText(report.description);

    const similarText =
      existingDescription.includes(normalizedDescription) ||
      normalizedDescription.includes(existingDescription) ||
      existingDescription.slice(0, 20) === normalizedDescription.slice(0, 20);

    return sameLocation && sameCategory && similarText;
  });

  if (duplicateReport) {
    return {
      duplicate_flag: true,
      duplicate_of: duplicateReport.id
    };
  }

  return {
    duplicate_flag: false,
    duplicate_of: null
  };
};

module.exports = {
  detectDuplicateReport
};