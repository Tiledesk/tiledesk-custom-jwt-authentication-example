require('dotenv').config()
var http = require('http');
var jwt = require('jsonwebtoken');
const express = require('express');
//const bodyParser = require('body-parser');
var cors = require('cors');


const app = express();

app.use(cors());
app.options('*', cors());

app.get('/', (req, res) => { 
 

  var userId = req.query.id;
  console.log("userId", userId);
  
  var password = req.query.password;
  console.log("password", password);
 
  //Lookup the user on your DB or system

  // sampling echo - start
  var firstname = req.query.firstname;
  console.log("firstname", firstname);

  var lastname = req.query.lastname;
  console.log("lastname", lastname);

  var email = req.query.email;
  console.log("email", email);


  // sampling echo - end

  var payload = {
    _id: userId,
    firstname: firstname,
    lastname: lastname,
    email: email,  
    attributes: req.query.attributes,
    sub: 'userexternal',
    aud: 'https://tiledesk.com/projects/'+process.env.PROJECT_ID,  
  };
  console.log("payload", payload);
  var token = jwt.sign(payload, process.env.PROJECTSHAREDSECRET);
  console.log("token", token);

  res.send(token);
});

app.listen(process.env.PORT || 3200, () => console.log('started'));
