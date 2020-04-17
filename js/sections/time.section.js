class TimeSection {
	constructor(pos) {
		this.pos = { x: pos.x, y: pos.y }
		this.color = '#197dd7';
		this.alpha = 255;
		this.font = 'DejaVu Sans';
		this.size = 25;
		this.folder;
	}

	getTime() { return new Date().toTimeString().split(' ')[0]; }

	getColor() { return this.toRgba(this.color, this.alpha); }

	toRgba(rgb, a) { return rgb + parseInt(a).toString(16).padStart(2, '0'); }

	setPos(pos) {
		this.pos.x = pos.x;
		this.pos.y = pos.y
	}

	draw() {
		drawText(this.pos.x, this.pos.y, this.getTime(), this.font, this.size, this.getColor());
	}

	init(f) {
		f.addColor(this, 'color').name('Color');
		f.add(this, 'alpha', 0, 255, 1).name('Opacity');
		f.add(this, 'size', 0, 250, 1).name('Size');
		f.add(this.pos, 'x').name('x').listen();
		f.add(this.pos, 'y').name('y').listen();
		this.folder = f;
	}

	importFonts(fonts) {
		this.folder.add(this, 'font', fonts).name('Font');
	}

	getConfig() {
		let config = '';

		config += `--timecolor=${this.getColor()}%%%`;
		config += `--timesize=${parseInt(this.size * 1.36)}%%%`;
		config += `--time-font='${this.font}'%%%`;
		config += `--timepos=${this.pos.x}:${this.pos.y}%%%`;

		return config;
	}

	getReadableConfig() {
		let config = '';

		config += `--timecolor=${this.getColor()}%%%`;
		config += `--timesize=${parseInt(this.size * 1.36)}%%%`;
		config += `--time-font='${this.font}'%%%`;
		config += `--timepos=${this.pos.x}:${this.pos.y}%%%`;

		return config;
	}

	
}