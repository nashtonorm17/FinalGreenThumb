var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var PORT = process.env.PORT || 3000;

app.use(express.static(__dirname));
app.use(bodyParser.json());

var fs = require('fs');

var plantinfo = []

var usergardens = []
var currentUser = "sample";

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
	console.log(usergardens);
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

app.listen(PORT, function() {
  console.log('Server listening on ' + PORT);
});