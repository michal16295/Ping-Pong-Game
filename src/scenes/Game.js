import Phaser from 'phaser';
import board from '../img/board.png'
import ping from '../music/ping.mp3'


export default class Game extends Phaser.Scene{
    constructor(){
        super('Game')
    }
    init(data){
        this.aiSpeed = data.aiSpeed;
        this.ballSpeed = data.ballSpeed;
        this.paddleRightVelocity = new Phaser.Math.Vector2(0, 0);
        this.rightScore = 0;
        this.leftScore = 0;

    }
    preload(){
        this.load.image("board", board);
        this.load.audio('pingSound', ping);
        
    }
    create(){
        this.add.image(400,300, 'board')
        this.music = this.sound.add('pingSound')
        this.physics.world.setBounds(-100,0 ,1000, 500)
        this.ball = this.add.circle(400, 250, 10, 0xffffff, 1);
        this.physics.add.existing(this.ball);
        this.ball.body.setBounce(1,1);
        this.ball.body.setCollideWorldBounds(true, 1, 1)
        this.resetBall();

        this.paddleLeft = this.add.rectangle(0, 250, 30, 100, 0xffffff, 1)
        this.physics.add.existing(this.paddleLeft, true);

        

        this.paddleRight = this.add.rectangle(800, 250, 30, 100, 0xffffff, 1)
        this.physics.add.existing(this.paddleRight, true);

        this.physics.add.collider(this.paddleRight, this.ball, null, () => {
            this.music.play();
        });
        this.physics.add.collider(this.paddleLeft, this.ball, null, () => {
            this.music.play();
        });
       
        this.cursors = this.input.keyboard.createCursorKeys()

        this.scoreRightText = this.add.text(16, 16, 'score: 0', { fontSize: '32px', fill: '#000' });
        this.scoreLeftText = this.add.text(610, 450, 'score: 0', { fontSize: '32px', fill: '#000' });

    }
    update(){

        this.gamePads()
        this.computerPaddle()
        this.score();

    }
    resetBall(){
 
        this.ballSpeed += 50;
        this.aiSpeed += 1;
        this.ball.setPosition(400, 250)
        const angle = Phaser.Math.Between(0, 360);
        const vec = this.physics.velocityFromAngle(angle, this.ballSpeed);
        this.ball.body.setVelocity(vec.x, vec.y);
    }
    computerPaddle(){
        if(this.ball.x >= 400){
            const diff = this.ball.y - this.paddleRight.y;
            if(Math.abs(diff) < 10) return;
            if(diff < 0){
                this.paddleRightVelocity.y = -this.aiSpeed;
                if(this.paddleRightVelocity.y < -10) this.paddleRightVelocity.y = -10;
                
            }
            else if(diff > 0){
                this.paddleRightVelocity.y = this.aiSpeed;
                if(this.paddleRightVelocity.y > 10) this.paddleRightVelocity.y = 10;
                
            }
            this.paddleRight.y += this.paddleRightVelocity.y
            this.paddleRight.body.updateFromGameObject();
        }

    }
    gamePads(){
        if(this.cursors.up.isDown){
            this.paddleLeft.y -= 10;
            this.paddleLeft.body.updateFromGameObject();
        }
        else if(this.cursors.down.isDown){
            this.paddleLeft.y += 10;
            this.paddleLeft.body.updateFromGameObject();
        }
        else if(this.cursors.right.isDown){
            if(this.paddleLeft.x <= 370){
                this.paddleLeft.x += 10;
                this.paddleLeft.body.updateFromGameObject();
            }
        }
        else if(this.cursors.left.isDown){
            if(this.paddleLeft.x >= 10){
                this.paddleLeft.x -= 10;
                this.paddleLeft.body.updateFromGameObject();
            }
        }

    }
    score(){
        if(this.rightScore >= 10){
            // the player won
            this.scene.start('EndGame', {img: 'winner'})
            
        }
        else if(this.leftScore >= 10){
            // the player lost
            this.scene.start('EndGame', {img: 'loser'})
        }
        if(this.ball.x < -30){
            this.leftScore += 1;
            this.scoreLeftText.setText('Score: ' + this.leftScore);
            this.resetBall();
        }
        else if(this.ball.x > 830){
            this.rightScore += 1;
            this.scoreRightText.setText('Score: ' + this.rightScore);
            this.resetBall();
        }
    }
}