const express = require("express");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const cors = require("cors");
const app = express();
const mysql = require("mysql2");
const io = require("socket.io")(http, {
    reconnect: true,
  });