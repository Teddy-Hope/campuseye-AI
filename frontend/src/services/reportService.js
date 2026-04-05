import axios from "axios";

const API = axios.create({
  baseURL: "https://campuseye-backend-wq1x.onrender.com"
});

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