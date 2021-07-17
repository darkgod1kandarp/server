const express = require("express");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const cors = require("cors");
const app = express();
const mysql = require("mysql2");
app.use(cors());
app.use(express.json({limit:"50mb"}));
var mailjet = require ('node-mailjet').connect("7a92a782bec6c95b4938cffe0dcafbc7","8834329e09ddf2c22105a769843ab089");

const otp = () => {
  let data = "";
  for (let x = 0; x < 4; x++) {
    data += `${Math.floor(Math.random() * 10)}`;
  }
  return data;
};

// function sendEmail(recipient) {
//   const opo = otp();
//   console.log(opo)
//   return mailjet
//     .post("send", { version: "v3.1" })
//     .request({
//       Messages: [
//         {
//           From: {
//             Email: "rushabh.s1@ahduni.edu.in",
//             Name: "your-application-name",
//           },
//           To: [
//             {
//               Email: recipient,
//             },
//           ],
//           Subject: "OTP123",
//           TextPart: opo,
//                   },
//       ],
//     })
//     .then((result) => {
//       // do something with the send result or ignore
      
//     })
//     .catch((err) => {
//       // console.log(err)
//       // handle an error
//     });
// }

// sendEmail("rushabh.s1@ahduni.edu.in")
var transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "009kandarp@gmail.com",
    pass: "dipika@sharda123",
  },
});
var fileupload = require("express-fileupload");
app.use(express.static("tmp"));

app.use(
  fileupload({
    useTempFiles: true,
  })
);

var cloudinary = require("cloudinary").v2;
cloudinary.config({
  cloud_name: "dtwhvz6fw",
  api_key: "887421474662129",
  api_secret: "J_FYy1R5c51yu92TXeuZ5YvGm9w",
});


const pool = mysql.createPool({
  host: "localhost",
  database: "pgfinder",
  user: "root",
  password: "1234567",
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

app.post("/api/signin", async (req, res) => {
  const { username, password, acctype, email } = req.body;
  console.log(req.body);
  let sql = `select pgfinder.checking1('${username}', '${password}','${acctype}','${email}') as c1;`;
  const [row1, column1] = await db.query(sql);
  console.log(row1);
  if (row1[0].c1 == 0) {
    res.json({ data: "no account" });
  } else {
    res.json({ data: "already have account" });
  }
});

app.post("/api/login1", async (req, res) => {
  const { username, password } = req.body;
  console.log(req.body);
  let sql = `select count(*) as c1 from userdetails where  name ='${username}'  and password='${password}';`;
  const [row1, column1] = await db.query(sql);

  const count = row1[0].c1;
  if (count == 0) {
    res.json({ data: "not found" });
  } else {
    let sql = `select acctype from userdetails where name='${username}';`;
    const [row2, column2] = await db.query(sql);
    res.json({ data: row2[0].acctype });

    // if(count===0){
    //   res.json(data)
    // }
    // else{

    // }
  }
});

const StoringOnCloud = (dataURI) => {
  cloudinary.uploader.upload(dataURI, (err, result) => {
    return result.url;
  });
};

app.post("/api/signupowner", async (req, res) => {
  const { username, password, email, phoneNumber, personalImage, pgLicence,acctype } = req.body;

  const personalImageUrl = await StoringOnCloud(personalImage);
  const pgLicenceUrl = await StoringOnCloud(pgLicence);

  
  let sql = `select pgfinder.checking1('${username}', '${password}','${acctype}','${email}') as c1;`;
  let [row1, column1] = await db.query(sql);
  console.log(row1);
  if (row1[0].c1 == 0) {
    sql =` insert into OwnerDetails value('${username}','${personalImageUrl}','${pgLicenceUrl}',${phoneNumber});`
    [row1, column1] = await db.query(sql);
    res.json({ data: "account created" });
  } else {
    res.json({ data: "already have account" });
  }

});

app.post("/api/update",async(req,res)=>{
  const {password,username} =req.body
  let sql=`update userdetails set password='${password}' where name ='${username}'`
  const [row1, column1] = await db.query(sql)
    res.json({data:"updated"})

})

app.post("/api/forgotpassword",async (req, res) => {
    const { username } = req.body;
    console.log(req.body);
    let sql = `select email from userdetails where name='${username}';`;
    const [row1, column1] = await db.query(sql);

    const opo=otp()

    mailjet
    .post("send", { version: "v3.1" })
    .request({
      Messages: [
        {
          From: {
            Email: "rushabh.s1@ahduni.edu.in",
            Name: "your-application-name",
          },
          To: [
            {
              Email: row1[0].email,
            },
          ],
          Subject: "OTP123",
          TextPart: opo,
                  },
      ],
    })
    .then((result) => {
      console.log("send")
      res.json({data:opo})
      
    })
    .catch((err) => {
      // console.log(err)
      // handle an error
    });
      // var mailOptions = {
      //   from: "009kandarp@gmail.com",
      //   to: `${row1[0].email}`,
      //   subject: "Sending Email using Node.js",
      //   text: opo,
      // };

      // console.log(row1[0].email);

      // transporter.sendMail(mailOptions, function (error, info) {
      //   if (error) {
      //     res.sendStatus(403);
      //   } else {
      //     res.json({ data: opo });
      //   }
      // });
    
  });


app.post("/api/homepage", verifyToken, async (req, res) => {
  jwt.verify(req.token, "secretkey", async (err, authData) => {
    if (err) {
      res.sendStatus(403);
    } else {
      const { username, password, email } = req.body;
      let sql = `select acctype from userdetails where name ='${username}'; `;
      const [acctype1, column4] = await db.query(sql);
      res.json({ acctype: acctype1[0].acctype });
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
