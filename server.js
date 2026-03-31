import express from "express";
import dotenv from "dotenv";
import connectDB from "./app/config/db.js";
import routes from "./app/routes/index.js";

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 8000;

/* Middleware: Body Parser Client text to JS OBj */
app.use(express.json());

/* Routes*/
app.use("/api", routes);

/*  The 404 Handler for those wrong Urls/ mistypos  */
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: `Route not found - ${req.originalUrl}`,
  });
});

/*  Global Error Handler 
For Errors that are being caught using normal try-catch i.e Middleware bases DB Connection Failed in between */
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
