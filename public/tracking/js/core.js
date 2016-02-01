var tracker = angular.module('tracker',[]);

function mainController($scope,$http){
	$http.get("http://yiboji.net/api/tracker")
		.success(function(data){
			console.log("data:"+data);	
			var res = new Array();
			var arr = new Array();
			var item;
			var session_id = data[data.length-1]; 
			var curVisitor = new Object();
			console.log("session is "+session_id);
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
			$scope.trackdata = res;
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
}
