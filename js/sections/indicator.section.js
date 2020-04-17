class IndicatorSection {
	constructor(ringPos) {
		this.isEnabled = true;
		this.type = 'ring';
		this.ring = new RingSection(ringPos);
		this.bar = new BarSection();
	}

	draw() {
		if (this.isEnabled) {
			if (this.type == 'ring') {
				this.ring.draw();
			}
			else {
				this.bar.draw();
			}
		}
	}

	init(f) {
		f.add(this, 'isEnabled').name('Enable');
		f.add(this, 'type', ['ring', 'bar']).name('Type').listen();
		this.ring.init(f.addFolder('Ring'));
		this.bar.init(f.addFolder('Bar'));
	}

	setPos(ringPos) {
		this.ring.setPos(ringPos);
	}

	getConfig() {
		let config = '';
		if (this.isEnabled) {
			if (this.type == 'ring') {
				config += '--indicator%%%';
				return config += this.ring.getConfig();
			}
			else {
				config += '--bar-indicator%%%';
				return config += this.bar.getConfig();
			}
		}
		return '-u%%%';
	}

	getTheme() {
		
	}
}