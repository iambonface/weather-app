$(document).ready(function(){



	getForecast();

	function getForecast(){

		navigator.geolocation.getCurrentPosition(function(position){
   	   	//console.log(position);
   	   	console.log(position.coords.longitude);
   	   	var coordinate = position.coords.latitude + ',' + position.coords.longitude;
   	   	console.log(coordinate);

   	   	var APIKey = '20bee9174999379e595cb1cb42b9271e'

   	   	var keyTerminator = "/"

		var root = 'https://api.darksky.net/forecast/' + APIKey + keyTerminator + coordinate

		$.get(root, function(forecast){
			$(forecast).each(function(index, value){
				
				//console.log(value.currently.temperature.toFixed(2));

				var celsiusValue = (value.currently.temperature - 32) * (5/9);

				console.log("Zone: " + value.timezone);
				console.log("Temperature: " + celsiusValue.toFixed(2) + " celsius");
				console.log("Current Status: " + value.currently.icon)
				console.log("Forecast: "+ value.hourly.summary + value.daily.summary)

			});
			
		}, 'jsonp');

		//Get the address of client [Region, City, Country using the googleMap API ]
		var mapRoot = 'http://maps.googleapis.com/maps/api/geocode/json?latlng=' 
		               + coordinate + '&sensor=true'

		$.getJSON(mapRoot, function(address){
			$(address).each(function(i, v){
				var address = v.results[i].formatted_address;
				console.log(address);
			});

		});

		 
		}); //end of navigator.geolocation.getCurrentPosition function
       

	} //end of getForecast

	
}); //end of document.ready()