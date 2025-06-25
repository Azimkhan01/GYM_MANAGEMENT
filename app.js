//all npm modules
const express = require("express");
const app = express();
const helmet = require("helmet");
const cookieParser = require("cookie-parser");
const path = require("path");
const hbs = require("hbs");
const {router} = require("./router/routes");
require('dotenv').config();

//all middlewares
app.use("/public",express.static(path.join(__dirname,"/public")));
app.use(express.json());
app.use(express.urlencoded());
// app.use(helmet());
app.use(cookieParser());
app.use("/",router);

app.set("view engine","hbs");
hbs.registerPartials(path.join(__dirname,"/views/partials"));
require('./utils/attendance')
let port = process.env.port || 8000
app.listen(port,"127.0.0.1",()=>{
    console.log(`The application is running on 127.0.0.1:${port}`);
})
