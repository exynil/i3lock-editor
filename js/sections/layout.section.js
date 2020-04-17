class LayoutSection {
	constructor(pos) {
		this.pos = pos;
		this.isEnabled = false;
		this.color = '#f5f5f5';
		this.alpha = 255;
		this.font = 'DejaVu Sans';
		this.size = 11;
		this.modes = ['English (US)', 'English', 'US'];
		this.mode = this.modes[1];
		this.folder;
	}

	getColor() { return this.toRgba(this.color, this.alpha); }

	getMode() { return this.mode; }

	getModes() { return this.modes; }

	getIndexOfMode() { return this.modes.indexOf(this.mode) }

	toRgba(rgb, a) { return rgb + parseInt(a).toString(16).padStart(2, '0'); }

	draw() {
		if (this.isEnabled) {
			drawText(this.pos.x, this.pos.y + 30, this.getMode(), this.font, this.size, this.getColor());
		}
	}
	setPos(pos) { this.pos = pos; }

	init(f) {
		f.add(this, 'isEnabled').name('Enable');
		f.addColor(this, 'color').name('Color');
		f.add(this, 'alpha', 0, 255, 1).name('Opacity');
		f.add(this, 'size', 5, 250, 1).name('Size');
		f.add(this, 'mode', this.getModes());
		this.folder = f;
	}

	importFonts(fonts) {
		this.folder.add(this, 'font', fonts).name('Font');
	}

	getConfig() {
		let config = '';

		if (this,this.isEnabled) {
			config = `--layoutcolor=${this.getColor()}%%%`;
			config += `--layoutsize=${parseInt(this.size * 1.36)}%%%`;
			config += `--layout-font='${this.font}'%%%`;
			config += `--keylayout=${this.getIndexOfMode(this.mode)}%%%`;
		}

		return config;
	}
}