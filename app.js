require("dotenv").config();
require("./config/db").connect();
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const cors = require("cors")
const authRoutes = require("./routes/authRouter")

// Middleware
app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors());

// routes
app.use("/api", authRoutes)

const { PORT } = process.env
app.listen(PORT, () => [
    console.log(`local host running at ${PORT}`)
])