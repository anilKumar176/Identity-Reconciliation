const express = require("express");
const cors = require("cors");

const sequelize = require("./config/db");
require("./models/contactModel");

const identifyRoutes = require("./routes/identifyRoutes");

const app = express();

app.use(cors());
app.use(express.json());

sequelize.sync();

app.use("/", identifyRoutes);

app.get("/", (req, res) => {
res.send("Bitespeed Backend Running");
});

const PORT = 5000;

app.listen(PORT, () => {
console.log(`Server running on port ${PORT}`);
});