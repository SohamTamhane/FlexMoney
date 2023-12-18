const express = require("express");
const cors = require("cors");
require("dotenv").config();

const dbConnect = require("./config/database");
const AuthRoute = require("./routes/Auth");

const app = express();
app.use(express.json());
app.use(cors());
dbConnect();

app.use("/api/v1", AuthRoute);

const PORT = process.env.PORT || 8080;
app.listen(PORT, ()=>{
    console.log(`Server Started at PORT: ${PORT}`);
})