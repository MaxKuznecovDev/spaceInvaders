class FirePlayer extends Phaser.GameObjects.Sprite {
    constructor(scene,x,y,name){
        super(scene,x,y,name);
        this.init();
    }
    init(){
        this.scene.add.existing(this);
        this.scene.physics.add.existing(this);
        this.body.enable = true;
        this.body.setSize(1,1);
    }

}