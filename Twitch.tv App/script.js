window.onload = function() {

	var users = ["ESL_SC2", "OgamingSC2", "cretetion", "freecodecamp", "storbeck", "habathcx", "RobotCaleb", "noobs2ninjas"];

	var streams = users.map(function(user) {

		return 'https://wind-bow.gomix.me/twitch-api/streams/' + user + '?callback=?';
	});


	for(var i = 0; i < users.length; i++) {

		$.getJSON(streams[i], function(data) {

			if(data.stream !== null) {

				var div = document.getElementById('main');

				var row = document.createElement('div');
				row.setAttribute('class', 'row');

				var img = document.createElement('div');
				img.setAttribute('class', 'col-xs-2');
				img.innerHTML = '<img id="logo" src="' + data.stream.channel.logo + '"></img>';

				var content = document.createElement('div');
				content.setAttribute('class', 'col-xs-8');
				content.innerHTML = '<a id="channel_name" href="' + data.stream.channel.url + '" target="blank">' + data.stream.channel.display_name + '</a><p id="game_status">' + data.stream.channel.game + ': ' + data.stream.channel.status + '</p>';

				var status = document.createElement('div');
				status.setAttribute('class', 'col-xs-2');
				status.innerHTML = '<p id="stream_status"><span>&#9679; </span>' + data.stream.stream_type + '</p>';

				row.appendChild(img);
				row.appendChild(content);
				row.appendChild(status);
				div.appendChild(row);
				
			} else {

				var div = document.getElementById('main');

				var row = document.createElement('div');
				row.setAttribute('class', 'row');

				var img = document.createElement('div');
				img.setAttribute('class', 'col-xs-2');
				img.innerHTML = '<img id="logo" src="x3.png"></img>';

				var off = data._links.channel;
				var offName = off.slice(38, off.length);

				var content = document.createElement('div');
				content.setAttribute('class', 'col-xs-8');
				content.innerHTML = '<a id="channel_name" href="https://www.twitch.tv/' + offName + '" target="blank">' + offName + '</a>';

				var status = document.createElement('div');
				status.setAttribute('class', 'col-xs-2');
				status.innerHTML = '<p id="offline">Offline</p>';

				row.appendChild(img);
				row.appendChild(content);
				row.appendChild(status);
				div.appendChild(row);

			}
		});

	}
}