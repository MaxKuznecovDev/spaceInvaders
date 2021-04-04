class LoadBar {
    constructor(scene){
        this.scene = scene;
        this.progressBar = this.scene.add.graphics();
        this.setEvents();
    }

    setEvents(){
        this.scene.load.on('progress',this.showProgressBar,this)
    }
    showProgressBar(value){
            this.progressBar.fillStyle('0xFFFFFF').fillRect(250, this.scene.cameras.main.centerY,490*value,30);
    }
}