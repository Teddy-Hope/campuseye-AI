👁️ CampusEye AI

AI-Powered Campus Problem Reporter Turning campus complaints into intelligent, prioritized actions.


📍 The Problem

Students at Bahir Dar University face daily challenges such as water shortages, Wi-Fi outages, sanitation issues, and equipment failures. Currently, these complaints are scattered across Telegram and WhatsApp, leading to:

    Data Loss: Important issues get buried in chat history.

    Duplication: Multiple students report the same issue, wasting resources.

    No Prioritization: Critical safety issues are treated the same as minor inconveniences.

💡 Our Solution

CampusEye AI provides a centralized platform where students can report problems with Text + Photo + Location. Our system uses AI to:

    Classify: Automatically identify the department (Water, ICT, Security).

    Prioritize: Score urgency from "Low" to "Critical."

    Deduplicate: Alert admins if the same issue has already been reported.

    Analyze: Detect anomalies or spam reports.

    Route: Send the report directly to the office responsible for fixing it.

🛠️ Tech Stack

    Frontend: React.js + Vite

    Backend: Node.js + Express.js

    AI Engine: Google Gemini API

    Image Handling: Cloudinary API + Multer

    Database: SQLite / PostgreSQL

🚀 How to Run Locally
1. Backend Setup
Bash

cd backend
npm install
# Create a .env file with your GEMINI_API_KEY and CLOUDINARY keys
npm run dev

2. Frontend Setup (In a new terminal)
Bash

cd frontend
npm install
npm run dev

📄 Documentation

For a deep dive into the system logic, check out our full documentation:

👉 CampusEye AI Documentation.docx

Made with ❤️ for Bahir Dar University students. CampusEye AI – Smart Campus, Better Life
