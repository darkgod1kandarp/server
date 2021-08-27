const express = require("express");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const cors = require("cors");
const app = express();
const mysql = require("mysql2");
const distance = require("google-distance-matrix");
distance.key("AIzaSyCejofxtxXDqgb1_xYwkgZy06mF-VNa15Q");
const { v4: uuidv4 } = require("uuid");
const socket = require("socket.io");
app.use(cors());
// let bodyParser = require('body-parser');
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }));
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

var fileupload = require("express-fileupload");
app.use(express.static("tmp"));

app.use(
  fileupload({
    useTempFiles: true,
  })
);

const Port = process.env.PORT || 5000;
const server = app.listen(Port, () =>
  console.log("Server started on port 5000")
);

const io = socket(server);

var cloudinary = require("cloudinary").v2;
const Address = require("ipaddr.js");
const { language } = require("google-distance-matrix");
cloudinary.config({
  cloud_name: "ur-cirkle",
  api_key: "858755792955291",
  api_secret: "7Tin6b3Em8ThMYGHLWvyNBPzXRk",
});

function makeid(length) {
  var result = "";
  var characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

  var charactersLength = characters.length;
  for (var i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

const pool = mysql.createPool({
  host: "163.123.183.88",
  database: "kandarp",
  user: "admin",
  password: "2OtCm0bY",
  port: "17387",
});

const db = pool.promise();


 




let id;
io.on("connection", async(socket) => {
      id =  socket.id;
      let sql  =  `insert into socketid values('9sUK9zrDt96','${id}');`
      await db.query(sql);
 
  socket.on("connected", async(data) => {
   
    const{userid} = data;
    console.log(userid,12)

     id =  socket.id;
      let sql  =  `update socketid set userid1 = '${userid}' where ids = '${id}';`
      await db.query(sql);
  })

  socket.on("post",async(data)=>{
    const{userid,image,text_des,title}=data;
    
    let sql;
    sql =  `select username from userinfo where userid1 = '${userid}';`
    const[naming,column5] =  await db.query(sql);
    const name =  naming[0].username
    cloudinary.uploader.upload(image, async(err, result) => {
    if (err) return err;
    const url = result.url;
    sql =`insert into post values('${userid}','${title}','${text_des}','${url}',current_timestamp);`
    await db.query(sql); 
    });
    const dataSending ={image,text_des,title,name}
    sql =`select * from  connection_people where connector = '${userid}' or connecting = '${userid}' and sided = 1;`
    const[row1,column1] =  await db.query(sql);
    console.log(row1);
    var flipFlop = []
    if (row1.length!==0){
    for (let x of row1){
      flipFlop.push(x.connector);
      flipFlop.push(x.connecting);
    }
    var flipFlop  = new Set(flipFlop);
    var myArr = Array.from(flipFlop);
    console.log(myArr);
    sql =  `select * from  socketid  where userid1 in (?)`
    
    const[row2,column2] =  await db.query(sql,[myArr]);
    for (let x of row2){
      
     console.log(x.ids,"wer")
      io.to(x.ids).emit("sendingData",dataSending)
    }
  }
   
    
  })

socket.on("connectingUser",async(data)=>{
   const {connecting,connector} = data;
   console.log(data)
   let sql = `select count(*) as c1 from connection_people where (connector = '${connector}'and connecting = '${connecting}') or (connector = '${connecting}'and connecting = '${connector}');`
   const [counting,column4] =  await db.query(sql);
   console.log(counting,'12124');
   if (counting[0].c1===0){
   sql =`insert into connection_people values('${connector}','${connecting}',0,current_timestamp);`
   await db.query(sql);
   sql = `select * from socketid where userid1 = '${connecting}';`
   const[row1,column1] = await db.query(sql);
   sql =`select username from useinfo where userid1 = '${connector}';`
   const[row2,column2] = await db.query(sql);
   const sendingData = {name:row2[0].userid1,msg:"ftm"}
   
   for(let x of row1){
    io.to(x.ids).emit("sendingData",sendingData)
   }
  }
  else{
    sql = `update connection_people set sided = 1 where connecting = '${connector}' and connector = '${connecting}';`
    await db.query(sql)
    sql = `select * from socketid where userid1 = '${connecting}';`
   const[row1,column1] = await db.query(sql);
   sql = `select username from userinfo where userid1 = '${connector}';`
   const[row2,column2] = await db.query(sql);
   const sendingData = {name:row2[0].userid1,msg:"stm"}
   for(let x of row1){
    io.to(x.ids).emit("sendingData",sendingData);
   }
  }

  })

socket.on("disconnect",async(data)=>{
    console.log("kngfekgn")
    let sql = `delete from socketid where ids ='${id}'`
    await db.query(sql);

  })

});
