require('dotenv').config();
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const { error } = require("./middlewares/error");
const { notFound } = require("./middlewares/notFound");

// const { sequelize } = require("./models");
// sequelize.sync({ force: true });

const app = express();
app.use(cors());
if (process.env.NODE_ENV === 'DEVELOPMENT') {
  app.use(morgan('dev'));
}
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(notFound);
app.use(error);

const port = process.env.PORT || 8000;
app.listen(port, () => console.log('server running on port: ' + port));
