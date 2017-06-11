$(document).ready(function(){

	$("i").css({
		"display": "none",
		"transition": "all ease 0.8s"
	});

	$(".fa-free-code-camp").css({
		"display": "inline"
	})
	$(".fa-heart").css({
		"display": "inline"
	})
	$(".fa-map-marker").css({
		"display": "inline"
	})

	$("#Ping").click(function(){
		getForecast();
	});


	function getForecast(){

		navigator.geolocation.getCurrentPosition(function(position){
		
		$("i").css({
			"display": "block"
		});

		$(".fa-free-code-camp").css({
			"display": "inline"
		})
		$(".fa-heart").css({
			"display": "inline"
		})

		$("#ShareText").css("display", "none");

		$("#Degrees").css("display", "inline");




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

				

				console.log(value);


			    //console.log(value.currently.temperature.toFixed(2));
			    $("#Temperature").html(value.currently.temperature.toFixed(2) + "&#8457");


			    //console.log("Temperature: " + celsiusValue.toFixed(2) + " celsius");
				//Convert to Degrees Celsius
				$("#Degrees").click(function(){

					if($(this).attr('data-click-state') == 1){
						$(this).attr('data-click-state', 0)
						$(this).css({
							"background-color": "orange",
							"border": "none"
						})
						$('.fa-thermometer-half').css('color', "orange")
						$(this).html('Change to &#8451')
						
					//var celsiusValue = (value.currently.temperature - 32) * (5/9);
					$("#Temperature").html(value.currently.temperature.toFixed(2) + "&#8457");
					} else{
						$(this).attr('data-click-state', 1)
						$(this).css({
							"background-color": "#7b241c",
							"color": "#fff"
						})
						$('.fa-thermometer-half').css('color', '#7b241c')
						$(this).html('Change to &#8457')
					
					var celsiusValue = (value.currently.temperature - 32) * (5/9);
					$("#Temperature").html(celsiusValue.toFixed(2) + "&#8451");
					}

				});


    			//console.log("Current Status: " + value.currently.icon);
    			//$("#CurrentIcon").html(value.currently.icon);

    			//Tweak result to display with first letter capitalized
    			var currentForecastArr = [];
    			var str = value.currently.icon;

    			console.log(str);

    			if(str === "clear-day"){
    			  $("#Skycons").css({
    				"background-image": "url(./images/SVG/sun.svg)",
    				"color": "red"
    			})
    				
    			}else if(str === "clear-night"){
    				$("#Skycons").css({
    				"background-image": "url(./images/SVG/night.svg)",
    			})

    			}else if(str === "cloudy"){
    				$("#Skycons").css({
    				"background-image": "url(./images/SVG/cloudy.svg)"
    			})

    			}else if(str === "fog"){
    				$("#Skycons").css({
    				"background-image": "url(./images/SVG/fogg.svg)"
    			})

    			}else if(str === "partly-cloudy-day"){
    				$("#Skycons").css({
    				"background-image": "url(./images/SVG/cloudyi.svg)"
    			})

    			}else if(str === "partly-cloudy-night"){
    			 $("#Skycons").css({
    				"background-image": "url(./images/SVG/cloudy-night.svg)"

    			})
   
    			}else if(str === "sleet"){
    				$("#Skycons").css({
    				"background-image": "url(./images/SVG/hail.svg)"
    			})

    			}else if(str === "snow"){
    				$("#Skycons").css({
    				"background-image": "url(./images/SVG/snow.svg)"
    			})

    			}else if(str === "rain"){
    				$("#Skycons").css({
    				"background-image": "url(./images/SVG/rain.svg)"
    			})

    			}else if(str === "wind"){
    				$("#Skycons").css({
    				"background-image": "url(./images/SVG/windy.svg)"
    			})
    			}


     			var arr = str.split('');
    			var newArr = [];

    			for(var i in arr){
    				if(arr[i] === "-"){
    					arr[i] = " ";
    				}

    				newArr.push(arr[i]);
    			}

    			var newStr = newArr.join('');
    			$("#CurrentIcon").html(newStr);

    			


				//console.log("Forecast: "+ value.hourly.summary + value.daily.summary)
				$("#Summary").html(value.hourly.summary + " " + value.daily.summary);


				//Humidity
			    $("#Humidity").html(((value.currently.humidity)*100).toFixed(2) + " %");
			    //Humidity
			    $("#Pressure").html(value.currently.pressure + " hPa");
			    //Humidity
			    $("#WindSpeed").html(value.currently.windSpeed + " mph");


			});
			
		}, 'jsonp');

		//Get the address of client [Region, City, Country using the googleMap API ]
		var mapRoot = 'http://maps.googleapis.com/maps/api/geocode/json?latlng=' 
		               + coordinate + '&sensor=true'

		$.getJSON(mapRoot, function(address){
			$(address).each(function(i, v){
				var address = v.results[i].formatted_address;
				//console.log(address);
				$("#Address").html(address);

			});

		});

		 
		}); //end of navigator.geolocation.getCurrentPosition function
       

	} //end of getForecast


	
}); //end of document.ready()
