require('dotenv').config()
var http = require('http');
var jwt = require('jsonwebtoken');
const url = require('url');

 
http.createServer(function (req, res) {
 
 //cors start
 const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'OPTIONS, POST, GET',
    'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept, Authorization, x-xsrf-token';
  };

  if (req.method === 'OPTIONS') {
    res.writeHead(204, headers);
    res.end();
    return;
  }
  //cors end
 
  const queryObject = url.parse(req.url,true).query;

  var userId = queryObject.id;
  console.log("userId", userId);
  
  var password = queryObject.password;
  console.log("password", password);
 
  //Lookup the user on your DB or system

  // sampling echo - start
  var firstname = queryObject.firstname;
  console.log("firstname", firstname);

  var lastname = queryObject.lastname;
  console.log("lastname", lastname);

  var email = queryObject.email;
  console.log("email", email);


  // sampling echo - end

  var payload = {
    _id: userId,
    firstname: firstname,
    lastname: lastname,
    email: email,  
    attributes: queryObject.attributes,
    sub: 'userexternal',
    aud: 'https://tiledesk.com/projects/'+process.env.PROJECT_ID,  
  };
  console.log("payload", payload);
  var token = jwt.sign(payload, process.env.PROJECTSHAREDSECRET);
  console.log("token", token);

  res.writeHead(200, {'Content-Type': 'text/plain'});
  res.end(token);
}).listen(process.env.PORT || 3200);
