const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const path = require("path");

const connectDB = require("./config/db");

const testRouter = require("./routes/testRoutes");
const quesRouter = require("./routes/quesRoute");
const userRouter = require("./routes/userRoutes");
const reportRouter = require("./routes/reportRoute");

dotenv.config();

const app = express();

connectDB();

app.use(
  cors({
    origin: "http://localhost:3000", //frontend  url
    credentials: true,
  })
);
app.use(express.json());
app.use(express.static(path.resolve("./public")));
app.use(express.urlencoded({ extended: false }));

const PORTS = process.env.PORT;

app.use("/api/user", userRouter);
app.use("/api/test", testRouter);
app.use("/api/ques", quesRouter);
app.use("/api/report", reportRouter);

app.listen(PORTS, () => console.log(`server started at port ${PORTS}`));
