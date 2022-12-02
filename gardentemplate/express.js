
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var PORT = process.env.PORT || 3001;

app.use(express.static(__dirname));
app.use(bodyParser.json());
var fs = require('fs');
const { text } = require('body-parser');

var userinfo = []

var currentUser = "sample";

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

  // push all of the data
  userinfo.push({
    username: myUsername,
    password: myPassword,
	plants: []
  })
  res.send('Successfully created account')
});

// login verification
app.post('/verifyLogin', function(req, res){

  var myUsername = req.body.username;
  var myPassword = req.body.password;

  for (i = 0; i < userinfo.length; i++) {
    if (myUsername == userinfo[i].username && myPassword == userinfo[i].password) {
		console.log(myUsername + " is logged in!!")
		currentUser = myUsername
		res.send(JSON.stringify({ msg: "correct" }))
		return
    }
  }
  console.log("Incorrect Username or Password")
  res.send(JSON.stringify({msg:"incorrect"}))

});

var plantinfo = []

var usergardens = []

fs.readFile('plants.json', 'utf8', function readFileCallback(err, data) {
  if(err){
    req.log.info('cannot load a file:' + fileFolder + '/' + _file_name)
    throw err;
  }
  else{
      plantinfo = JSON.parse(data);
  }
});

fs.readFile('users.json', 'utf8', function readFileCallback(err, data) {
	if(err){
		req.log.info('cannot load a file:' + fileFolder + '/' + _file_name)
		throw err;
	}
	else{
		usergardens = JSON.parse(data);
	}
});

app.get('/plantinfo', function(req, res) {
	res.send({plantinfo: plantinfo});
});

app.get('/usergardens', function(req, res) {
	usergardens.forEach(function (info) {
		if (info.username == currentUser) {
			res.send({usergardens: info.plants});
		}
	})
});

app.put('/usergardens', function(req, res) {
	var newPlant = req.body.newPlant;
	var plantimg;
	plantinfo.forEach(function (info) {
		if (info.plantName == newPlant) {
			plantimg = info.image;
		}
	})
	usergardens.forEach(function (info) {
		if (info.username == currentUser) {
			info.plants.push(plantimg);
			fs.writeFile('users.json', JSON.stringify(usergardens), function(err, result) {
				if(err) console.log("Could not write to file\n", err);
			});
			res.send("Success!");
		}
	})
});

app.delete('/usergardens', function (req, res) {
	usergardens.forEach(function (info) {
		if (info.username == currentUser) {
			info.plants = [];
			res.send("Success!");
        }
    })
});





app.listen(PORT, function() {
  console.log('Server listening on ' + PORT);
});