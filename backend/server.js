const express = require("express");
const app = express();
app.use(express.json());
const dotenv = require("dotenv");
dotenv.config();
const cors = require("cors");
const cookieParser = require("cookie-parser");
const { connectDB } = require("./database");
const { errorHandler } = require("./middlewares/errorHandler");
const { userRouter } = require("./routers/userRouter");
connectDB()
const corsOptions = {
  origin: `${process.env.CLIENT_DOMAIN}`,
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE"],
};
app.use(cors(corsOptions));
app.use(cookieParser());


app.use('/api/auth', userRouter)




app.use(errorHandler);
app.listen(process.env.PORT, () => {
  console.log(`http://localhost:${process.env.PORT}`);
});