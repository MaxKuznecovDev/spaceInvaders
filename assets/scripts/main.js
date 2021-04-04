import Phaser from "phaser";
let config = {
    type:Phaser.AUTO,
    width:1000,
    height:710,
   scene: [BootScene,PreloadScene,StartScene, GameScene,GameOverScene,NextLvlScene],
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 200 },
            enableBody: true,
        }
    }
};


let game = new Phaser.Game(config);
