import express from "express";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

let currentRole = null;

app.post("/api/select-role", (req, res) => {
  const { role } = req.body;
  currentRole = role;
  res.json({ status: "ok", selectedRole: role });
});

app.get("/api/current-role", (req, res) => {
  res.json({ selectedRole: currentRole });
});

app.listen(3000, () =>
  console.log("Server running at http://localhost:3000")
);
