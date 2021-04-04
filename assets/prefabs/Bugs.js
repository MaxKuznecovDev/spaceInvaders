class Bugs extends Phaser.Physics.Arcade.Group {
    constructor(scene){
        super(scene.physics.world, scene);
        this.scene = scene;
        this.down = 0;
    }
    createBug(bug){
        this.defaults.setGravityY = -200;
        this.add(new Bug(this.scene, bug.x,bug.y,bug.sprite));
    }

    createRowBugs(bug){
        for (let row = 0; row < 11 ; row++) {
            this.createBug(bug);
            bug.x+=35;
        }
    }

    createColumnBugs(bug){
        const bugX = bug.x;
        for (let i = 3; i > 0 ; i--, bug.y+=30){
            bug.x=bugX;
            bug.sprite = 'bug' + i;
            this.createRowBugs(bug);
            bug.x=bugX;
            bug.y+=30;
            this.createRowBugs(bug);

        }
    }

    setDirectionOnRight(dir){
        this.directionOnRight = dir;
    }
    startMove(){
        this.setDirectionOnRight(true);
        this.setCurrentSpeed();
    }
    setCurrentSpeed(){
        let groupBugsSize = this.getTotalUsed();
        let currentSpeed = (groupBugsSize < 10) ? 60 :
            (groupBugsSize < 20) ?  50 :
                (groupBugsSize < 30) ? 40 :
                    (groupBugsSize < 40) ? 30:
                        (groupBugsSize < 50) ? 20:10 ;
        currentSpeed += this.scene.lvlSpeed;
       this.directionOnRight ? this.setVelocityX(currentSpeed): this.setVelocityX(-currentSpeed);
    }
    getMaxRandomNumber(){
        let groupBugsSize = this.getTotalUsed();
        let maxNumb = (groupBugsSize < 10) ? 250 :
            (groupBugsSize < 20) ?  500 :
                (groupBugsSize < 30) ? 1000 :
                    (groupBugsSize < 40) ? 1500 :
                        (groupBugsSize < 50) ? 2000:2500 ;
        return maxNumb;
    }

    doFire(bug){
        let fire = {
            x:bug.x,
            y:bug.y,
            sprite:'bugBullet'
        }
        let rendNumb = this.scene.randomInteger(0,this.getMaxRandomNumber());
        if(rendNumb == 5){
            this.scene.sounds.shotBug.play();
            this.scene.groupFiresBugs.createFire(fire);
        }

    }

    startNextLvl(){
        if( this.getTotalUsed() == 0){
            if(this.scene.life < 3){
                this.scene.life++;
            }
            this.scene.lvlSpeed += 10;
            this.scene.scene.stop('GameScene');
            this.scene.scene.start('NextLvlScene',{
                score:this.scene.score,
                life: this.scene.life,
                lvlSpeed:this.scene.lvlSpeed
            });
        }
    }

    move(){
        this.startNextLvl();
        this.setCurrentSpeed();

        let groupBugs = this;
        this.children.entries.every(function (bug) {
            if (bug.active){
                if(bug.y > 430){
                    groupBugs.scene.startGameOverScene();
                   return false
                }
                groupBugs.doFire(bug);
                if (bug.x >= 740) {
                    if(groupBugs.down == 0) {
                        groupBugs.incY(10);
                        groupBugs.setDirectionOnRight(false);
                        groupBugs.down = 1;
                    }

                }
                else if (bug.x <= 250) {
                    if(groupBugs.down == 1) {
                        groupBugs.incY(10);
                        groupBugs.setDirectionOnRight(true);
                        groupBugs.down = 0;
                    }

                }
            }
            return true
        })
    }

}