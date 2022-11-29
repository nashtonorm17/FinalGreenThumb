
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var PORT = process.env.PORT || 3001;

app.use(express.static(__dirname));
app.use(bodyParser.json());
var fs = require('fs');
const { text } = require('body-parser');

var userinfo = []

//load the input file
fs.readFile('users.json', 'utf8', function readFileCallback(err,data ){
  if(err){
    req.log.info('cannot load a file:' + fileFolder + '/' + _file_name)
    throw err;
  }
  else{
    //TODO: store loaded data into a global variable for tweet data
    userinfo = JSON.parse(data);
  }
});


app.post('/userinfo', function(req, res) {


  console.log('test')
  var myUsername = req.body.username;
  var myPassword = req.body.password;

  console.log(myUsername,myPassword)

  // push all of the data
  userinfo.push({
    username: myUsername,
    password: myPassword
  })
  res.send('Successfully created account')
});

// login verification
app.post('/verifyLogin', function(req, res){

  var myUsername = req.body.username;
  var myPassword = req.body.password;

  console.log(req.body)

  for (i = 0; i < userinfo.length; i++) {
    console.log(myUsername,myPassword,userinfo[i])
    if (myUsername == userinfo[i].username && myPassword == userinfo[i].password) {
        console.log(myUsername + " is logged in!!")
        res.send(JSON.stringify({msg:"correct"}))
        return
    }
  }
  console.log("Incorrect Username or Password")
  res.send(JSON.stringify({msg:"incorrect"}))

});





app.listen(PORT, function() {
  console.log('Server listening on ' + PORT);
});