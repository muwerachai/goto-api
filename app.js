require('dotenv').config();
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const path = require("path");

const errorMiddleware = require("./middlewares/error");
const notFoundMiddleware = require("./middlewares/notFound");
const authenticateMiddleware = require("./middlewares/authenticate");

const authRoute = require("./routes/authRoute");
const userRoute = require("./routes/userRoute");
const homeRoute = require("./routes/homeRoute");
const placeRoute = require("./routes/placeRoute");


const { addProvince } = require("./service/provinceService");
const { addCategory } = require("./service/categoryService");
const app = express();

// const { sequelize } = require("./models");
// sequelize.sync({ force: true });
// addProvince();
// addCategory(
//   path.join(__dirname, "/public/img/attraction.jpeg"),
//   path.join(__dirname, "/public/img/restaurant.jpeg"),
//   path.join(__dirname, "/public/img/streetFood.jpeg"),
//   path.join(__dirname, "/public/img/nightLife.jpeg")
// );
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

if (process.env.NODE_ENV === 'DEVELOPMENT') {
  app.use(morgan('dev'));
}

// app.get("/attraction.jpg", (req, res, next) => {
//   redirect("./attraction.jpg");
// });

app.use("/user", userRoute);
app.use("/auth", authRoute);
app.use("/place", authenticateMiddleware, placeRoute);

// app.use("/", authenticateMiddleware, homeRoute);


app.use(notFoundMiddleware);
app.use(errorMiddleware);

const port = process.env.PORT || 8000;
app.listen(port, () => console.log('server running on port: ' + port));
