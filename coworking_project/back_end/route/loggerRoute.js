import { Router } from "express";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const router = Router();
const __filename = fileURLToPath(import.meta.url); // Résout __dirname en ESM
const __dirname = path.dirname(__filename);

const logFilePath = path.join(__dirname, "../logs/application.log");

router.get("/logs", (req, res) => {
  try {
    const logs = fs.readFileSync(logFilePath, "utf8");
    res.status(200).json({ logs });
  } catch (error) {
    res.status(500).json({ message: "Erreur lors de la récupération des logs." });
  }
});

export default router;
