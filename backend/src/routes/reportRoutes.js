const express = require("express");
const router = express.Router();

const {
  analyzeReport,
  createReport,
  getAllReports,
  getReportById,
  updateReportStatus
} = require("../controllers/reportController");

router.post("/analyze", analyzeReport);
router.post("/", createReport);
router.get("/", getAllReports);
router.get("/:id", getReportById);
router.patch("/:id/status", updateReportStatus);

module.exports = router;