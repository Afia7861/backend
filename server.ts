import express from "express";
import studentRoutes from "./routes/studentRoutes";

const app = express();

app.use(express.json());

app.use("/students", studentRoutes);

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});