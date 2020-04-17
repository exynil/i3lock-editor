class MainSection {
    constructor() {
        this.ringPos = { main: { x: 0, y: 0 }, verif: { x: 0, y: 0 }, wrong: { x: 0, y: 0 } };
        this.messagePos = { verif: { x: 0, y: 0 }, wrong: { x: 0, y: 0 } };
        this.timePos = { x: 0, y: 0 };
        this.datePos = { x: 0, y: 0 };
        this.greeterPos = { x: 0, y: 0 };

        this.updatePos();

        this.gui = new dat.GUI();
        this.indicator = new IndicatorSection(this.ringPos);
        this.message = new MessageSection(this.messagePos);
        this.clock = new ClockSection(this.timePos, this.datePos);
        this.layout = new LayoutSection(this.datePos);
        this.greeter = new GreeterSection(this.greeterPos);
        this.background = new BackgroundSection();
        this.about = new AboutSection();

        this.timePos;
    }

    init() {
        this.indicator.init(this.gui.addFolder('Indicator'));
        this.message.init(this.gui.addFolder('Message'));
        this.clock.init(this.gui.addFolder('Clock'));
        this.layout.init(this.gui.addFolder('Layout'));
        this.greeter.init(this.gui.addFolder('Greeter'));
        this.background.init(this.gui.addFolder('Background'));
        this.gui.add(this, 'export').name('Export');
        this.gui.add(this, 'exportReadable').name('Export (readable)');
        this.about.init(this.gui.addFolder('About'));
    }

    draw() {
        this.indicator.draw();
        this.message.draw();
        this.clock.draw();
        this.layout.draw();
        this.greeter.draw();
        this.background.draw();
    }

    setPos() {
        this.indicator.setPos(this.ringPos);
        this.message.setPos(this.messagePos);
        this.clock.setPos(this.timePos, this.datePos);
        this.layout.setPos(this.date);
        this.greeter.setPos(this.greeterPos);
    }

    importFonts(fonts) {
        this.message.importFonts(fonts);
        this.clock.importFonts(fonts);
        this.layout.importFonts(fonts);
        this.greeter.importFonts(fonts);
    }

    updatePos() {
        this.ringPos['main'].x = canvas.width / 2;
        this.ringPos['main'].y = canvas.height / 2;
        this.ringPos['verif'].x = canvas.width / 6;
        this.ringPos['verif'].y = canvas.height / 2;
        this.ringPos['wrong'].x = canvas.width * 5 / 6;
        this.ringPos['wrong'].y = canvas.height / 2;

        this.messagePos['verif'].x = canvas.width / 6;
        this.messagePos['verif'].y = canvas.height / 2;
        this.messagePos['wrong'].x = canvas.width * 5 / 6;
        this.messagePos['wrong'].y = canvas.height / 2;

        this.greeterPos.x = canvas.width / 2;
        this.greeterPos.y = canvas.height * 9 / 10;

        this.timePos.x = canvas.width / 2;
        this.timePos.y = canvas.height / 2;

        this.datePos.x = canvas.width / 2;
        this.datePos.y = canvas.height / 2 + 30;
    }

    getConfig() {
        let config = 'i3lock%%%';

        config += this.indicator.getConfig();
        config += this.message.getConfig();
        config += this.clock.getConfig();
        config += this.layout.getConfig();
        config += this.greeter.getConfig();
        config += this.background.getConfig();

        return config.replace(/#/g, '');
    }

    export() {
        let win = window.open();
        win.document.body.innerHTML = this.getConfig().replace(/%%%/g, ' ');
    }

    exportReadable() {
        let win = window.open();
        let config = this.getConfig().split('%%%');
        
        while(config.indexOf("") != -1) {
            config.splice(config.indexOf(""), 1);
        }

        for (let i = 0; i < config.length - 1; i++) {
            win.document.body.innerHTML += `${config[i]} \\</br>`;
        }
        win.document.body.innerHTML += `${config[config.length - 1]}</br>`;
    }
}