class AboutSection {
    constructor() {
        this.createdBy = 'exynil'
        this.sourceCode = function () {
            window.open('https://github.com/exynil/i3lock-color-editor', '_blank');
        }
    }

    init(f) {
        f.add(this, 'createdBy').name('Created by');
        f.add(this, 'sourceCode').name('Source Code');
    }
}