const express = require("express");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const cors = require("cors");
const app = express();
const mysql = require("mysql2");
app.use(cors());
app.use(express.json());
var transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "009kandarp@gmail.com",
    pass: "dipika@sharda123",
  },
});

const otp = () => {
  let data ="";
  for (let x = 0; x < 4; x++) {
    data += `${Math.floor(Math.random() * 10)}`;
  }
   return data;
};

const pool = mysql.createPool({
  host: "localhost",
  database: "pgfinder",
  user: "root",
  password: "123456",
  port: "3306",
});
const db = pool.promise();
app.post("/api/posts", verifyToken, (req, res) => {
  console.log(req.body);
  jwt.verify(req.token, "secretkey", (err, authData) => {
    if (err) {
      res.sendStatus(403);
    } else {
      res.json({
        message: "Post created...",
        authData,
      });
    }
  });
});

app.post("/api/login", (req, res) => {
  // Mock user
  const user = {
    id: 1,
    username: "brad",
    email: "brad@gmail.com",
  };

  jwt.sign({ user }, "secretkey", (err, token) => {
    res.json({
      token,
    });
  });
});

app.post("/api/signin", verifyToken, (req, res) => {
  jwt.verify(req.token, "secretkey", async (err, authData) => {
    if (err) {
      res.sendStatus(403);
    } else {
      const { username, password, acctype, email } = req.body;
      let sql = `select pgfinder.checking1('${username}', '${password}','${acctype}','${email}') as c1;`;
      const [row1, column1] = await db.query(sql);

      if (row1[0].c1 == 0) {
        res.json({ data: "/pg" });
      } else {
        res.json({ data: "already have account" });
      }
    }
  });
});

app.post("/api/login1", verifyToken, (req, res) => {
  jwt.verify(req.token, "secretkey", async (err, authData) => {
    if (err) {
      res.sendStatus(403);
    } else {
      const { username, password } = req.body;
      let sql = `select count(*) as c1 from userdetails where  name ='${username}'  and password='${password}';`;
      const [row1, column1] = await db.query(sql);

      const count = row1[0].c1;
      if (count == 0) {
        res.json({ data: "not found" });
      } else {
        res.json({ data: "founded" });
      }

      // if(count===0){
      //   res.json(data)
      // }
      // else{

      // }
    }
  });
});

app.post("/api/forgotpassword", verifyToken, (req, res) => {
  jwt.verify(req.token, "secretkey", async (err, authData) => {
    const { username } = req.body.data;
    console.log(req.body.data);
    let sql = `select email from userdetails where name='${username}';`
    const [row1, column1] = await db.query(sql);
    if (err) {
      res.sendStatus(403);
    } else {
      const opo = otp()
      var mailOptions = {
        from: "009kandarp@gmail.com",
        to: `${row1[0].email}`,
        subject: "Sending Email using Node.js",
        text: opo
      };

      
       
      console.log(row1[0].email);
      transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
          console.log(error);
          res.sendStatus(403);
        } else {
          res.json({data:opo})
        }
      });
     
    }
  });
});



function verifyToken(req, res, next) {
  const bearerHeader = req.headers["authorization"];

  if (typeof bearerHeader !== "undefined") {
    const bearer = bearerHeader.split(" ");

    const bearerToken = bearer[1];

    req.token = bearerToken;

    next();
  } else {
    // Forbidden
    res.sendStatus(403);
  }
}
const Port = process.env.PORT || 5000;
app.listen(Port, () => console.log("Server started on port 5000"));
