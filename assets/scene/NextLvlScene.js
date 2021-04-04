class NextLvlScene extends Phaser.Scene {
    constructor() {
        super('NextLvlScene')
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
            this.nextLvlSound.stop();
            this.sound.add('click',{volume:0.1}).play()
            this.scene.stop('NextLvlScene');
            this.scene.start('GameScene',this.data);
        },this)
    }

    createShip(){

        this.ship = this.add.sprite(650,450,'shipNextLvl1').setScale(0.5,0.5);
        this.add.existing(this.ship);
        this.physics.add.existing(this.ship);
        this.ship.body.enable = true;
        this.ship.body.setGravityY(-200);

        this.moveShipY();
        this.moveShipX();
    }
    createShipFlyAnim(){
        const framesShip = this.anims.generateFrameNames('shipNextLvl',{
            prefix:'shipNextLvl',
            start:1,
            end:4
        });

        this.anims.create({
            key:'shipEngFire',
            frames:framesShip,
            frameRate:10  ,
            repeatDelay:5000,
            repeat:-1,
            yoyo:true
        });
        this.ship.play('shipEngFire');
    }
    moveShipY(){
        this.ship.body.setVelocityY(0);
        let arrSpeed = [-15,-20,-15,0,15,20,15];

        for (let i =0, delay = 100; i<7; i++, delay += 100) {
            this.timeDelayedCallY(delay, arrSpeed[i]);
        }
        this.time.delayedCall(800,this.moveShipY,undefined,this);

    }
    moveShipX(){
        let delArr = [
            [800,-20,'shipNextLvl_Left'],
            [1600,0,'shipNextLvl1'],
            [5400,20,'shipNextLvl_Right'],
            [6200,0,'shipNextLvl1']
            ];

        for (let i = 0; i < 4; i++){
            this. timeDelayedCallX(delArr[i]);
        }
        this.time.delayedCall(10000,this.moveShipX,undefined,this);
    }

    timeDelayedCallY(delay,speed){
        this.time.delayedCall(delay,()=>{this.ship.body.setVelocityY(speed)},undefined,this);
    }
    timeDelayedCallX(delArr){
        this.time.delayedCall(delArr[0],()=>{
            this.ship.body.setVelocityX(delArr[1]);
            this.ship.setTexture('shipNextLvl',delArr[2]);
        },undefined,this);
    }

    createSound(){
        this.nextLvlSound = this.sound.add('nextLvlScene',{volume:0.1});
        this.nextLvlSound.play();
    }
    create(data) {
        this.data = data;
        this.createBackground();
        this.createSound();
        let arrText = ['Next level!','Click to start!',`Score: ${this.data.score}`];
        this.createText(this.getTextCoordinatX(), this.getTextCoordinatY(), arrText);
        this.createClickHandler();
        this.createShip();
        this.createShipFlyAnim();
    }
    update(){

    }
}