window.onload = function() {

	navigator.geolocation.getCurrentPosition(function(position) {
		
		var lat = position.coords.latitude;
		var long = position.coords.longitude;
		var url = 'https://fcc-weather-api.glitch.me/api/current?lat=' + lat + '&lon=' + long;
	
		var req = new XMLHttpRequest();
	
		req.open('GET', url);
	
		req.onload = function() {
	
			var data = JSON.parse(req.responseText);
			
			var city = document.getElementById('city');
			city.innerHTML = data.name + ', ' + data.sys.country;
	
			var temp = document.getElementById('temp');
			var tempC = Math.round(data.main.temp) + '°C';
			var tempF = Math.round(data.main.temp * 9 / 5 + 32) + '°F';
			temp.innerHTML = tempC;
	
			temp.onclick = function() {
	
				if(temp.innerHTML == tempC) {
					temp.innerHTML = tempF;
					temp_min.innerHTML = temp_minF;
					temp_max.innerHTML = temp_maxF;
				} else {
					temp.innerHTML = tempC;
					temp_min.innerHTML = temp_minC;
					temp_max.innerHTML = temp_maxC;
				}
			}
			
			var icon = document.getElementById('icon');
			icon.setAttribute('src', data.weather[0].icon);
	
			var description = document.getElementById('description');
			description.innerHTML = data.weather[0].description;

			var current = document.getElementById('current');
			current.innerHTML = data.weather[0].main;

			var temp_min = document.getElementById('temp-min');
			var temp_minC = Math.round(data.main.temp_min) + '°C';
			var temp_minF = Math.round(data.main.temp_min * 9 / 5 + 32) + '°F';
			temp_min.innerHTML = temp_minC;
	
			var temp_max = document.getElementById('temp-max');
			var temp_maxC = Math.round(data.main.temp_max) + '°C';
			var temp_maxF = Math.round(data.main.temp_max * 9 / 5 + 32) + '°F';
			temp_max.innerHTML = temp_maxC;
	
			var hum = document.getElementById('hum');
			hum.innerHTML = data.main.humidity + '%';

			var press = document.getElementById('press');
			press.innerHTML = Math.round(data.main.pressure) + ' mbar';
	
			var wind = document.getElementById('wind');
			wind.innerHTML = data.wind.speed + ' mph';
		}
	
		req.send();
	});
}