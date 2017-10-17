$(document).ready(function() {

	var display = $('#display');
	var click = new Audio('sound/click.wav');
	var ops = ['+', '-', '*', '/'];
	var task = [];
	var last = '';
	var previousOp = [];
	var count = 0;

	function numberHandler() {

		click.play();

		// take input only if max 8 digits on display
		if(display.html().length < 8) {

			// if last input was operation clear display and print new input
			if(ops.includes(last)) {
				display.html('');
				last = '';
				display.html(display.html() + $(this).val());
			}
			// else if last input was number do the sam thing + empty task array
			else if(last === 'num') {
				display.html('');
				display.html(display.html() + $(this).val());
				last = '';
				task.length = 0;
			}
			// if calculator is in default state clear display and print input
			else if(display.html() == 0){
				display.html('');
				display.html(display.html() + $(this).val());
			}
			// else just print new input
			else {
				display.html(display.html() + $(this).val());
			}
		}
	}

	function operationHandler() {

		click.play();

		// if task array is empty push number on display and operation, 
		// remember it as previous
		if(task.length === 0) {
			task.push(Number(display.html()), $(this).val());
			previousOp.push($(this).val());
		}
		// if number and operation already in task and number on display,
		// just act like equals button and remember operation
		else if(last === '') {
			equalsHandler();
			task.push($(this).val());
			previousOp.push($(this).val());
		}
		else {
			// if last is operation, replace it
			if(ops.includes(last)) {
				task[1] = $(this).val();
				previousOp.push($(this).val());
			}
			// else just add operation to task
			else {
				task.push($(this).val());
				previousOp.push($(this).val());
			}
		}

		last = $(this).val();
	}

	function equalsHandler() {

		click.play();

		var result = 0;

		// if less than 2 elements in task or 2 elements in task but last was operation
		if((task.length < 2 && last === '') || (task.length === 2 && ops.includes(last))) {
			 // ignore equals button
		}
		else {
			// if equals pressed multiple times in a row
			// repeat previous operation
			if(last === 'num') {

				task = task.concat(previousOp);
			}
			// else push number on display into task
			else {

				task.push(Number(display.html()));
				previousOp.push(Number(display.html()));
			}

			switch(task[1]) {
				case '+':
					result = task[0] + task[2];
					break;
				case '-':
					result = task[0] - task[2];
					break;
				case '*':
					result = task[0] * task[2];
					break;
				case '/':
					result = task[0] / task[2];
			}

			// check if result longer than 8 digits
			if(String(result).length > 8) {
				// if float, fix it to certain number of decimals
				if(String(result).indexOf('.') !== -1) {
					var resultFloor = Math.floor(result);
					display.html(result.toFixed(8 - String(resultFloor).length));
				}
				// else display as exponential with 3 decimals
				else {
					display.html(result.toExponential(3));
				}
			}
			else {
				display.html(result);
			}

			// replace executed operation with the result adn display it
			task = task.slice(3, task.length);
			task.push(Number(display.html()));
			last = 'num';
		}
	}

	function ACHandler() {

		click.play();
		
		// reset every variable
		display.html(0);
		last = '';
		task.length = 0;
		previousOp.length = 0;
	}

	function CEHandler() {

		click.play();

		// remove last input digit
		var temp = Number(display.html());
		display.html(Math.floor(temp / 10));
	}

	// when power button pressed add click handlers, remove them if pressed again
	$('#power').click(function() {

		count++;

		if(count % 2 !== 0) {

			click.play();

			display.html(0);
			last = '';
			task.length = 0;
			previousOp.length = 0;

			$('.num').click(numberHandler);
			$('.operation').click(operationHandler);
			$('#equals').click(equalsHandler);
			$('#AC').click(ACHandler);
			$('#CE').click(CEHandler);
		}
		else {
			
			display.html('');
			$('.num').off('click');
			$('.operation').off('click');
			$('#equals').off('click');
			$('#AC').off('click');
			$('#CE').off('click');
		}
	});
});