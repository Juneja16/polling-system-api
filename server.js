const express = require("express");
const connectDB = require("./App/Config/database");
const questionRoutes = require("./App/Routes/question");
const app = express();
const PORT = 8020;

app.use(express.json());
app.use("/questions", questionRoutes);

connectDB();

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
