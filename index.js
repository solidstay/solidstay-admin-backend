const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const allowedOrigins = require("./configs/allowedOrigins.config.json");
// Load env from root .env first, then fallback to configs/.env
const dotenv = require("dotenv");
dotenv.config();
dotenv.config({ path: "./configs/.env" });
const connectDB = require("./configs/db.config");
const routes = require("./routes/index");
const trimMiddleware = require("./middleware/trimMiddleware");
const errorHandlerMiddleware = require("./middleware/errorHandlerMiddleware");

// Require only DB connection for app startup; storage is optional and currently disabled.
const requiredEnv = ["DB_URI"];

const missingEnv = requiredEnv.filter((key) => !process.env[key]);

if (missingEnv.length > 0) {
  console.error(
    "❌ Missing required environment variables:",
    missingEnv.join(", ")
  );
  process.exit(1);
}

//Express Server Setup
const app = express();
const port = process.env.PORT || 8080;
const env =
  process.env.NODE_ENV === "production" ? "production" : "development";
// Allow extra CORS origins via env for quick deploys (comma-separated)
const extraOrigins = (process.env.CORS_EXTRA_ORIGINS || "")
  .split(",")
  .map((s) => s.trim())
  .filter(Boolean);
const origins = Array.from(
  new Set([...(allowedOrigins[env] || []), ...extraOrigins])
);
const corsOptions = {
  origin: origins,
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true,
};

//Express Middlewares
app.use((req, res, next) => {
  if (req.originalUrl.startsWith("/api/stripe/webhooks")) {
    express.raw({ type: "application/json" })(req, res, next);
  } else {
    express.json()(req, res, next);
  }
});
app.use(cookieParser());
app.use(cors(corsOptions));
app.use(trimMiddleware);
app.use("/static", express.static(path.join(__dirname, "static")));

const DB = process.env.DB_URI;
connectDB(DB);

//Server status endpoint
app.get("/", (req, res) => {
  res.send("SolidStay Server is up!");
});

// Routes
app.use("/api", routes);

//Error Handler
app.use(errorHandlerMiddleware);

app.listen(port, () => {
  console.log(`Node/Express Server is Up......\nPort: localhost:${port}`);
});
