const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
app.use(cookieParser());
const cors = require("cors");
require("dotenv").config();
const allowedOrigins = ['https://mimtest.onrender.com'];
corsOptions = {
    origin: (origin, callback) => {
        if(allowedOrigins.indexOf(origin) !== -1 || !origin) {
            callback(null, true);
        }else {
            callback(new Error('Not allowed by cors'));
        }
    },
    credentials: true,
    optionSuccessStatus: 200,
    method: ['GET', 'POST', "PUT", "DELETE"]
}
app.use(cors(corsOptions));

// DB
const connectDB = require("./db/db");
connectDB();

// allow json req.body
app.use(express.json());
app.use(express.urlencoded({extended: true}));

// routes
const userRouter = require("./routes/userRoutes");
app.use("/api/v1", userRouter);

// errors
const { notFound, errorHandleMiddleware } = require("./middleware/errorMiddleware");
app.use(notFound);
app.use(errorHandleMiddleware);

// port
const port = process.env.PORT || 8000;

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
})