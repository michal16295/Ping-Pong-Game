import Phaser from 'phaser';
import easyButton from '../img/easy.png'
import hardButton from '../img/hard.png'
import backGround from '../img/PING-PONG.png'
export default class TitleScreen extends Phaser.Scene{
    constructor (){
        super('TitleScreen');
    }
    preload(){
        this.load.image('background', backGround);
        this.load.image("easyBtn", easyButton);
        this.load.image("hardBtn", hardButton);
    }
    create(){
        this.cameras.main.fadeIn(1000, 0, 0, 0)
        this.add.image(400,300, 'background')
        var easy = this.add.sprite(350, 320, 'easyBtn').setInteractive();
        var hard = this.add.sprite(460, 320, 'hardBtn').setInteractive();

        hard.on('pointerover', function (event) {
    
            this.setTint(0xA9A9A9);
    
        });
        hard.on('pointerout', function (event) {
    
            this.clearTint();
    
        });
        hard.on('pointerdown', function(event) {
           this.scene.start('Game', {aiSpeed:5, ballSpeed: 550})
        }, this)

        easy.on('pointerover', function (event) {
    
            this.setTint(0xA9A9A9);
    
        });
    
        easy.on('pointerout', function (event) {
    
            this.clearTint();
    
        });
        easy.on('pointerdown', function(event) {
            this.scene.start('Game', {aiSpeed:2, ballSpeed: 200})
         }, this)
    }

}