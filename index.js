require('dotenv').config()
var http = require('http');
var jwt = require('jsonwebtoken');
const url = require('url');

 
http.createServer(function (req, res) {
  const queryObject = url.parse(req.url,true).query;

  var userId = queryObject.id;
  console.log("userId", userId);
  
  //Lookup the user on your DB or system

  // sampling echo - start
  var firstname = queryObject.firstname;
  console.log("firstname", firstname);

  var lastname = queryObject.lastname;
  console.log("lastname", lastname);

  var email = queryObject.email;
  console.log("email", email);

  var email = queryObject.email;
  console.log("email", email);
  // sampling echo - end

  var payload = {
    _id: userId,
    firstname: firstname,
    lastname: lastname,
    email: email,  
    attributes: 
    sub: 'userexternal',
    aud: 'https://tiledesk.com/projects/'+process.env.PROJECT_ID,  
  };
  console.log("payload", payload);
  var token = jwt.sign(payload, process.env.PROJECTSHAREDSECRET);
  console.log("token", token);

  res.writeHead(200, {'Content-Type': 'text/plain'});
  res.end(token);
}).listen(8080);