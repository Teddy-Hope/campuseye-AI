const express = require("express");
const router = express.Router();
const upload = require("../middleware/uploadMiddleware");

const {
  analyzeReport,
  createReport,
  getAllReports,
  getReportById,
  updateReportStatus
} = require("../controllers/reportController");

router.post("/analyze", analyzeReport);
router.post("/", upload.single("image"), createReport);
router.get("/", getAllReports);
router.get("/:id", getReportById);
router.patch("/:id/status", updateReportStatus);

module.exports = router;