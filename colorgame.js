var numDiamond = 6;
var colors = [];
var pickedColor;
var diamond = document.querySelectorAll('.diamond');
var colorDisplay = document.getElementById('colorDisplay');
var messageDisplay = document.querySelector('#message');
var h1 = document.querySelector('h1');
var resetButton = document.querySelector('#reset');
var modeButtons = document.querySelectorAll('.mode');

init();

function init() {
	setupModeButtons();
	setupDiamond();
	reset();
}

function setupModeButtons() {
	for (var i = 0; i < modeButtons.length; i++) {
		modeButtons[i].addEventListener('click', function() {
			modeButtons[0].classList.remove('selected');
			modeButtons[1].classList.remove('selected');
			this.classList.add('selected');

			this.textContent === 'Easy' ? (numDiamond = 3) : (numDiamond = 6);

			reset();
		});
	}
}

function setupDiamond() {
	for (var i = 0; i < diamond.length; i++) {
		//add click listeners to squares
		diamond[i].addEventListener('click', function() {
			//grab color of clicked square
			var clickedColor = this.style.backgroundColor;
			//compare color to picked color
			if (clickedColor === pickedColor) {
				messageDisplay.textContent = 'Correct!';
				resetButton.textContent = 'Play Again?';
				changeColors(clickedColor);
				h1.style.backgroundColor = clickedColor;
			} else {
				this.style.backgroundColor = '#232323';
				messageDisplay.textContent = 'Try Again';
			}
		});
	}
}

function reset() {
	colors = generateRandomColors(numDiamond);
	//pick new random color from array
	pickedColor = pickColor();
	//change colorDisplay to match picked color
	colorDisplay.textContent = pickedColor;
	resetButton.textContent = 'New Colors';
	messageDisplay.textContent = '';
	//change colors of squares
	for (var i = 0; i < diamond.length; i++) {
		if (colors[i]) {
			diamond[i].style.display = 'block';
			diamond[i].style.backgroundColor = colors[i];
		} else {
			diamond[i].style.display = 'none';
		}
	}
	h1.style.backgroundColor = 'steelblue';
}
resetButton.addEventListener('click', function() {
	reset();
});

function changeColors(color) {
	//loop through all sqaures
	for (var i = 0; i < diamond.length; i++) {
		//change each color to match given color
		diamond[i].style.backgroundColor = color;
	}
}

function pickColor() {
	var random = Math.floor(Math.random() * colors.length);
	return colors[random];
}

function generateRandomColors(num) {
	//make an array
	var arr = [];
	//repeat num times
	for (var i = 0; i < num; i++) {
		//get random color and push into arr
		arr.push(randomColor());
	}
	//return that array
	return arr;
}

function randomColor() {
	//pick a "red" from 0-255
	var r = Math.floor(Math.random() * 256);
	//pick a "green" from 0-255
	var g = Math.floor(Math.random() * 256);
	//pick a "blue" from 0-255
	var b = Math.floor(Math.random() * 256);
	return 'rgb(' + r + ', ' + g + ', ' + b + ')';
}
