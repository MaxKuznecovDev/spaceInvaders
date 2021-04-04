class WallGroup extends Phaser.Physics.Arcade.Group {
    constructor(scene){
        super(scene.physics.world, scene);
        this.scene = scene;
        this.defaults.setGravityY = -200;
        this.wallData = this.scene.cache.json.get('wall_JSON');
    }
    createWall(wall){
            this.add(new Wall(this.scene, wall.x,wall.y,wall.sprite,wall.frame,wall.life));
    }

    createAllWall(wallX,wallY, nameSprite,life){
        for(let i = 0 ; i < 8; i++ ) {
            let arrFrame = this.wallData.frames[i];
            let wall = {
                x:wallX + arrFrame.frame.x,
                y:wallY + arrFrame.frame.y,
                sprite:nameSprite,
                frame:'wall-'+i,
                life:life

            };
            this.createWall(wall);
        }
    }


}