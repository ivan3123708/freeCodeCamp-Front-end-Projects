$(document).ready(function() {

	var hours, minutes, seconds, countdown;
	var switcher = 0;
	var isPaused = true;
	var count = $('#session').html() * 60;
	var alarm = new Audio('alarm.mp3');

	// session and break length control
	$('#sessionMinus').click(function() {

		if($('#session').html() > 1) {

			$('#session').html(Number($('#session').html()) - 1);
			count = $('#session').html() * 60;
			$('#timer').html($('#session').html());

			// format session length to hh/mm and display
			hours = Math.floor($('#timer').html() / 60);
			hours = hours < 10 ? '0' + hours : hours;
			minutes = $('#timer').html() % 60;
			minutes = minutes < 10 ? '0' + minutes : minutes;

			$('#timer').html(hours > 0 ? hours + ':' + minutes + ':00' : minutes + ':00');
		}
	});

	$('#sessionPlus').click(function() {

		$('#session').html(Number($('#session').html()) + 1);
		count = $('#session').html() * 60;
		$('#timer').html($('#session').html());

		// format session length to hh/mm and display
		hours = Math.floor($('#timer').html() / 60);
		hours = hours < 10 ? '0' + hours : hours;
		minutes = $('#timer').html() % 60;
		minutes = minutes < 10 ? '0' + minutes : minutes;

		$('#timer').html(hours > 0 ? hours + ':' + minutes + ':00' : minutes + ':00');
	});

	$('#breakMinus').click(function() {

		if($('#breaks').html() > 1) {

			$('#breaks').html(Number($('#breaks').html()) - 1);
		}
	});

	$('#breakPlus').click(function() {

		$('#breaks').html(Number($('#breaks').html()) + 1);
	});

	// countdown timer
	function timer() {
		count--;
		hours = Math.floor(count / 3600);
		hours = hours < 10 ? '0' + hours : hours;
		minutes = Math.floor(count % 3600 / 60);
		minutes = minutes < 10 ? '0' + minutes : minutes;
		seconds = count % 3600 % 60;
		seconds = seconds < 10 ? '0' + seconds : seconds;

		$('#timer').html(hours > 0 ? hours + ':' + minutes + ':' + seconds : minutes + ':' + seconds);
		
		// switch between session and break
		if(count === 0) {
			alarm.play();
			clearInterval(countdown);
			switcher++;
			count = switcher % 2 !== 0 ? $('#breaks').html() * 60 : $('#session').html() * 60;
			switcher % 2 !== 0 ? $('#message').html('Break!') : $('#message').html('Session');
			countdown = setInterval(timer, 1000);
		}
	}

	// start/pause button
	$('#start').click(function() {
		$("#pomMinus, #pomPlus, #breakMinus, #breakPlus").prop('disabled', true);
		$('#message').html('Session');
		isPaused = !isPaused;
		if(isPaused) {
			clearInterval(countdown);
			$('#start').html('Start');
		}
		else {
			countdown = setInterval(timer, 1000);
			$('#start').html('Pause');
		}
	});
	
	// reset button
	$('#reset').click(function() {
		clearInterval(countdown);
		$("#pomMinus, #pomPlus, #breakMinus, #breakPlus").prop('disabled', false);
		$('#session').html(25);
		$('#breaks').html(5);
		$('#timer').html('25:00');
		$('#start').html('Start');
		switcher = 0;
		isPaused = true;
		count = $('#session').html() * 60;
		$('#message').html('Set session');
	});
})