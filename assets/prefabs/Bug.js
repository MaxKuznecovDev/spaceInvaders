class Bug extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, name) {
        super(scene, x, y, name);
        this.init();
        this.setAnimation(name);
        this.anims.play(name);
        this.scene= scene;

    }
    init() {
        this.scene.add.existing(this);
        this.scene.physics.add.existing(this);
        this.body.enable = true;
    }
    setAnimation(bugSprite){
        this.scene.anims.create({
            key: bugSprite,
            frames: this.scene.anims.generateFrameNumbers(bugSprite, { start: 0, end: 1 }),
            frameRate: 1,
            repeat: -1
        });
    }
    disableBody(){
        this.body.enable = false;
        this.setVisible(false);
    }

    enableBody(){
        this.body.enable = true;
        this.setVisible(true);
    }

    timeDelayed(dir){

       this.scene.time.delayedCall(10000,this.moveUfo,[dir],this);
    }
    moveUfo(dir){
        this.enableBody();
        this.body.setVelocityX(150*dir);
        this.scene.sounds.ufo.play();
        (dir == -1) ? dir = 1 : dir = -1;
        this.scene.time.delayedCall(3000,function (dir) {
            this.disableBody();
            this.body.setVelocityX(0);
            this.timeDelayed(dir);
        },[dir],this);


    }

}