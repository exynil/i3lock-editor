class RingSection {
	constructor(pos) {
		this.pos = {
			main: { x: pos['main'].x, y: pos['main'].y },
			verif: { x: pos['verif'].x, y: pos['verif'].y },
			wrong: { x: pos['wrong'].x, y: pos['wrong'].y }
		};
		this.colors = {
			mainInside: { rgb: '#000000', a: 0 },
			mainRing: { rgb: '#f5f5f5', a: 63 },
			keyHl: { rgb: '#197dd7', a: 255 },
			bsHl: { rgb: '#6fa8dc', a: 255 },
			separator: { rgb: '#222222', a: 255 },
			verifInside: { rgb: '#6fa8dc', a: 0 },
			verifRing: { rgb: '#70aff5', a: 255 },
			wrongInside: { rgb: '#ff3860', a: 0 },
			wrongRing: { rgb: '#e66c6c', a: 255 },
			line: { rgb: '#222222', a: 0 }
		};
		this.radius = 90;
		this.ringWidth = 2;
	}

	getColor(key) { return this.toRgba(this.colors[key].rgb, this.colors[key].a); }

	toRgba(rgb, a) { return rgb + parseInt(a).toString(16).padStart(2, '0'); }

	setPos(pos) {
		this.pos['main'].x = pos['main'].x;
		this.pos['main'].y = pos['main'].y;
		this.pos['verif'] = pos['verif'];
		this.pos['wrong'] = pos['wrong'];
	}

	draw() {
		drawCircle(this.pos['verif'].x, this.pos['verif'].y, this.radius, this.getColor('verifInside'));
		drawRing(this.pos['verif'].x, this.pos['verif'].y, this.radius, this.getColor('verifRing'), this.ringWidth);
		drawRing(this.pos['verif'].x, this.pos['verif'].y, this.radius - 5, this.getColor('line'), 2);

		drawCircle(this.pos['wrong'].x, this.pos['wrong'].y, this.radius, this.getColor('wrongInside'));
		drawRing(this.pos['wrong'].x, this.pos['wrong'].y, this.radius, this.getColor('wrongRing'), this.ringWidth);
		drawRing(this.pos['wrong'].x, this.pos['wrong'].y, this.radius - 5, this.getColor('line'), 2);
	
		drawCircle(this.pos['main'].x, this.pos['main'].y, this.radius, this.getColor('mainInside'));
		drawArc(this.pos['main'].x, this.pos['main'].y, this.radius, this.getColor('mainRing'), this.ringWidth, 61, 359, false);
		drawRing(this.pos['main'].x, this.pos['main'].y, this.radius - 5, this.getColor('line'), 2);
		drawArc(this.pos['main'].x, this.pos['main'].y, this.radius, this.getColor('keyHl'), this.ringWidth, 0, 60, true);
		drawArc(this.pos['main'].x, this.pos['main'].y, this.radius, this.getColor('separator'), this.ringWidth, 60, 61, true);
		drawArc(this.pos['main'].x, this.pos['main'].y, this.radius, this.getColor('separator'), this.ringWidth, 359, 360, true);
	}

	init(f) {
		f.add(this, 'radius', 5, 500, 1).name('Radius');
		f.add(this, 'ringWidth', 0, 300, 1).name('Ring width');

		f.addColor(this.colors['mainInside'], 'rgb').name('Main inside');
		f.add(this.colors['mainInside'], 'a', 0, 255, 1).name('Opacity');
		f.addColor(this.colors['mainRing'], 'rgb').name('Main ring');
		f.add(this.colors['mainRing'], 'a', 0, 255, 1).name('Opacity');
		f.addColor(this.colors['keyHl'], 'rgb').name('Key');
		f.add(this.colors['keyHl'], 'a', 0, 255, 1).name('Opacity');
		f.addColor(this.colors['bsHl'], 'rgb').name('Backspace');
		f.add(this.colors['bsHl'], 'a', 0, 255, 1).name('Opacity');
		f.addColor(this.colors['separator'], 'rgb').name('Separator');
		f.add(this.colors['separator'], 'a', 0, 255, 1).name('Opacity');

		f.addColor(this.colors['verifInside'], 'rgb').name('Verif inside');
		f.add(this.colors['verifInside'], 'a', 0, 255, 1).name('Opacity');
		f.addColor(this.colors['verifRing'], 'rgb').name('Verif Ring');
		f.add(this.colors['verifRing'], 'a', 0, 255, 1).name('Opacity');

		f.addColor(this.colors['wrongInside'], 'rgb').name('Wrong inside');
		f.add(this.colors['wrongInside'], 'a', 0, 255, 1).name('Opacity');
		f.addColor(this.colors['wrongRing'], 'rgb').name('Wrong ring');
		f.add(this.colors['wrongRing'], 'a', 0, 255, 1).name('Opacity');
		f.addColor(this.colors['line'], 'rgb').name('Line');
		f.add(this.colors['line'], 'a', 0, 255).name('Opacity');

		f.add(this.pos['main'], 'x').name('x').listen();
		f.add(this.pos['main'], 'y').name('y').listen();
	}

	getConfig() {
		let config = `--radius=${this.radius}%%%`;
		config += `--ring-width=${this.ringWidth}%%%`;
		config += `--insidecolor=${this.getColor('mainInside')}%%%`;
		config += `--ringcolor=${this.getColor('mainRing')}%%%`;
		config += `--keyhlcolor=${this.getColor('keyHl')}%%%`;
		config += `--bshlcolor=${this.getColor('bsHl')}%%%`;
		config += `--separator=${this.getColor('separator')}%%%`;

		config += `--insidevercolor=${this.getColor('verifInside')}%%%`;
		config += `--ringvercolor=${this.getColor('verifRing')}%%%`;
		config += `--insidewrongcolor=${this.getColor('wrongInside')}%%%`;
		config += `--ringwrongcolor=${this.getColor('wrongRing')}%%%`;
		config += `--linecolor=${this.getColor('line')}%%%`;

		config += `--indpos=${this.pos['main'].x}:${this.pos['main'].y}%%%`;

		return config;
	}
}