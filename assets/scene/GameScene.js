class GameScene extends Phaser.Scene {
    constructor() {
        super('GameScene');

    }

    addScore(bug){
        switch (bug.texture.key) {
            case 'bug1':
                this.score+=10;
                break;
            case 'bug2':
                this.score+=20;;
                break;
            case 'bug3':
                this.score+=40;;
                break;
            case 'ufo':
                this.score+=this.randomInteger(100, 300);
                break;
        }
    }
    createScore(){
    this.scoreText = this.add.text( 550, 540, `Score: ${this.score}`, {fill: '#ffffff', font: '15px GameBoy'});
    }

    randomInteger(min, max) {
        let rand = min - 0.5 + Math.random() * (max - min + 1);
        return Math.round(rand);
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

    createPlayer(){
        this.player = new Player(this,this.cameras.main.centerX,510,'ship');
        this.physics.add.collider(this.player, this.platform);
    }
    createGroupFires(){
        this.groupFiresPlayer = new Fires(this,-400);
        this.groupFiresBugs = new Fires(this,200);
    }
    createGroupWall(){
        this.groupWall = new WallGroup(this);
        for (let i = 1; i<5;i++){
            this.groupWall.createAllWall(220 + i*100,450,'wall_1',1);
        }
    }
    createPlatform(){
        this.platform = this.physics.add.staticGroup();
        this.platform.create(this.cameras.main.centerX, 525,'platform').setDisplaySize(500,10).refreshBody();
    }
    createRoof(){
        this.roof = this.physics.add.staticGroup();
        this.roof.create(this.cameras.main.centerX, 135,'platform').setDisplaySize(500,10).refreshBody();
    }

    getBugConfig(){
        return {
            x:this.cameras.main.centerX -this.getSizeBgWidth()/4,
            y:this.cameras.main.centerY - this.getSizeBgHeight()/3.5,
            sprite:'bug'
        }
    }
    createEnemies(){
        this.groupBugs = new Bugs(this);
        this.groupBugs.createColumnBugs(this.getBugConfig());
        this.groupBugs.startMove();
    }
    createUfo(){
        this.ufo = new Bug(this, 725,150,"ufo");
        this.ufo.body.setGravityY(-400);
        this.physics.add.collider(this.ufo, this.roof);
        this.ufo.timeDelayed(-1);
        this.ufo.disableBody();

    }

    addOverlap(){
        this.physics.add.overlap(this.groupFiresPlayer,this.groupBugs,this.onOverlapBug,undefined,this);
        this.physics.add.overlap(this.groupFiresPlayer,this.groupWall ,this.onOverlapWall,undefined,this);
        this.physics.add.overlap(this.groupFiresPlayer, this.roof ,this.onOverlapPlatform,undefined,this);
        this.physics.add.overlap(this.groupFiresPlayer, this.ufo ,this.onOverlapUfo,undefined,this);


        this.physics.add.overlap(this.groupFiresBugs,this.groupWall ,this.onOverlapWall,undefined,this);
        this.physics.add.overlap(this.groupFiresBugs,this.player ,this.onOverlapPlayer,undefined,this);
        this.physics.add.overlap(this.groupFiresBugs,this.platform ,this.onOverlapPlatform,undefined,this);
    }
    onOverlapBug(bullet,bug){
        this.setActiveObj(bullet,false);
        this.addScore(bug);
        this.scoreText.setText(`Score: ${this.score}`);
        this.sounds.die.play();
        bug.anims.play('die');
        bug.on('animationcomplete', function () {
            this.setActiveObj(bug,false);
        },this);
    }
    onOverlapUfo(bug,bullet){

        this.setActiveObj(bullet,false);
        this.sounds.die.play();
        this.sounds.ufo.stop();
        this.addScore(bug);
         this.scoreText.setText(`Score: ${this.score}`);
        this.time.removeAllEvents();
        bug.timeDelayed(-1);
       bug.anims.play('dieUfo');
        bug.body.setVelocityX(0);

        bug.on('animationcomplete', function () {
            bug.disableBody();
            bug.setTexture('ufo',0)
            this.x=725;
        },bug);
    }
    onOverlapWall(bullet,wall){
        this.setActiveObj(bullet,false);
        if(wall.life < 4){
            wall.life++;
            wall.setTexture("wall_"+wall.life, wall.frame.name);
        }else {
            this.setActiveObj(wall,false);
        }
    }
    onOverlapPlayer(player,bullet){

        this.setActiveObj(bullet,false);
        player.body.enable = false;
        player.anims.play('dieShip');
        this.sounds.die.play();

        this.input.keyboard.off('keydown-SPACE');
        this.life--;
        if(this.life == -1){
            this.startGameOverScene();
            return;
        }
        player.lifeShip[this.life].setVisible(false);
        player.on('animationcomplete',player.reset,player);
    }
    onOverlapPlatform(bullet,wall){
        this.setActiveObj(bullet,false);
    }

    startGameOverScene(){
        this.scene.stop('GameScene');
        this.scene.start('GameOverScene',{score:this.score});
    }
    setActiveObj(obj,status){
        obj.body.enable = status;
        obj.setVisible(status);
        obj.setActive(status);
    }

    init(data){
        this.cursors = this.input.keyboard.createCursorKeys();
        this.score = data.score;
        this.life = data.life;
        this.lvlSpeed = data.lvlSpeed;
    }
    setAnimationDie(){
        this.anims.create({
            key: 'dieShip',
            frames: this.anims.generateFrameNumbers('ship', { start: 1, end: 2 }),
            repeat: 3,
            frameRate: 3,
        });
        this.anims.create({
            key: 'die',
            frames: this.anims.generateFrameNumbers('bug1', { start: 2, end: 3 }),
            repeat: 1,
            duration:100
        });
        this.anims.create({
            key: 'dieUfo',
            frames: this.anims.generateFrameNumbers('ufo', { start: 2, end: 3 }),
            repeat: 1,
            duration:80
        });
    }
    createSounds(){
        this.sounds = {
            shotPlayer:this.sound.add('shot2',{volume:0.1}),
            shotBug:this.sound.add('shot',{volume:0.1}),
            die:this.sound.add('die',{volume:0.1}),
            ufo:this.sound.add('ufo',{volume:0.1})
        }
    }

    create(){
        this.createRoof();
        this.createBackground();
        this.createPlatform();

        this.createEnemies();
        this.createUfo();

        this.createPlayer();

        this.createGroupFires();
        this.createGroupWall();
        this.addOverlap();

        this.setAnimationDie();
        this.createSounds();

        this.createScore();
    }
    update(){
        this.player.move();
        this.groupBugs.move();

    }

}