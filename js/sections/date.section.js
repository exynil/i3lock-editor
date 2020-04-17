class DateSection {
	constructor(pos) {
		this.pos = pos;
		this.color = '#197dd7';
		this.alpha = 255;
		this.font = 'DejaVu Sans';
		this.size = 12;
		this.folder;
	}

	getColor() { return this.toRgba(this.color, this.alpha); }

	getDate() { return new Date().toDateString(); }

	toRgba(rgb, a) { return rgb + parseInt(a).toString(16).padStart(2, '0'); }

	setPos(pos) {
		this.pos.x = pos.x;
		this.pos.y = pos.y;
	}

	draw() {
		drawText(this.pos.x, this.pos.y, this.getDate(), this.font, this.size, this.getColor());
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

		config += `--datecolor=${this.getColor()}%%%`;
		config += `--datesize=${parseInt(this.size * 1.36)}%%%`;
		config += `--date-font='${this.font}'%%%`;
		config += `--datepos=${this.pos.x}:${this.pos.y}%%%`;

		return config;
	}
}