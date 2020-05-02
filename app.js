require("dotenv").config();
var cors = require('cors')
const express = require("express");
const morgan = require("morgan");
var bodyParser = require('body-parser')

const app = express();
const userRouter = require("./server/routes/user");
const typeRouter = require("./server/routes/type");
const sessionRouter = require("./server/routes/session");

//Remove when in production
app.use(cors({
    credentials: true,
    origin: true
}));
app.use(morgan("dev"));
app.use(express.json());
app.use(bodyParser.json());



app.use("/user", userRouter);
app.use("/type", typeRouter);
app.use("/session", sessionRouter);



app.listen(process.env.APP_PORT, () => {
    console.log("Server running on port", process.env.APP_PORT);
})


//When route does not exist, show the requester this message
app.get('*', (req, res) => {
    res.json({
        message: "Welcome to the SWARV-API"
    });
});
