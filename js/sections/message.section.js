class MessageSection {
	constructor(pos) {
		this.pos;
		this.colors = {
			verif: { rgb: '#f5f5f5', a: 150 },
			wrong: { rgb: '#f5f5f5', a: 150 },
		}
		this.messages = {
			verif: 'verifying...',
			wrong: 'wrong!'
		}
		this.font = 'DejaVu Sans';
		this.sizes = {
			verif: 22,
			wrong: 22
		}
		this.noInputText = 'no input';
		this.folder;
		this.setPos(pos);
	}

	getColor(key) { return this.toRgba(this.colors[key].rgb, this.colors[key].a); }

	toRgba(rgb, a) { return rgb + parseInt(a).toString(16).padStart(2, '0'); }

	setPos(pos) { this.pos = pos; }

	draw() {
		drawText(this.pos['verif'].x, this.pos['verif'].y, this.messages['verif'], this.font, this.sizes['verif'], this.getColor('verif'));
		drawText(this.pos['wrong'].x, this.pos['wrong'].y, this.messages['wrong'], this.font, this.sizes['wrong'], this.getColor('wrong'));
		drawText(this.pos['wrong'].x, this.pos['wrong'].y + 30, 'Num Lock', this.font, 11, this.getColor('wrong'));
	}

	init(f) {
		f.addColor(this.colors['verif'], 'rgb').name('Verif color');
		f.add(this.colors['verif'], 'a', 0, 255, 1).name('Opacity');
		f.add(this.messages, 'verif').name('Verif text');
		f.add(this.sizes, 'verif', 5, 250, 1).name('Verif size');

		f.addColor(this.colors['wrong'], 'rgb').name('Wrong color');
		f.add(this.colors['wrong'], 'a', 0, 255, 1).name('Opacity');
		f.add(this.messages, 'wrong').name('Wrong text');
		f.add(this.sizes, 'wrong', 5, 250, 1).name('Wrong size');
		f.add(this, 'noInputText').name('No input');
		this.folder = f;
	}

	importFonts(fonts) {
		this.folder.add(this, 'font', fonts).name('Font');
	}

	getConfig() {
		let config = `--verifcolor=${this.getColor('verif')}%%%`;
		config += `--veriftext='${this.messages['verif']}'%%%`;
		config += `--verifsize=${parseInt(this.sizes['verif'] * 1.36)}%%%`;
		config += `--verif-font='${this.font}'%%%`;
		config += `--wrongcolor=${this.getColor('wrong')}%%%`;
		config += `--wrongtext='${this.messages['wrong']}'%%%`;
		config += `--wrongsize=${parseInt(this.sizes['wrong'] * 1.36)}%%%`;
		config += `--wrong-font='${this.font}'%%%`;
		config += `--noinputtext='${this.noInputText}'%%%`;

		return config;
	}
}