import Phaser from 'phaser'
import TitleScreen from './scenes/TitleScreen';
import EndGame from './scenes/EndGame'
import Game from './scenes/Game';
const config = {
    width: 800,
    height: 500,
    type: Phaser.AUTO,
    scene: [  TitleScreen, Game, EndGame  ],
    physics:{
        default: "arcade",
        arcade: {
            gravity: {y: 0},
         
        }
    }
}
const game = new Phaser.Game(config);

