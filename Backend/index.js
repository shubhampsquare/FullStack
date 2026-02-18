// local imports
const connectDB = require("./Config/db");

const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const ProductRoute = require("./Routes/productRoutes");

const app = express();
const PORT = 3000;

// Middleware 
dotenv.config();

app.use(express.json());
app.use(cors());

// connect to db
connectDB();

app.use("/product", ProductRoute);

// Routes
app.get("/", (req, res) => {
  res.send("Server is running");
});

app.get("/api/hello", (req, res) => {
  res.json({ message: "Hello from backend" });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
