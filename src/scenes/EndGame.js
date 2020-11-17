import Phaser from 'phaser';
import loser from '../img/loser.jpg'
import winner from '../img/win.jpg'
export default class EndGame extends Phaser.Scene{
    constructor (){
        super('EndGame');
    }
    init(data){
        this.image = data.img;

    }
    preload(){
        if(this.image === 'winner')
        this.load.image('winner', winner);
        else if(this.image === 'loser')
        this.load.image('loser', loser);
    }
    create(){
        this.cameras.main.fadeIn(1000, 0, 0, 0)
        this.add.image(400,300, this.image)
        var playAgain = this.add.text(280, 100, 'Play again', {fontSize: 40, align: "center" }).setInteractive()
        playAgain.on('pointerover', function (event) {
    
            this.setTint(0xA9A9A9);
    
        });
        playAgain.on('pointerout', function (event) {
    
            this.clearTint();
    
        });
        playAgain.on('pointerdown', function(event) {
           this.scene.start('TitleScreen')
        }, this)

    }

}