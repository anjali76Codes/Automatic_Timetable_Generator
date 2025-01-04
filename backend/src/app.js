import express from "express";
import cors from "cors";

const app = express();

// middlewares, wo can communicate with the backend
app.use(
    cors({
        origin: process.env.CORS_ORIGIN,
        credentials: true
    })
);

// ### Common Middleware

// middleware to pass all the json data
app.use(express.json(
    {
        limit: "16kb"
    }
));

app.use(express.urlencoded(
    {
        extended: true,
        limit: "16kb"
    }
));

app.use(express.static("public"));

// import routes
import testingRouter from "./routes/testing.routes.js";

// create routes
app.use("/api/v1/testing", testingRouter);

// once we have /testing, entire control is handled by testingRouter


export { app };