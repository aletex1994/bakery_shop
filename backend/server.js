const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

require("dotenv").config();

const app = express();
const port = process.env.PORT || 8000;

const uri = process.env.ATLAS_URI;
mongoose.connect(uri);
const connection = mongoose.connection;
connection.once("open", () => {
 console.log("MongoDB database connection active");
});

const usersRoute = require("./routes/users");
const cakesRoute = require("./routes/cakes");

app.use(cors());
app.use(express.json());
app.use("/cakes", cakesRoute);
app.use("/users", usersRoute);

app.listen(port, () => {
 console.log(`Server is actually running on port: ${port}`);
});
