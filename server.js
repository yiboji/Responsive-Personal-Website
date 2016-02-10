var express = require('express');
var app = express();
var mongoose = require('mongoose');	//for mongo database
var morgan = require('morgan');		//request to console?
var bodyParse = require('body-parser');		//pull information from HTML POST(express4)
var methodOverride = require('method-override');	//simulate delete and put (express4)
var http = require('http').createServer(app);
var io = require('socket.io')(http);
var geoip = require('geoip-lite');
var session = require('express-session')({
	secret:'visitor',
	resave:true,
	saveUninitialized:true
});
var sharedsession = require('express-socket.io-session');
io.use(sharedsession(session));

//here comes the configuration section
mongoose.connect('mongodb://localhost/admin');//connect to mongoDB database on modulus.io
app.use(express.static(__dirname+'/public'));	//set static file locatoin as local/public
app.use(morgan('dev'));	//log every request to console
app.use(bodyParse.urlencoded({'extended':'true'}));	//parse application /x-www-form-urlencoded
app.use(bodyParse.json());	//parse application/json
app.use(bodyParse.json({type:'application/vnd.api+json'}));	//parse applicatoin/vnd.api_json as json
app.use(methodOverride());
app.use(session);

//mongoose model
var visitor = mongoose.model('visitor',{
	ip:String,
	city:String,
	lat:Number,
	lon:Number,
	profile:Number,
	contact:Number,
	resume:Number,
	project:Number,
	blog:Number,
	facebook:Number,
	linkedin:Number,
	github:Number,
	time:String
});

app.get('/facebook',function(req,res){
	console.log("request to facebook");
	if(req.session.facebook){
		req.session.facebook+= 1;
	}
	else{
		req.session.facebook= 1;
	}
	if(req.session._id){
		var query = {_id:req.session._id};
		var update = {
			facebook:req.session.facebook
		};
		visitor.update(query,update,function(err,nums){
			if(err)
				console.log("ERR: DB update error");
			console.log("lines affected are: "+nums);
		});
	}
	res.redirect('https://www.facebook.com/herrji');
});
app.get('/linkedin',function(req,res){
	console.log("request to linkedin");
	if(req.session.linkedin){
		req.session.linkedin+= 1;
	}
	else{
		req.session.linkedin= 1;
	}
	if(req.session._id){
		var query = {_id:req.session._id};
		var update = {
			linkedin:req.session.linkedin
		};
		visitor.update(query,update,function(err,nums){
			if(err)
				console.log("ERR: DB update error");
			console.log("lines affected are: "+nums);
		});
	}
	res.redirect('https://www.linkedin.com/in/yibo-ji-16419ba6');
});
app.get('/github',function(req,res){
	console.log("request to github");
	if(req.session.github){
		req.session.github+= 1;
	}
	else{
		req.session.github= 1;
	}
	if(req.session._id){
		var query = {_id:req.session._id};
		var update = {
			github:req.session.github
		};
		visitor.update(query,update,function(err,nums){
			if(err)
				console.log("ERR: DB update error");
			console.log("lines affected are: "+nums);
		});
	}
	res.redirect('https://github.com/yiboji');
});
app.get('/resume',function(req,res){
	console.log("request to resume\n");
	if(req.session.resume){
		req.session.resume+= 1;
	}
	else{
		req.session.resume= 1;
	}
	if(req.session._id){
		var query = {_id:req.session._id};
		var update = {
			resume:req.session.resume
		};
		visitor.update(query,update,function(err,nums){
			if(err)
				console.log("ERR: DB update error");
			console.log("lines affected are: "+nums);
		});
	}
	res.redirect('./web/viewer.html?file=resume.pdf');
});
app.get('/profile',function(req,res){
	console.log("request to profile\n");
	if(req.session.profile){
		req.session.profile += 1;
	}
	else{
		req.session.profile = 1;
	}
	if(req.session._id){
		var query = {_id:req.session._id};
		var update = {
			profile:req.session.profile
		};
		visitor.update(query,update,function(err,nums){
			if(err)
				console.log("ERR: DB update error");
			console.log("lines affected are: "+nums);
		});
	}
	res.sendfile('./public/profile.html');
});
app.get('/contact',function(req,res){
	console.log("request to contact\n");
	if(req.session.contact){
		req.session.contact += 1;
	}
	else{
		req.session.contact = 1;
	}
	if(req.session._id){
		var query = {_id:req.session._id};
		var update = {
			contact:req.session.contact
		};
		visitor.update(query,update,function(err,nums){
			if(err)
				console.log("ERR: DB update error");
			console.log("contact: lines affected are: "+nums);
		});
	}
	res.sendfile('./public/contact.html');
});

app.get('/projects',function(req,res){
	console.log("request to projects\n");
	if(req.session.project){
		req.session.project+= 1;
	}
	else{
		req.session.project=1;
	}
	if(req.session._id){
		var query = {_id:req.session._id};
		var update = {
			project:req.session.project
		};
		visitor.update(query,update,function(err,nums){
			if(err)
				console.log("ERR: DB update error");
			console.log("project:lines affected are: "+nums);
		});
	}
	res.sendfile('./public/projects.html');
});
app.get('/projects/smartcar',function(req,res){
	console.log("request to smartcar\n");
	res.sendfile('./public/project_files/smartcar.html');
});
app.get('/projects/analytics',function(req,res){
	console.log("request to tracker\n");
	res.sendfile('./public/tracking/tracker.html');
});
app.get('/projects/game',function(req,res){
	console.log("request to smartcar\n");
	res.sendfile('./public/project_files/tower.html');
});
app.get('/projects/weenix',function(req,res){
	console.log("request to smartcar\n");
	res.sendfile('./public/project_files/weenix.html');
});
app.get('/projects/socket',function(req,res){
	console.log("request to smartcar\n");
	res.sendfile('./public/project_files/socket.html');
});
app.get('/projects/audio',function(req,res){
	console.log("request to smartcar\n");
	res.sendfile('./public/project_files/audio.html');
});
app.get('/projects/linux',function(req,res){
	console.log("request to smartcar\n");
	res.sendfile('./public/project_files/linux.html');
});
app.get('/projects/gateway',function(req,res){
	console.log("request to smartcar\n");
	res.sendfile('./public/project_files/gateway.html');
});

app.get('/api/tracker',function(req,res){
	console.log("request to api/tracker");
	var sort = {'_id':-1};
	visitor.find({},null,{sort:{'_id':-1}},function(err,data){
		if(err) console.log("find db error");
		console.log("request tracker data");
		console.log(data);
		var session = req.session._id;
		data.push(session);
		res.json(data);
	});
});
app.get('/api/freq',function(req,res){
	console.log("request to get visitor interests");
	var agg = [
		{$group:{_id:"profile",profilesum:{$sum:"$profile"}}},
		{$group:{_id:"contact",contactsum:{$sum:"$contact"}}},
		{$group:{_id:"resume",resumesum:{$sum:"$resume"}}},
		{$group:{_id:"project",projectsum:{$sum:"$projectsum"}}},
		{$group:{_id:"blog",blogsum:{$sum:"$blog"}}},
		{$group:{_id:"facebook",facebooksum:{$sum:"$facebook"}}},
		{$group:{_id:"linkedin",linkedinsum:{$sum:"$linkedin"}}}
	];
	visitor.aggregate(agg,function(err, result){
		if(err) console.log(err);
		console.log(result);
	});
});
app.get('*',function(req,res){
	console.log('Hello\n');

	//generate ID
	client_session = req.session;
	console.log("session id is " +req.session._id);
	if(!client_session._id){
		visitor.create({
		},function(err,data){
			if(err)
				console.log("ERR:first insert DB ERROR");
			console.log("just initial insert"+data);
			client_session._id = data._id;
			console.log("set session id to "+req.session._id);

			var date = mongoose.Types.ObjectId(data._id.toString()).getTimestamp();
			console.log("session start time: "+data);
			var query = {_id:req.session._id};
			var update = {
				time:date
			};
			visitor.update(query,update,function(err,nums){
				if(err)
					console.log("ERR: DB update error");
				console.log("homepage:lines affected are: "+nums);
			});
			res.sendfile('./public/index.html');
		});
	}
});

http.listen(80,function(){
	console.log("http now is listening port 80;");
});

io.on('connection',function(socket){
	var ip = socket.handshake.address;
	var tmp = ip.split(":");
	ipv4 = tmp[tmp.length-1]; 
	socket.address = ipv4;
	console.log("a web socket has connected");
	console.log("remote IP is"+socket.address);
	var geo = geoip.lookup(socket.address);
	socket.country = geo.country;
	socket.city = geo.city;
	socket.lat = geo.ll[0];
	socket.lon = geo.ll[1];
	console.log("his country is: "+geo.country);
	console.log("his region is: "+geo.region);
	console.log("his city is: "+geo.city);
	console.log("his latitude and attitude is: "+geo.ll[0]+";"+geo.ll[1]);

	var id = socket.handshake.session._id;
	console.log("session id is "+id);
	console.log("user is"+socket.address +" is done");
	//var client_session = socket.handshake.session;

	//update for specific session id
	var client_session = socket.handshake.session;
	if(client_session._id){
		var res = visitor.find({_id:client_session._id},function(err,data){
			if(err)
				console.log("ERROR on find"+err);
			console.log(data);
		});

		/*	
		var date = mongoose.Types.ObjectId(lastid.toString()).getTimestamp();
		var unixtime = Date.parse(date);
		var currtime = new Date().getTime();
		console.log("unixtime is "+unixtime/1000+"sec");
		console.log("currtime is "+currtime/1000+"sec");
		*/
		

		var query = {_id:client_session._id};
		var update = {
			ip:socket.address,
			city:socket.city,
			lat:socket.lat,
			lon:socket.lon
		};
		visitor.update(query,update,function(err,nums){
			if(err)
				console.log("ERR: DB update error");
			console.log("lines affected are: "+nums);
		});
	}

/*
	console.log("session id is "+client_session.mongoid);
	console.log("session profile"+client_session.profile);
	if(!client_session.mongoid){
		visitor.create({
				ip:socket.address,
				city:socket.city,
				lat:socket.lat,
				lon:socket.lon
		},function(err,data){
			if(err)
				console.log("ERR:insert DB error");
			console.log("just insert "+data);
			client_session.mongoid = data._id;
			console.log("set session id is"+client_session.mongoid);
		});
	}
*/
	socket.on('disconnect',function(){
		console.log("user disconnect");
	});
});
