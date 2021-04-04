class PreloadScene extends Phaser.Scene {
    constructor() {
        super('PreloadScene')
    }
    preload(){
        this.createBackground();
        const loadBar = new LoadBar(this);
        this.preloadAssets();
    }
    preloadAssets(){
        this.load.image('bg','assets/sprites/background.png');
        this.load.image('life','assets/sprites/life.png');
        this.load.image('platform','assets/sprites/platform.png');
        this.load.image('bullet','assets/sprites/bullet.png');
        this.load.image('bugBullet','assets/sprites/bugBullet.png');
        this.load.image('title','assets/sprites/title.png');

        this.load.spritesheet('ship','assets/sprites/ship.png',{ frameWidth: 26, frameHeight: 16});
        this.load.spritesheet('bug1','assets/sprites/bug1.png',{ frameWidth: 26, frameHeight: 19});
        this.load.spritesheet('bug2','assets/sprites/bug2.png',{ frameWidth: 26, frameHeight: 18});
        this.load.spritesheet('bug3','assets/sprites/bug3.png',{ frameWidth: 26, frameHeight: 19});
        this.load.spritesheet('ufo','assets/sprites/ufo.png',{ frameWidth: 50, frameHeight: 23});

       this.load.atlas('wall_1','assets/sprites/wall/wall1.png', 'assets/sprites/wall/wall.json');
       this.load.atlas('wall_2','assets/sprites/wall/wall2.png', 'assets/sprites/wall/wall.json');
       this.load.atlas('wall_3','assets/sprites/wall/wall3.png', 'assets/sprites/wall/wall.json');
       this.load.atlas('wall_4','assets/sprites/wall/wall4.png', 'assets/sprites/wall/wall.json');
       this.load.atlas('shipNextLvl','assets/sprites/shipNextLvl/shipNextLvl.png', 'assets/sprites/shipNextLvl/shipNextLvl.json');
       this.load.json('wall_JSON', 'assets/sprites/wall/wall.json');
       this.load.json('shipNextLvlJSON', 'assets/sprites/shipNextLvl/shipNextLvl.json');

        this.load.audio('click','assets/sounds/click.mp3');
        this.load.audio('die','assets/sounds/die.mp3');
        this.load.audio('gameOverScene','assets/sounds/gameOverScene.mp3');
        this.load.audio('nextLvlScene','assets/sounds/nextLvlScene.mp3');
        this.load.audio('startScene','assets/sounds/startScene.mp3');
        this.load.audio('shot','assets/sounds/shot.mp3');
        this.load.audio('shot2','assets/sounds/shot2.mp3');
        this.load.audio('ufo','assets/sounds/ufo.mp3');

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
        this.scene.start('StartScene');
    }

}