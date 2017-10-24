window.onload = function() {

	var board = [1, 2, 3, 4, 5, 6, 7, 8, 9];
	var field, player, human;

	$('.choose').click(function() {
		$('#choosePlayer').hide();
		player = $(this).html();
		human = $(this).html();
		$('#message').html(player + "'s turn");
		$(':button').on('click', buttonHandler);

		if(human === 'O') {

			player = 'X';
			$('#message').html(player + "'s turn");

			setTimeout(function() {
				
				moveAI(player, board);
				print(player, board);
				won(board);
	
				if(won(board)) return;
	
				player === 'O' ? player = 'X' : player = 'O';
				$('#message').html(player + "'s turn...");
			}, 1000);
		}
	});

	function buttonHandler() {

		field = this.value;

		if(typeof board[field - 1] !== 'number') {

			$('#message').html("Illegal move");
			$('#message').css('color', '#FF4242');

			setTimeout(function() {
				$('#message').css('color', '#2A3B4E');
				$('#message').html("try again...");
			}, 1500);
		} else {

			move(player, field, board);
			print(player, board);
			won(board);

			if(won(board)) return;

			player === 'X' ? player = 'O' : player = 'X';
			$('#message').html(player + "'s turn...");
			
			setTimeout(function() {
				
				moveAI(player, board);
				print(player, board);
				won(board);

				if(won(board)) return;

				player === 'X' ? player = 'O' : player = 'X';
				$('#message').html(player + "'s turn...");

			}, 1000);
		}
	}

	$('#restart').on('click', function resetGame() {
		board = [1, 2, 3, 4, 5, 6, 7, 8, 9];
		$(':button').html('E').removeClass('print red');
		$(':button').unbind('click');
		$('#message').html('X plays first');
		$('#choosePlayer').show();
	});
}

function move(sym, num, arr) {

	for(let i = 0; i < 9; i++) {
		if(arr[i] == num) {
			arr[i] = sym;
		}
	}
}

function moveAI(sym, arr) {

	var available = [];

	for(let i = 0; i < 9; i++) {
		if(typeof arr[i] == 'number') {
			available.push(i);
		}
	}
	var random = Math.floor(Math.random() * available.length);
	arr[available[random]] = sym;
}

function print(sym, arr) {

	var buttons = document.querySelectorAll('button');

	for(let i = 0; i < 9; i++) {
		if(arr[i] === sym) {
			buttons[i].innerHTML = sym;
			buttons[i].setAttribute('class', 'print');
		}
	}
}

function won(arr) {

	var buttons = document.querySelectorAll('button');
	var count = 0;
	var end = false;

	for(let i = 0; i < 9; i++) {

		// check horizontal
		if(i % 3 === 0 && arr[i] === arr[i+1] && arr[i+1] === arr[i+2]) {
			$('#message').html(arr[i] + ' won!');
			buttons[i].setAttribute('class', 'red');
			buttons[i+1].setAttribute('class', 'red');
			buttons[i+2].setAttribute('class', 'red');
			end = true;
		}

		// check vertical
		if(i < 3 && arr[i] === arr[i+3] && arr[i+3] === arr[i+6]) {
			$('#message').html(arr[i] + ' won!');
			buttons[i].setAttribute('class', 'red');
			buttons[i+3].setAttribute('class', 'red');
			buttons[i+6].setAttribute('class', 'red');
			end = true;
		}

		// check if draw 
		if(!end && typeof arr[i] !== 'number') {
			count++;
			if(count === 9) {
				$('#message').html('Draw!');
				end = true;
			}
		}
	}

	// check diagonal
	if(arr[4] === arr[0] && arr[4] === arr[8]) {
		$('#message').html(arr[4] + ' won!');
		buttons[0].setAttribute('class', 'red');
		buttons[4].setAttribute('class', 'red');
		buttons[8].setAttribute('class', 'red');
		end = true;
	}

	if(arr[4] === arr[2] && arr[4] === arr[6]) {
		$('#message').html(arr[4] + ' won!');
		buttons[2].setAttribute('class', 'red');
		buttons[4].setAttribute('class', 'red');
		buttons[6].setAttribute('class', 'red');
		end = true;
	}

	if(end) {
		$(':button').unbind('click');
		return true;
	}
}