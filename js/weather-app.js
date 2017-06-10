$(document).ready(function(){

	getForecast();

	function getForecast(){

		var root = 'https://api.darksky.net/forecast/20bee9174999379e595cb1cb42b9271e/37.8267,-122.4233'

		$.get(root, function(forecast){
			$(forecast).each(function(index, value){
				console.log(value.currently.temperature);
			});
		}, 'jsonp');
	}

});