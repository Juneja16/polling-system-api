import express from "express";
import dotenv from "dotenv";
import connectDB from "./app/config/db.js";
import routes from "./app/routes/index.js";

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 8000;

/* Middleware: Body Parser */
app.use(express.json());

/* Routes*/
app.use("/api", routes);

/*  The 404 Handler */
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: `Route not found - ${req.originalUrl}`,
  });
});

/*  Global Error Handler */
app.use((err, req, res, next) => {
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  res.status(statusCode).json({
    success: false,
    message: err.message,
  });
});

const startServer = async () => {
  try {
    //  Database Connection
    await connectDB();
    console.log("✅ Database Connected Successfully");

    app.listen(PORT, () => {
      console.log(` Server running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error(` Error starting server: ${error.message}`);
    process.exit(1);
  }
};
startServer();
