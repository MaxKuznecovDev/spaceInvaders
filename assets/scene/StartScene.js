class StartScene extends Phaser.Scene {
    constructor() {
        super('StartScene')
    }
    getSizeBgWidth(){
        return this.game.config.width - 229;
    }
    getSizeBgHeight(){
        return this.game.config.height - 35
    }
    getTextCoordinatX(){
        return this.bg._displayOriginX + this.bg.width/2
    }
    getTextCoordinatY(){
        return this.bg._displayOriginY + this.bg.height/2
    }

    createBackground(){
        this.bg = this.add.image(0,0,'bg');
        this.bg.setDisplaySize(this.getSizeBgWidth(),this.getSizeBgHeight());
        this.bg.setPosition(this.cameras.main.centerX, this.cameras.main.centerY);
    }
    createText(x,y,arrText){
        for(let i=0; i < arrText.length;i++){
            this.add.text( x, y, arrText[i], {fill: '#ffffff', font: '23px GameBoy'});
            y+=100;
        }

    }
    createClickHandler(){
        this.input.on('pointerdown', () => {
            this.startSound.stop();
            this.sound.add('click',{volume:0.1}).play()
            this.scene.stop('StartScene')
            this.scene.start('GameScene',{score:0,life:3,lvlSpeed:0})
        },this)
    }
    createTitle(){
        this.title = this.add.sprite(this.cameras.main.centerX, 500, 'title');
            this.tweens.add({
                targets: this.title,
                y:200,
                repeat: -1,
                yoyo:true,
                duration: 20000
            });
    }
    createSound(){
        this.startSound = this.sound.add('startScene',{volume:0.1,loop:true});
        this.startSound.play();
    }

    create() {
        this.createBackground();
        this.createSound();
        this.createTitle();
        let arrText = ['Welcome to the new game','Click mouse to start!','Fire:SPACE, Move:LF,RH','Created by Max Kuznecov'];
        this.createText(this.getTextCoordinatX(), this.getTextCoordinatY(), arrText);
        this.createClickHandler();

    }
}