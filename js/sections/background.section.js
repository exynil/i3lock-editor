class BackgroundSection {
	constructor() {
		this.isEnabled = true;
		this.type = 'blur';
		this.loadImage = function () {
			this.type = 'image';
			let temp = document.createElement('input');
			temp.setAttribute('type', 'file');
			temp.addEventListener('change', function () {

				if (this.files && this.files[0]) {
					var bg = document.getElementById('background');
					bg.style.backgroundImage = `url(${URL.createObjectURL(this.files[0])})`;
					main.background.imageName = this.files[0].name;
				}
			})
			temp.click();
		}

		this.color = '#1f1f28';
		this.imageName = "";

		this.bg = document.getElementById('background');
		this.folder;

		this.colorC;
		this.imageC;
	}

	updateSection() {
		if (this.colorC != undefined) {
			this.colorC.remove();
			this.colorC = undefined;
		}
		if (this.imageC != undefined) {
			this.imageC.remove();
			this.imageC = undefined;

		}
		if (this.type == 'color') {
			this.colorC = this.folder.addColor(this, 'color').name('Color');
		}
		else if (this.type == 'image') {
			this.imageC = this.folder.add(this, 'loadImage').name('Load image');
		}
	}

	draw() {
		if (this.isEnabled) {
			if (this.type == 'color') {
				this.bg.style.background = this.color;
			}
			else if (this.type == 'blur') {
				this.bg.style.background = '#1f1f28';
			}
		} else {
			this.bg.style.background = 'none';
		}
	}

	init(f) {
		f.add(this, 'isEnabled').name('Enable').listen();
		f.add(this, 'type', ['blur', 'color', 'image']).name('Type').listen().onChange(function () {
			main.background.updateSection();
		});
		this.folder = f;
	}

	getConfig() {
		let config = '';

		if (this.isEnabled) {
			if (this.type == 'blur') {
				config += '-B=sigma%%%';
			}
			else if (this.type == 'color'){
				config += `--color=${this.color}%%%`;
			}
			else {
				config += `-i=[put_here_full_path_to_your_folder_with_picture]/${this.imageName}%%%`
			}
			return config;
		}

		return config;
	}
}