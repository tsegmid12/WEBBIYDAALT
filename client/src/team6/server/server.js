const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

let selectedRole = null;


app.post("/api", express.json(), (req, res) => {
  const { role } = req.body;

  if (!role) {
    return res.status(400).json({ message: "Role is required" });
  }

  selectedRole = role;
  res.status(200).json({
    message: `Role ${role} selected successfully`,
    selectedRole: selectedRole,
  });

  console.log(`Role selected: ${selectedRole}`);
});

const allExams = require("../data/mockData.jsx").exams;


app.get("/", (req, res) => {
  res.json({ message: "API is running..." });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

module.exports = app;
