const db = require("../database/db");

const normalizeText = (text) => {
  return text.toLowerCase().replace(/[^\w\s]/g, "").trim();
};

const detectDuplicateReport = (description, location, category) => {
  return new Promise((resolve, reject) => {
    const normalizedDescription = normalizeText(description);

    const query = `
      SELECT id, description, location, category
      FROM reports
      WHERE LOWER(location) = LOWER(?)
        AND LOWER(category) = LOWER(?)
      ORDER BY id DESC
    `;

    db.all(query, [location, category], (err, rows) => {
      if (err) {
        return reject(err);
      }

      const duplicate = rows.find((report) => {
        const existingDescription = normalizeText(report.description);

        return (
          existingDescription.includes(normalizedDescription) ||
          normalizedDescription.includes(existingDescription) ||
          existingDescription.slice(0, 20) === normalizedDescription.slice(0, 20)
        );
      });

      if (duplicate) {
        resolve({
          duplicate_flag: true,
          duplicate_of: duplicate.id
        });
      } else {
        resolve({
          duplicate_flag: false,
          duplicate_of: null
        });
      }
    });
  });
};

module.exports = {
  detectDuplicateReport
};