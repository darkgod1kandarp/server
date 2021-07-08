const express = require('express');
const jwt = require('jsonwebtoken');
const cors = require('cors');
const app = express();
app.use(cors());

app.post('/api/posts', verifyToken, (req, res) => {  
  jwt.verify(req.token, 'secretkey', (err, authData) => {
    if(err) {
      res.sendStatus(403);
    } else {
      res.json({
        message: 'Post created...',
        authData
      });
    }
  });
});

app.post('/api/login', (req, res) => {
  console.log(123);
  // Mock user
  const user = {
    id: 1, 
    username: 'brad',
    email: 'brad@gmail.com'
  }

  jwt.sign({user}, 'secretkey', (err, token) => {
    res.json({
      token
    });
  });
});

app.post('/api/datagaining',verifyToken,(req,res)=>{
  jwt.verify(req.token, 'secretkey', (err, authData) => {
    if(err){
      res.sendStatus(403);
    }
    else{
      res.json({data:"/pg"})
     
    }
  })
})



function verifyToken(req, res, next) {
 
  const bearerHeader = req.headers['authorization'];
  console.log(bearerHeader);
 
  if(typeof bearerHeader !== 'undefined') {
  
    const bearer = bearerHeader.split(' ');

    const bearerToken = bearer[1];
    
    req.token = bearerToken;
 
    next();
  } else {
    // Forbidden
    res.sendStatus(403);
  }

}
const  Port = process.env.PORT || 5000;
app.listen(Port , () => console.log('Server started on port 5000'));