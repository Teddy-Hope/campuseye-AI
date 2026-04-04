const db = require("../database/db");
const { analyzeReportWithAI } = require("../services/aiService");
const { detectDuplicateReport } = require("../utils/detectDuplicate");
const { detectAnomaly } = require("../utils/detectAnomaly");
const { uploadImageToCloudinary } = require("../services/imageUploadService");

const allowedStatuses = ["New", "In Review", "In Progress", "Resolved"];

const analyzeReport = async (req, res) => {
  try {
    const { description } = req.body;

    if (!description || description.trim() === "") {
      return res.status(400).json({
        success: false,
        message: "Description is required"
      });
    }

    const aiResult = await analyzeReportWithAI(description);

    return res.status(200).json({
      success: true,
      data: aiResult
    });
  } catch (error) {
    console.error("Controller Error:", error.message);

    return res.status(500).json({
      success: false,
      message: "Something went wrong while analyzing the report"
    });
  }
};

const createReport = async (req, res) => {
  try {
    const { title, description, location } = req.body;

    if (!title || !description || !location) {
      return res.status(400).json({
        success: false,
        message: "Title, description, and location are required"
      });
    }

    let image_url = "";

    if (req.file) {
      image_url = await uploadImageToCloudinary(req.file.buffer);
    }

    const aiResult = await analyzeReportWithAI(description);
    const duplicateResult = await detectDuplicateReport(
      description,
      location,
      aiResult.category
    );
    const anomalyResult = await detectAnomaly(description, location);

    const createdAt = new Date().toISOString();
    const updatedAt = createdAt;

    const insertQuery = `
      INSERT INTO reports (
        title,
        description,
        location,
        image_url,
        status,
        category,
        severity,
        ai_summary,
        office_route,
        duplicate_flag,
        duplicate_of,
        anomaly_flag,
        anomaly_score,
        created_at,
        updated_at
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;

    const values = [
      title,
      description,
      location,
      image_url,
      "New",
      aiResult.category,
      aiResult.severity,
      aiResult.summary,
      aiResult.office_route,
      duplicateResult.duplicate_flag ? 1 : 0,
      duplicateResult.duplicate_of,
      anomalyResult.anomaly_flag ? 1 : 0,
      anomalyResult.anomaly_score,
      createdAt,
      updatedAt
    ];

    db.run(insertQuery, values, function (err) {
      if (err) {
        console.error("Insert Report Error:", err.message);
        return res.status(500).json({
          success: false,
          message: "Failed to save report"
        });
      }

      const newReport = {
        id: this.lastID,
        title,
        description,
        location,
        image_url,
        status: "New",
        category: aiResult.category,
        severity: aiResult.severity,
        ai_summary: aiResult.summary,
        office_route: aiResult.office_route,
        duplicate_flag: duplicateResult.duplicate_flag,
        duplicate_of: duplicateResult.duplicate_of,
        anomaly_flag: anomalyResult.anomaly_flag,
        anomaly_score: anomalyResult.anomaly_score,
        created_at: createdAt,
        updated_at: updatedAt
      };

      return res.status(201).json({
        success: true,
        data: newReport
      });
    });
  } catch (error) {
    console.error("Create Report Error:", error.message);

    return res.status(500).json({
      success: false,
      message: "Failed to create report"
    });
  }
};

const getAllReports = (req, res) => {
  const query = `SELECT * FROM reports ORDER BY id DESC`;

  db.all(query, [], (err, rows) => {
    if (err) {
      console.error("Get All Reports Error:", err.message);
      return res.status(500).json({
        success: false,
        message: "Failed to fetch reports"
      });
    }

    const formattedRows = rows.map((report) => ({
      ...report,
      duplicate_flag: Boolean(report.duplicate_flag),
      anomaly_flag: Boolean(report.anomaly_flag)
    }));

    return res.status(200).json({
      success: true,
      count: formattedRows.length,
      data: formattedRows
    });
  });
};

const getReportById = (req, res) => {
  const reportId = Number(req.params.id);

  const query = `SELECT * FROM reports WHERE id = ?`;

  db.get(query, [reportId], (err, row) => {
    if (err) {
      console.error("Get Report By ID Error:", err.message);
      return res.status(500).json({
        success: false,
        message: "Failed to fetch report"
      });
    }

    if (!row) {
      return res.status(404).json({
        success: false,
        message: "Report not found"
      });
    }

    const formattedReport = {
      ...row,
      duplicate_flag: Boolean(row.duplicate_flag),
      anomaly_flag: Boolean(row.anomaly_flag)
    };

    return res.status(200).json({
      success: true,
      data: formattedReport
    });
  });
};

const updateReportStatus = (req, res) => {
  const reportId = Number(req.params.id);
  const { status } = req.body;

  if (!status) {
    return res.status(400).json({
      success: false,
      message: "Status is required"
    });
  }

  if (!allowedStatuses.includes(status)) {
    return res.status(400).json({
      success: false,
      message: `Invalid status. Allowed values are: ${allowedStatuses.join(", ")}`
    });
  }

  const updatedAt = new Date().toISOString();

  const updateQuery = `
    UPDATE reports
    SET status = ?, updated_at = ?
    WHERE id = ?
  `;

  db.run(updateQuery, [status, updatedAt, reportId], function (err) {
    if (err) {
      console.error("Update Status Error:", err.message);
      return res.status(500).json({
        success: false,
        message: "Failed to update report status"
      });
    }

    if (this.changes === 0) {
      return res.status(404).json({
        success: false,
        message: "Report not found"
      });
    }

    const selectQuery = `SELECT * FROM reports WHERE id = ?`;

    db.get(selectQuery, [reportId], (selectErr, row) => {
      if (selectErr) {
        console.error("Fetch Updated Report Error:", selectErr.message);
        return res.status(500).json({
          success: false,
          message: "Status updated, but failed to fetch updated report"
        });
      }

      const formattedReport = {
        ...row,
        duplicate_flag: Boolean(row.duplicate_flag),
        anomaly_flag: Boolean(row.anomaly_flag)
      };

      return res.status(200).json({
        success: true,
        message: "Report status updated successfully",
        data: formattedReport
      });
    });
  });
};

// toolbox
module.exports = {
  analyzeReport,
  createReport,
  getAllReports,
  getReportById,
  updateReportStatus
};