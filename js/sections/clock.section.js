class ClockSection {
	constructor(timePos, datePos) {
		this.isEnabled = true;
		this.time = new TimeSection(timePos);
		this.date = new DateSection(datePos);
	}

	draw() {
		if (this.isEnabled) {
			this.time.draw();
			this.date.draw();
		}
	}

	init(f) {
		f.add(this, 'isEnabled').name('Enable');
		this.time.init(f.addFolder('Time'));
		this.date.init(f.addFolder('Date'));
	}

	setPos(timePos, datePos) {
		this.time.setPos(timePos);
		this.date.setPos(datePos);
	}

	importFonts(fonts) {
		this.time.importFonts(fonts);
		this.date.importFonts(fonts);
	}

	getConfig() {
		let config = '';

		if (this.isEnabled) {
			config += '--clock%%%';
			config += this.time.getReadableConfig();
			config += this.date.getConfig();
		}

		return config;
	}
}