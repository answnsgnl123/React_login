const express = require('express');
const app = express();
const cors = require('cors');
// const db = require('./config/db');
require('dotenv').config();
const {sign} = require('jsonwebtoken');
const { validateToken } = require('./middlewares/AuthMiddlewares');
// const cookid = request('cookid');
const PORT = process.env.PORT;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended : true}));

//라우팅
const api = require('./routes/api/apiRouter');


app.use("/", api);


app.listen(PORT, ()=>{
  console.log("server start",PORT);
});

module.exports = app;