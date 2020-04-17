class GreeterSection {
	constructor(pos) {
		this.pos;
		this.isEnabled = false;
		this.text = "Greeter text";
		this.color = '#f5f5f5';
		this.alpha = 255;
		this.font = 'DejaVu Sans';
		this.size = 20;
		this.folder;
		this.setPos(pos);
	}

	getText() { return this.text }

	getColor() { return this.toRgba(this.color, this.alpha); }

	getPos(key) { return this.pos[key]; }

	setPos(pos) { this.pos = pos; }

	toRgba(rgb, a) { return rgb + parseInt(a).toString(16).padStart(2, '0'); }

	draw() {
		if (this.isEnabled) {
			drawText(this.getPos('x'), this.getPos('y'), this.getText(), this.font, this.size, this.getColor());
		}
	}

	init(f) {
		f.add(this, 'isEnabled').name('Enable');
		f.add(this, 'text').name('Text');
		f.addColor(this, 'color').name('Text color');
		f.add(this, 'alpha', 0, 255, 1).name('Opacity');
		f.add(this, 'size', 5, 250, 1).name('Size');
		f.add(this.pos, 'x').name('x');
		f.add(this.pos, 'y').name('y');
		this.folder = f;
	}

	importFonts(fonts) {
		this.folder.add(this, 'font', fonts).name('Font');
	}

	getConfig() {
		let config = '';
		
		if (this.isEnabled) {
			config = `--greetertext='${this.text}'%%%`;
			config += `--greetercolor=${this.getColor()}%%%`;
			config += `--greeter-font='${this.font}'%%%`;
			config += `%%%`;
			config += `--greetersize=${parseInt(this.size * 1.36)}%%%`;
			config += `--greeterpos=${this.pos.x}:${this.pos.y}%%%`;
		}
	
		return config;
	}
}