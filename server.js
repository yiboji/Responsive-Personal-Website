var express = require('express');
var app = express();	//create a app with express
var mongoose = require('mongoose');	//for mongo database
var morgan = require('morgan');		//request to console?
var bodyParse = require('body-parser');		//pull information from HTML POST(express4)
var methodOverride = require('method-override');	//simulate delete and put (express4)

//here comes the configuration section
mongoose.connect('mongodb://localhost/admin');//connect to mongoDB database on modulus.io
app.use(express.static(__dirname+'/public'));	//set static file locatoin as local/public
app.use(morgan('dev'));	//log every request to console
app.use(bodyParse.urlencoded({'extended':'true'}));	//parse application /x-www-form-urlencoded
app.use(bodyParse.json());	//parse application/json
app.use(bodyParse.json({type:'application/vnd.api+json'}));	//parse applicatoin/vnd.api_json as json
app.use(methodOverride());

//mongoose model
var Todo = mongoose.model('Todo',{
	text:String,
});
//listen section
app.listen(80);	//listen and start node server.js
console.log("App listening on port 80");

app.get('/resume',function(req,res){
	console.log("request to resume\n");
	res.redirect('./web/viewer.html?file=resume.pdf');
});

app.get('*',function(req,res){
	console.log('Hello\n');
	res.sendfile('./public/index.html');
});

