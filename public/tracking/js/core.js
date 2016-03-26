var tracker = angular.module('tracker',[]);
/*
//controller part
tracker.config(['ChartJsProvider', function (ChartJsProvider) {
	// Configure all charts
	ChartJsProvider.setOptions({
	  //colours: ['#FF5252', '#FF8A80'],
	  responsive: false
	});
	// Configure all line charts
	ChartJsProvider.setOptions('Line', {
	  //datasetFill: false
	});
}]);
*/

tracker.controller("mainController",['$scope','$http',function($scope,$http){
	//$scope.series = ["Visitor interesting"];
	$http.get("http://yiboji.net/api/tracker")
		.success(function(data){
			//console.log("data:"+data);	
			var res = new Array();
			var arr = new Array();
			var item;
			var session_id = data[data.length-1]; 
			var curVisitor = new Object();
			//console.log("session is "+session_id);
			var profile = 0;
			var contact = 0;
			var resume = 0;
			var project = 0;
			var blog = 0;
			var facebook = 0;
			var linkedin = 0;

			for(item=0; item<data.length-1;item++){
				var tmp = new Object();
				tmp.latLng = new Array();
				tmp.latLng.push(data[item].lat);
				tmp.latLng.push(data[item].lon);
				tmp.name = data[item].city;
				arr.push(tmp);
				if(session_id == data[item]._id){
					curVisitor.ip = data[item].ip;
					curVisitor.city = data[item].city;
					curVisitor.lat = data[item].lat;
					curVisitor.lon = data[item].lon;
					curVisitor.profile = data[item].profile;
					curVisitor.contact = data[item].contact;
					curVisitor.resume = data[item].resume;
					curVisitor.project = data[item].project;
					curVisitor.blog = data[item].blog;
					curVisitor.facebook = data[item].facebook;
					curVisitor.linkedin = data[item].linkedin;
					curVisitor.github = data[item].github;
					curVisitor.time = data[item].time;
				}
				if(data[item].ip){
					res.push(data[item]);	
				}
			}
			for(var item in data){
				if(data[item]==null)
					continue;
				if(data[item].profile!=null)
					profile+=data[item].profile;
				if(data[item].contact!=null)
					contact += data[item].contact;
				if(data[item].resume!=null)
					resume += data[item].resume;
				if(data[item].project!=null)
					project += data[item].project;
				if(data[item].blog!=null)
					blog += data[item].blog;
				if(data[item].facebook!=null)
					facebook += data[item].facebook;
				if(data[item].linkedin!=null)
					linkedin += data[item].linkedin;
			}
			var sorted = new Array();
			sorted.push({key:'profile',val:profile});
			sorted.push({key:'contact',val:contact});
			sorted.push({key:'resume',val:resume});
			sorted.push({key:'project',val:project});
			sorted.push({key:'blog',val:blog});
			sorted.push({key:'facebook',val:facebook});
			sorted.push({key:'linkedin',val:linkedin});
			sorted = sorted.sort(function(a,b){
				return b.val-a.val;
			});
			console.log("sorted data are: "+sorted);
			$scope.trackdata = res;
			$scope.sorteddate = sorted;
			$('#world-map-markers').vectorMap({
				map: 'world_mill_en',
				scaleColors:['#C8EEFF','#0071A4'],
				normalizeFunction:'polynomial',
				hoverOpacity:0.7,
				hoverColor: false,
				markerStyle: {
					initial: {
						fill: '#F8E23B',
						stroke: '#383f47'
					}
				},
				backgroundColor: '#383f47',
				markers:arr
			});
			if(session_id){
					var str = "Welcome my friend, I'm tracking you ^-^.\n\n"+
					"Here is your information:\n"+
					"IP: "+curVisitor.ip+"\n"+
					"city: "+curVisitor.city+"\n"+
					"latitude: "+curVisitor.lat+"\n"+
					"longitude: "+curVisitor.lon+"\n\n"+
					"You have browsed: \n";
					if(curVisitor.profile)
						str+="my profile in "+curVisitor.profile+" times\n";
					if(curVisitor.contact)
						str+="my contact in "+curVisitor.contact+" times\n";
					if(curVisitor.resume)
						str += "my resume in "+curVisitor.resume+" times\n";
					if(curVisitor.project)
						str += "my project in "+curVisitor.project+" times\n";
					if(curVisitor.blog)
						str += "my blog in "+curVisitor.blog+" times\n";
					if(curVisitor.facebook)
						str += "my facebook in "+curVisitor.facebook+" times\n";
					if(curVisitor.linkedin)
						str+="my linkedin in "+curVisitor.linkedin+" times\n";
					if(curVisitor.github)
						str+="my github in "+curVisitor.github+" times\n";
					if(curVisitor.time)
						str+="Your visit starts from "+curVisitor.time+"\n\n";
					str += "THANK YOU FOR VISITING!";
					alert(str);
			}
						
		})
		.error(function(err){
			console.log("ERROR:"+err);	
		});
}]);
/*
tracker.controller("LineCtrl",['$scope','$http',function($scope,$http){
	$scope.series = ["Visitor interesting"];
	$scope.data = [[]];
	var tmp = new Object();
	var profile = 0;
	var contact = 0;
	var resume = 0;
	var project = 0;
	var blog = 0;
	var facebook = 0;
	var linkedin = 0;
	$http.get('/api/tracker')
		.success(function(data){
		console.log("Client:initial get"+data);
		for(var item in data){
			if(data[item].profile)
				profile+=data[item].profile;
			if(data[item].contact)
				contact += data[item].contact;
			if(data[item].resume)
				resume += data[item].resume;
			if(data[item].project)
				project += data[item].project;
			if(data[item].blog)
				blog += data[item].blog;
			if(data[item].facebook)
				facebook += data[item].facebook;
			if(data[item].linkedin)
				linkedin += data[item].linkedin;
		}
		console.log(profile+","+contact+","+resume+","+project+","+facebook+","+linkedin);
		$scope.data[0].push(profile);	
		$scope.data[0].push(contact);	
		$scope.data[0].push(resume);	
		$scope.data[0].push(project);	
		$scope.data[0].push(blog);	
		$scope.data[0].push(facebook);	
		$scope.data[0].push(linkedin);	
		})
		.error(function(err){
			console.log("client:ERROR:"+err);
		});
	$scope.onClick = function(points,evt){
		console.log(points,evt);
	};
}]);
*/
