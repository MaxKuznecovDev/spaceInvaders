class Fires extends Phaser.Physics.Arcade.Group {
    constructor(scene,gravity){
        super(scene.physics.world, scene);
        this.scene = scene;
        this.defaults.setGravityY = gravity;
    }
    createFire(fire){
        let bullet = this.getFirstDead();
        if(!bullet){
            this.add(new FirePlayer(this.scene, fire.x,fire.y,fire.sprite));
        }else{
            bullet.x=fire.x;
            bullet.y=fire.y;
            bullet.body.velocity.y=0;
            this.reset(bullet);
        }

    }
    reset(bullet){
        this.scene.setActiveObj(bullet,true)
    }


}