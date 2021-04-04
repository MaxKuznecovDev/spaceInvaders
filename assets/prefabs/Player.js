class Player extends Phaser.GameObjects.Sprite {
    constructor(scene,x,y,name){
        super(scene,x,y,name);
        this.init();
        this.scene = scene;
    }

    init() {
        this.scene.add.existing(this);
        this.scene.physics.add.existing(this);
        this.body.enable = true;
        this.setScale(1.5);
        this.fireHandler();
        this.lifeShip = [];
        this.createLife();
    }
    move(){
        if (this.scene.cursors.left.isDown && this.x > 275){
            this.body.setVelocityX(-150);
        }else if (this.scene.cursors.right.isDown && this.x < 725){
            this.body.setVelocityX(150);
        } else {
            this.body.setVelocityX(0);
        }
    }


    fireHandler(){
        this.scene.input.keyboard.on('keydown-SPACE', function () {
            let fire = {
                x:this.player.x,
                y:this.player.y - 17,
                sprite:'bullet'
            }
            this.sounds.shotPlayer.play();
            this.groupFiresPlayer.createFire(fire);
        } ,this.scene);
    }

    createLife(){
          for (let i = 0, x = 300; i < this.scene.life; i++, x+=50){
             this.lifeShip[i] =this.scene.add.image(x,550,'life').setScale(1.5);
        }
    }

    reset(){
        this.body.enable = true;
        this.setTexture('ship',0);
        this.fireHandler();
    }

}