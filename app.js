require("dotenv").config();
require("./config/db").connect();
const express = require("express");
const app = express();

const { PORT } = process.env
app.listen(PORT, () => [
    console.log(`local host running at ${PORT}`)
])