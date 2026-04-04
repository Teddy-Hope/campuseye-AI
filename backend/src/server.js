const express = require("express"); 
const cors = require("cors"); // for unblocking the requests of React to Node in the browser
const dotenv = require("dotenv");

dotenv.config();

const reportRoutes = require("./routes/reportRoutes");
const initDb = require("./database/initDb");

const app = express();

app.use(cors());
app.use(express.json());

initDb();

app.get("/", (req, res) => {
  res.json({ message: "CampusEye AI backend is running" });
});

app.use("/api/reports", reportRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});