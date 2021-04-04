class BootScene extends Phaser.Scene {
    constructor() {
        super('BootScene')
    }
    preload(){
        this.load.image('bg','assets/sprites/background.png');
    }

    getSizeBgWidth(){
        return this.game.config.width - 229;
    }
    getSizeBgHeight(){
        return this.game.config.height - 35
    }
    createBackground(){
        this.bg = this.add.image(0,0,'bg');
        this.bg.setDisplaySize(this.getSizeBgWidth(),this.getSizeBgHeight());
        this.bg.setPosition(this.cameras.main.centerX, this.cameras.main.centerY);
    }
    create() {
        this.createBackground();
        this.scene.start('PreloadScene');
    }
}