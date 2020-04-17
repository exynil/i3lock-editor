class BarSection {
    constructor() {
        this.colors = {
            bar: { rgb: '#333333', a: 255 },
            keyHl: { rgb: '#93c47d', a: 255 },
            bsHl: { rgb: '#6fa8dc', a: 255 }
        };
        this.direction = 0;
        this.width = 100;
        this.orientation = 'horizontal';
        this.step = 15;
        this.maxHeight = 15;
        this.baseWidth = 15;
        this.periodicStep = 95;
        this.position = 0;
    }

    getColor(key) { return this.toRgba(this.colors[key].rgb, this.colors[key].a) }

    toRgba(rgb, a) { return rgb + parseInt(a).toString(16).padStart(2, '0'); }

    draw() {
        let points = [];

        let x = 100;
        let y = this.position;

        if (this.maxHeight % this.step != 0) {
            points.push({ x: x, y: y });
            points.push({ x: x, y: y -= this.maxHeight % this.step });
        }

        while (y > this.position - this.maxHeight) {
            points.push({ x: x = x + this.width, y: y });
            points.push({ x: x, y: y -= this.step });
        }

        while (y < this.position) {
            points.push({ x: x = x + this.width, y: y });
            if (y + this.step > this.position) {
                points.push({ x: x, y: y += this.maxHeight % this.step });
                break;
            }
            points.push({ x: x, y: y += this.step });
        }

        if (this.direction == 0) {
            for (let i = 0; i < points.length; i++) {
                points[i].y = 2 * this.position - points[i].y;
            }
        }
        else if (this.direction == 2) {
            for (let i = points.length - 1; i > -i; i--) {
                points.push({ x: points[i].x, y: 2 * this.position - points[i].y + this.baseWidth / 2 });
                points[i].y += this.baseWidth / 2;
            }
        }

        if (this.orientation == 'vertical') {
            for (let i = 0; i < points.length; i++) {
                let temp = points[i].x;
                points[i].x = points[i].y;
                points[i].y = temp;
            }
        }

        // draw bar
        if (this.orientation == 'vertical') {
            if (this.direction == 1) {
                drawRect(this.position, 0, -this.baseWidth, canvas.height, this.getColor('bar'));
            }
            else {
                drawRect(this.position, 0, this.baseWidth, canvas.height, this.getColor('bar'));
            }
        }
        else {
            if (this.direction == 1) {
                drawRect(0, this.position, canvas.width, -this.baseWidth, this.getColor('bar'));

            }
            else {
                drawRect(0, this.position, canvas.width, this.baseWidth, this.getColor('bar'));
            }
        }

        drawPolygon(points, this.getColor('keyHl'));
    }

    init(f) {
        f.addColor(this.colors.bar, 'rgb').name('Bar');
        f.add(this.colors.bar, 'a', 0, 255, 1).name('Opacity');
        f.addColor(this.colors.keyHl, 'rgb').name('Key');
        f.add(this.colors.keyHl, 'a', 0, 255, 1).name('Opacity');
        f.addColor(this.colors.bsHl, 'rgb').name('Backspace');
        f.add(this.colors.bsHl, 'a', 0, 255, 1).name('Opacity');
        f.add(this, 'width', 0, 400, 1).name('Width');
        f.add(this, 'step', 0, 50, 1).name('Step');
        f.add(this, 'maxHeight').name('Max height');
        f.add(this, 'baseWidth').name('Base width');
        f.add(this, 'position').name('Position');
        f.add(this, 'orientation', ['horizontal', 'vertical']).name('Orienation');
        f.add(this, 'direction', ['0', '1', '2']).name('Direction');
        f.add(this, 'periodicStep').name('Periodic step');
    }

    getConfig() {
        let config = `--bar-color=${this.getColor('bar')}%%%`;
        config += `--keyhlcolor=${this.getColor('keyHl')}%%%`;
        config += `--bshlcolor=${this.getColor('bsHl')}%%%`;
        config += `--bar-width=${this.width}%%%`;
        config += `--bar-step=${this.step}%%%`;
        config += `--bar-max-height=${this.maxHeight}%%%`;
        config += `--bar-base-width=${this.baseWidth}%%%`;
        config += `--bar-position=${this.position}%%%`;
        config += `--bar-orientation=${this.orientation}%%%`;
        config += `--bar-direction=${this.direction}%%%`;
        config += `--bar-periodic-step=${this.periodicStep}%%%`;
        return config;
    }
}
