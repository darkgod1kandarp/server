const express = require("express");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const cors = require("cors");
const app = express();
const mysql = require("mysql2");
const distance = require("google-distance-matrix");
distance.key("AIzaSyCejofxtxXDqgb1_xYwkgZy06mF-VNa15Q");
const { v4: uuidv4 } = require('uuid');


app.use(cors());  
let bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json({ limit: "50mb" }));
var mailjet = require("node-mailjet").connect(
  "7a92a782bec6c95b4938cffe0dcafbc7",
  "8834329e09ddf2c22105a769843ab089"
);

const otp = () => {
  let data = "";
  for (let x = 0; x < 4; x++) {
    data += `${Math.floor(Math.random() * 10)}`;
  }
  return data;
};

// var transporter = nodemailer.createTransport({
//   service: "gmail",
//   auth: {
//     user: "009kandarp@gmail.com",
//     pass: "dipika@sharda123",
//   },
// });
var fileupload = require("express-fileupload");
app.use(express.static("tmp"));

app.use(
  fileupload({
    useTempFiles: true,
  })
);

// var cloudinary = require("cloudinary").v2;
// const Address = require("ipaddr.js");
// cloudinary.config({
//   cloud_name: "ur-cirkle",
//   api_key: "858755792955291",
//   api_secret: "7Tin6b3Em8ThMYGHLWvyNBPzXRk",
// });


var characters1       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!?#&%@_*';
var characterlength1  =  character1.length;
object1 = {}
object2 = {}
 for(var i = 0; i<length1;  i++){

        var c1 = characters.charAt(Math.floor(Math.random() * charactersLength))
        var c2 = characters.charAt(Math.floor(Math.random() * charactersLength))
        object1[c1] = c2;
        object2[c2] =  c1;
 }


function makeid(length) {
  var result           = '';
  var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
 
  var charactersLength = characters.length;
  for ( var i = 0; i < length; i++ ) {
    result += characters.charAt(Math.floor(Math.random() * 
charactersLength));
 }
 
}



const pool = mysql.createPool({
  host: "163.123.183.88", 
  database: "kandarp",
  user: "admin",
  password: "2OtCm0bY",
  port: "17387"
});  

const db = pool.promise();

// const checking = async()=>{
//     let sql = `select * from kandarp`;
//     const[row1,column1] =  await db.query(sql);
// }
// checking();
// console.log(db);
// const StoringOnCloud = (dataURI) => {
//   cloudinary.uploader.upload(dataURI, (err, result) => {
//     console.log(result.url, 1241);
//     return result.url;
//   });
// };
// const firing = (refineddata, refinedpgid, origins, destinations) => {
//   distance.matrix(origins, destinations, function (err, distances) {
//     if (distances.status == "OK") {
//       var origin = distances.origin_addresses[0];

//       var destination = distances.destination_addresses[0];
//       if (distances.rows[0].elements[0].status == "OK") {
//         var distance = distances.rows[0].elements[0].distance.text;
//         refineddata.push(row1[x]);
//         refinedpgid.push(row1[x]cd authorizA.pgid);
//         return { refineddata, refineddata };
//       }
//     }
//   });
// };



// app.get("/api/verificationpg",async(req,res)=>{

//   let sql = `select * from verified ,pgbasicdetails,ownerdetails where verfied  = 0 and  verified.pgid =pgbasicdetails.pgid and pgbasicdetails.name1 = ownerdetails.name1;`
//   let [verifiedone , column2] =  await db.query(sql);
//   console.log(verifiedone);   
//   res.json({data:verifiedone});   
        
    
// })    

// app.post("/api/dataremoving",async(req,res)=>{
//   const {id} = req.body;
//   sql = `update verified set verfied = 1 where pgid='${id}'`
//   let [row1, column1] = await db.query(sql);
//   res.json({data:"successfully done"})
// })  

// app.post("/api/query",async(req,res)=>{
//   const {available,bedrooms,location,max_area,max_budget,min_area,min_budget,service,sharing} = req.body;
  
//   let sql =`select * from verified ,pgbasicdetails,ownerdetails  where verified.pgid =pgbasicdetails.pgid and pgbasicdetails.name1 = ownerdetails.name1 and availability  in (?)  and  roomsforrent in (?) and ${min_budget}<=costperbed<=${max_budget} and sharing in (?) and ${min_area}<=plotsize<=${max_area};`

//   let [data,column1] =  await db.query(sql,[available,bedrooms,sharing]);
//   Object.keys(location).map((key,index)=>{
//     const origins = [`${location[key].lat},${location[key].lon}`];
//     for(x in data){
//       const destinations = [`${data[x].lat},${data[x].lng}`]
//     distance.matrix(origins, destinations, function (err, distances) {
      
//       if (distances.status == "OK") {
//         if (distances.rows[0].elements[0].status == "OK") {
//           var distance = distances.rows[0].elements[0].distance.text;
//           let array1 = distance.split(" ");
//           let distanceint = Number(array1[0]);
                  
//           if (distanceint < 150) {               
//             console.log(distanceint,123);
//           }
//         }
//       }   
//     });
//   }

//   })
//   res.json({data:"ekefkef"})
// })   

// app.post("/api/carddata", async (req, res) => {
//   const { city, lat, lon } = req.body;
//   const origins = [`${lat},${lon}`];
//   let sql = ` select * from ownerdetails inner join pgbasicdetails on pgbasicdetails.name1 = ownerdetails.name1 ;`;
//   let [row1, column1] = await db.query(sql);
//   const refineddata = [];
//   const refinedpgid = [];
//   let data = {};
//  row1.map((x)=> {
//     const destinations = [`${x.lat},${x.lng}`];
    
//     distance.matrix(origins, destinations, function (err, distances) {
      
//       if (distances.status == "OK") {
//         if (distances.rows[0].elements[0].status == "OK") {
//           var distance = distances.rows[0].elements[0].distance.text;
//           let array1 = distance.split(" ");
//           let distanceint = Number(array1[0]);
                  
//           if (distanceint < 150) {     
//             console.log(x,123);
//             refinedpgid.push(x.pgid);
//             data = { ...data, [x.pgid]: x };
//             console.log(refinedpgid)
//           }
//         }
//       }   
//     });
//   }
//  )
  
//   setTimeout(async () => {  
    
//     for (x in refinedpgid) {
//       sql = `select rule from ruleforpg where pgid  ='${refinedpgid[x]}'`;
//       console.log(sql);
//       let [row1, column1] = await db.query(sql);
//       console.log(row1);
//       data[refinedpgid[x]] = { ...data[refinedpgid[x]], rule: row1 };
//       sql = `select imgurl,description from imagesdata where pgid ='${refinedpgid[x]}'`;      
//       let [row2, column2] = await db.query(sql);
//       data[refinedpgid[x]] = { ...data[refinedpgid[x]], url: row2 };
//       sql = `select service from services where pgid ='${refinedpgid[x]}'`;
//       let [row3, column3] = await db.query(sql);
//       data[refinedpgid[x]] = { ...data[refinedpgid[x]], services: row3 };   
//     }
//     setTimeout(() => {
//       res.json({ data });
//     }, 1000);
//   }, 10000);
// });
// app.post("/api/completion",async(req,res)=>{
//   console.log(req.body);
//   res.json({data:"egjk"});

// })

// app.post("/api/posts", verifyToken, (req, res) => {
//   console.log(req.body);
//   jwt.verify(req.token, "secretkey", (err, authData) => {
//     if (err) {
//       res.sendStatus(403);
//     } else {
//       res.json({
//         message: "Post created...",
//         authData,
//       });
//     }
//   });
// });
// app.post("/api/pgadding", async (req, res) => {
//   const {
//     username,
//     address,
//     PlotArea,
//     avaibility,
//     costPerBed,
//     imgData,
//     imgList,
//     maximumCapacity,
//     flatName,
//     roomsForRent,      //bhk
//     rule,
//     service,
//     sharing,
//     lat,   
//     lng,
//     pgid,  
//   } = req.body;
//   let sql = `insert into pgbasicdetails values ('${username}','${address}','${avaibility}','${roomsForRent}','${sharing}','${flatName}','${pgid}','${maximumCapacity}',${lat},${lng},${PlotArea},${costPerBed});`;
//   console.log(sql, 213);
//   await db.query(sql);
//   const imgList1 = imgList[0];
//   const imgData1 = imgData[0];
//   const rule1 = rule[0];
//   console.log(service);
//   for (let i = 0; i < imgList1.length; i++) {
//     console.log(imgData1[`${i}`]);
//     await cloudinary.uploader.upload(imgList1[i], async (err, result) => {
//       if(!err){
//         console.log(err);  
      
//       sql = `insert into imagesdata values('${pgid}','${result.url}','${
//         imgData1[`${i}`]       
//       }');`;
//       console.log(sql);
//       await db.query(sql);
//     }
//     });
//   }  
//   for (let j = 0; j < rule1.length; j++) {
//     console.log(rule1);
//     sql = `insert into ruleforpg values('${pgid}','${rule1[j]}');`;
//     await db.query(sql);
//   }
//   for (let k in service) {
   
//     sql = `insert into services values('${pgid}','${service[k]}');`;
//     await db.query(sql);
//   }
  
//   sql = `insert into verified values('${pgid}',0)`
//   await db.query(sql);
         

//   res.json({
//     message: "send successfully",
//   });
// });

app.get("/jwttoken", (req, res) => {
  // Mock user
  

  jwt.sign( {},"secretkey", (err, token) => {
    res.json({
      token,
    });
  });
});

  

app.post("/signup",async(req,res)=>{

   const {username ,email,password} = req.body;
   
   let sql = `  select checking1('${makeid(11)}','${username}','${email}','${password}') as c1;`
   

   const [row1] =  await db.query(sql);
  
   if(row1[0].c1===1){
    res.json({message:"alva"})
   }
   else{
    res.json({message:"nalva"})
   }
})  

app.post("/signin",async(req,res)=>{
  const {username,password} =  req.body;
  let sql  = `select count(*) as c1 from userinfo where username = '${username}' and password = '${password}';`
  console.log(sql);
  const [row1,column1] =  await db.query(sql);
  console.log(row1[0].c1)
  if(row1[0].c1===0){
     res.json({message:'nuf'})
  }
  else{
    res.json({
      message:'uf'
    })
  }
})





app.post("/checking", verifyToken, (req, res) => {
  jwt.verify(req.token, "secretkey", async (err, authData) => {
    if (err) {
      //  console.log(err)
      res.json({ message: "not verified" });
    } else {
      res.json({ message: "verified" });
    }
  });
});

app.post("/forgotpassword", async (req, res) => {
  const { username } = req.body;
  console.log(req.body);
  let sql = `select email from userdetails where name='${username}';`;
  const [row1, column1] = await db.query(sql);

  const opo = otp();

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
    
      res.json({ data: opo });
    })
    .catch((err) => {
      res.json({data:"uu"})
    });
});


// app.post("/api/signin", async (req, res) => {
//   const { username, password, acctype, email } = req.body;
//   console.log(req.body);
//   let sql = `select pgfinder.checking1('${username}', '${password}','${acctype}','${email}') as c1;`;
//   const [row1, column1] = await db.query(sql);
//   console.log(row1);
//   if (row1[0].c1 == 0) {
//     res.json({ data: "no account" });
//   } else {
//     res.json({ data: "already have account" });
//   }
// });

// app.post("/api/login1", async (req, res) => {
//   const { username, password } = req.body;
//   console.log(req.body);
//   let sql = `select count(*) as c1 from userdetails where  name ='${username}'  and password='${password}';`;
//   const [row1, column1] = await db.query(sql);

//   const count = row1[0].c1;
//   if (count == 0) {
//     res.json({ data: "not found" });
//   } else {
//     let sql = `select acctype from userdetails where name='${username}';`;
//     const [row2, column2] = await db.query(sql);
//     res.json({ data: row2[0].acctype });

//     // if(count===0){
//     //   res.json(data)
//     // }
//     // else{

//     // }
//   }
// });

// app.post("/api/signupowner", async (req, res) => {
//   const {
//     username,
//     password,
//     email,
//     phoneNumber,
//     personalImage,
//     pgLicence,
//     acctype,
//   } = req.body;

//   // const personalImageUrl = await StoringOnCloud(personalImage);
//   let pgLicenceUrl, personalImageUrl;
//   await cloudinary.uploader.upload(personalImage, (err, result) => {
//     personalImageUrl = result.url;
//   });
//   await cloudinary.uploader.upload(pgLicence, (err, result) => {
//     pgLicenceUrl = result.url;
//   });

//   let sql = `select pgfinder.checking1('${username}', '${password}','${acctype}','${email}') as c1;`;
//   let [row1, column1] = await db.query(sql);  

//   if (row1[0].c1 == 0) {
//     console.log(1234);
//     sql = ` insert into ownerdetails values('${username}','${personalImageUrl}','${pgLicenceUrl}',${phoneNumber});`;
//     console.log(sql);
//     let [row1, column1] = await db.query(sql);
//     res.json({ data: "account created" });
//   } else {
//     res.json({ data: "already have account" });
//   }
// });

// app.post("/api/update", async (req, res) => {
//   const { password, username } = req.body;
//   let sql = `update userdetails set password='${password}' where name ='${username}'`;
//   const [row1, column1] = await db.query(sql);
//   res.json({ data: "updated" });
// });


// app.post("/api/homepage", verifyToken, async (req, res) => {
//   jwt.verify(req.token, "secretkey", async (err, authData) => {
//     if (err) {
//       res.sendStatus(403);
//     } else {
//       const { username, password, email } = req.body;
//       console.log(username);
//       let sql = `select acctype from userdetails where name ='${username}'; `;
//       const [acctype1, column4] = await db.query(sql);
//       res.json({ acctype: acctype1[0].acctype });
//     }
//   });
// });

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
