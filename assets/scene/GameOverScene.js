class GameOverScene extends Phaser.Scene {
    constructor() {
        super('GameOverScene')
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
            this.gameOverSounds.stop();
            this.sound.add('click',{volume:0.1}).play();
            this.scene.stop('GameOverScene');
            this.scene.start('StartScene');
        },this)
    }
    createBugAnim(){
        this.bug = new Bug(this,650,250,'bug1');
        this.bug.body.setGravityY(-200);
        this.bug.setScale(5);
    }
    createSounds(){
        this.gameOverSounds= this.sound.add('gameOverScene',{volume:0.1});
        this.gameOverSounds.play();
    }

    create(data) {
        this.score = data.score;

        this.createBackground();
        this.createSounds();

        let arrText = ['Game Over!',`Score: ${this.score}`];
        this.createText(this.getTextCoordinatX(), this.getTextCoordinatY(), arrText);

        this.createClickHandler();
        this.createBugAnim();
    }
}