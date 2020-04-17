var canvas = document.querySelector('canvas');
var ctx = canvas.getContext('2d');
var main;

canvas.width = innerWidth;
canvas.height = innerHeight;

function animate() {
	animationId = requestAnimationFrame(animate);
	ctx.clearRect(0, 0, canvas.width, canvas.height);

	main.draw();
}

function init() {
	main = new MainSection();

	main.init();

	animate();
}

init();