require('dotenv').config();
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');

const errorMiddleware = require("./middlewares/error");
const notFoundMiddleware = require("./middlewares/notFound");

const authRoute = require("./routes/authRoute");
const homeRoute = require("./routes/homeRoute");

const app = express();

// const { sequelize } = require("./models");
// sequelize.sync({ force: true });

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

if (process.env.NODE_ENV === 'DEVELOPMENT') {
  app.use(morgan('dev'));
}

app.use("/auth", authRoute);
app.use("/", homeRoute);








app.use(notFoundMiddleware);
app.use(errorMiddleware);

const port = process.env.PORT || 8000;
app.listen(port, () => console.log('server running on port: ' + port));
