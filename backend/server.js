import express from "express";
import dotenv from "dotenv";
import path from "path";
import { connectDB } from "./config/db.js";
import notesRoutes from "./routes/notes.route.js";
import userRouters from "./routes/user.router.js";

dotenv.config();
const app = express();

const PORT = process.env.PORT || 5000;

const __dirname = path.resolve();

app.use(express.json());

app.use("/api/notes", notesRoutes);
app.use("/api/auth", userRouters);

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "/frontend/dist")));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"));
  });
}

app.listen(PORT, () => {
  connectDB();
  console.log(`Server is started http://localhost:${PORT}`);
});
