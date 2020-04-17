// Отслеживание изменения размера окна
addEventListener('resize', function () {
	canvas.width = innerWidth;
	canvas.height = innerHeight;

	main.updatePos();
	main.setPos();
});

addEventListener('keydown', function(event) {
	switch (event.code) {
		case 'Space':
			break;
	}
});