const { analyzeReportWithAI } = require("../services/aiService");
const reports = require("../utils/reportStore");
const { detectDuplicateReport } = require("../utils/detectDuplicate");
const { detectAnomaly } = require("../utils/detectAnomaly");

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

    const aiResult = await analyzeReportWithAI(description);

    const duplicateResult = detectDuplicateReport(
      description,
      location,
      aiResult.category
    );

    const anomalyResult = detectAnomaly(description, location);

    const newReport = {
      id: reports.length + 1,
      title,
      description,
      location,
      status: "New",
      category: aiResult.category,
      severity: aiResult.severity,
      ai_summary: aiResult.summary,
      office_route: aiResult.office_route,
      duplicate_flag: duplicateResult.duplicate_flag,
      duplicate_of: duplicateResult.duplicate_of,
      anomaly_flag: anomalyResult.anomaly_flag,
      anomaly_score: anomalyResult.anomaly_score,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    };

    reports.push(newReport);

    return res.status(201).json({
      success: true,
      data: newReport
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
  return res.status(200).json({
    success: true,
    count: reports.length,
    data: reports
  });
};

const getReportById = (req, res) => {
  const reportId = Number(req.params.id);

  const report = reports.find((item) => item.id === reportId);

  if (!report) {
    return res.status(404).json({
      success: false,
      message: "Report not found"
    });
  }

  return res.status(200).json({
    success: true,
    data: report
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

  const report = reports.find((item) => item.id === reportId);

  if (!report) {
    return res.status(404).json({
      success: false,
      message: "Report not found"
    });
  }

  report.status = status;
  report.updated_at = new Date().toISOString();

  return res.status(200).json({
    success: true,
    message: "Report status updated successfully",
    data: report
  });
};

module.exports = {
  analyzeReport,
  createReport,
  getAllReports,
  getReportById,
  updateReportStatus
};