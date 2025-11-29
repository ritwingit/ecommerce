import express from "express";
import dotenv from "dotenv";
import YAML from "yamljs";
import swaggerUi from "swagger-ui-express";
dotenv.config();
const swaggerDocument = YAML.load("./docs/swagger.yaml");
import connectDB from "./config/db.js";
import { seedRoles } from "./config/authRoles.js";

connectDB();

import path from "path";
import cors from "cors";

import authRoutes from "./routes/authRoutes.js";
import productRoutes from "./routes/productRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
import cartRoutes from "./routes/cartRoutes.js";
import { fileURLToPath } from "url";

const app = express();

async () => {
  await connectDB();
  await seedRoles();
};

app.use(express.json());

app.use(cors());
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use(express.static(path.join(__dirname, "public")));

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// ✅ Serve index.html correctly
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

// API routes
app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/cart", cartRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`the server is running on http://localhost:${PORT}`);
});
