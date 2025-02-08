const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();
const cokkieParser = require("cookie-parser");
const authRoute = require("./Routes/AuthRoute.js");

const { MONGO_URL, PORT } = process.env;
const app = express();

mongoose
    .connect(MONGO_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => console.log("Connected to MongoDB"))
    .catch((err) => console.log(err));


app.listen(PORT, () => {
    console.log(`Server started on PORT ${PORT}`);
});


app.use(cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true
}));

app.use(express.json());
app.use(cokkieParser());

app.use("/", authRoute)