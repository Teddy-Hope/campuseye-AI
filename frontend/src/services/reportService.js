import axios from "axios";

// 1. baseURL መጨረሻ ላይ /api/reports የሚለውን ጨምርበት
const API = axios.create({
  baseURL: "https://campuseye-backend-wq1x.onrender.com/api/reports"
});

// 2. እዚህ ጋር "/" ብቻ ማድረጉ አሁን ትክክል ይሆናል (ምክንያቱም baseURL ውስጥ ስላለ)
export const createReport = (formData) =>
  API.post("/", formData, {
    headers: {
      "Content-Type": "multipart/form-data"
    }
  });

export const getAllReports = () => API.get("/");
export const getReportById = (id) => API.get(`/${id}`);
export const updateReportStatus = (id, status) =>
  API.patch(`/${id}/status`, { status });