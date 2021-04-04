class Wall extends Phaser.GameObjects.Sprite {
    constructor(scene,x,y,name,frame,life){
        super(scene,x,y,name,frame);
        this.init();
        this.scene = scene;
        this.life=life;
    }

    init(status) {
        this.scene.add.existing(this);
        this.scene.physics.add.existing(this);
        this.body.enable = true;
    }

}