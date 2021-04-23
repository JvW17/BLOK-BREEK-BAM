var score = 0;
var scoreText;

function aantalBlokken() {
    const totaleAantalBlokken = gameState.blokken.getChildren().length;
    return totaleAantalBlokken;
}

class GameScene extends Phaser.Scene {
    constructor() {
        super({key: 'GameScene'})
    }


    preload() {
        // Sprites en spritesheet toevoegen
        this.load.image('bal', 'images/Pong bal 1.png');
        this.load.image('balkLinks', 'images/Pong balk links 2.png');
        this.load.image('balkCheat', 'images/Pong cheat balk 3.png');
        this.load.image('balkRood', 'images/balk geel.png');
        this.load.image('powerUp1', 'images/powerUp1 versie 2.png');
        this.load.image('powerUp2', 'images/powerUp2 versie 2.png');
        this.load.image('powerUp3', 'images/powerUp3 versie 2.png');
        this.load.image('powerUp4', 'images/powerUp4 versie 2.png');
        this.load.spritesheet('discoBal', 'images/SpriteBal 1.png', { frameWidth: 100, frameHeight: 96});
        this.load.image('strandbal', 'images/strandbal.png');
        // this.load.image('balkRechts', 'images/Pong balk rechts.png');

        // Geluiden laden
        this.load.audio('hit1', 'sounds/hit1.wav');
        this.load.audio('hit2', 'sounds/hit2.wav');
        this.load.audio('powerUpGeraakt', 'sounds/powerUp.wav');
        this.load.audio('achtergrondGeluid', 'sounds/2019-01-02_-_8_Bit_Menu_-_David_Renda_-_FesliyanStudios.com.mp3');
        this.load.audio('foutmelding', 'sounds/445978__breviceps__error-signal-2.wav');
    }


    create() {

        const graphics = this.add.graphics();
        graphics.fillGradientStyle(0x00B4D8, 0x0096C7, 0x90E0EF, 0x00B4D8, 1);
        graphics.fillRect(0, 0, 900, 500);
        
        // gameState.active = true;
        
        // geluiden toevoegen
        gameState.blokGeluid = this.sound.add('hit1');
        gameState.groeneBalkGeluid = this.sound.add('hit2');
        gameState.powerUpGeraakt = this.sound.add('powerUpGeraakt');
        gameState.foutmelding = this.sound.add('foutmelding');
        gameState.achtergrondGeluid = this.sound.add('achtergrondGeluid', {
            mute: false,
            volume: 1,
            rate: 1,
            detune: 0,
            seek: 0,
            loop: true,
            delay: 0
        });
        gameState.achtergrondGeluid.play();

          // De afbeeldingen van de bal, balk en blokken toevoegen in het spel.
        gameState.bal = this.physics.add.sprite(200, 250, 'bal').setScale(.1);
        // gameState.bal = {
        //   frames: [{
      
        //   }]
        // };
        gameState.balk = this.physics.add.sprite(60, 250, 'balkLinks').setScale(.1);
        gameState.balkBlauw = this.physics.add.sprite(0, 250, 'balkCheat').setScale(.05, .6);
        // gameState.balkRechts = this.add.sprite(840, 80, 'balkRechts').setScale(.1);
        gameState.cursors = this.input.keyboard.createCursorKeys();
        

        // De powerups laten verschijnen
        gameState.allePowerUps1 = this.physics.add.group();
        gameState.allePowerUps2 = this.physics.add.group();
        gameState.allePowerUps3 = this.physics.add.group();
        gameState.allePowerUps4 = this.physics.add.group();
        // gameState.allePowerUps5 = this.physics.add.group();
        
        var powerUp1;
        var powerUp2;
        var powerUp3;
        var powerUp4;
        var powerUpDisco;
        function powerUpsPlaatsen() {
            const yCoord1 = Math.random() * 460 + 20;
            const yCoord2 = Math.random() * 460 + 20;
            const yCoord3 = Math.random() * 460 + 20;
            const yCoord4 = Math.random() * 460 + 20;
            powerUp1 = gameState.allePowerUps1.create(520, yCoord1, 'powerUp1').setScale(.1);
            powerUp2 = gameState.allePowerUps2.create(600, yCoord2, 'powerUp2').setScale(.1);
            powerUp3 = gameState.allePowerUps3.create(760, yCoord3, 'powerUp3').setScale(.1);
            powerUp4 = gameState.allePowerUps4.create(840, yCoord4, 'powerUp4').setScale(.1);
        }

        const xCoordDisco = Math.random() * 860 + 20;
        const yCoordDisco = Math.random() * 460 + 20;
        gameState.allePowerUps5 = this.physics.add.sprite(xCoordDisco, yCoordDisco, 'discoBal').setScale(.17);
        this.anims.create({
            key: 'tijdVoorDisco',
            frames: this.anims.generateFrameNumbers('discoBal', { start: 0, end: 7 }),
            frameRate: 4,
            repeat: -1
          });

        gameState.allePowerUps5.anims.play('tijdVoorDisco', true);

        const powerUpsLoop = this.time.addEvent({
            callback: powerUpsPlaatsen,
            callbackScope: this,
            loop: false,
        });

        this.physics.add.overlap(gameState.bal, gameState.allePowerUps1, (witteBal, powerUp) => {
            witteBal.setBounce(1, 1);
            gameState.powerUpGeraakt.play();
            powerUp.destroy();
            gameState.balk.setScale(.05);
        });

        this.physics.add.overlap(gameState.bal, gameState.allePowerUps2, (witteBal, powerUp) => {
            witteBal.setBounce(1, 1);
            gameState.powerUpGeraakt.play();
            powerUp.destroy();
            gameState.bal.setScale(.2);
        });

        this.physics.add.overlap(gameState.bal, gameState.allePowerUps3, (witteBal, powerUp) => {
            witteBal.setBounce(1, 1);
            gameState.powerUpGeraakt.play();
            powerUp.destroy();
            gameState.balk.setScale(.15);
        });

        this.physics.add.overlap(gameState.bal, gameState.allePowerUps4, (witteBal, powerUp) => {
            witteBal.setBounce(1, 1);
            gameState.powerUpGeraakt.play();
            powerUp.destroy();
            gameState.bal.body.velocity.setTo(400);
        });

        this.physics.add.overlap(gameState.bal, gameState.allePowerUps5, (witteBal, powerUp) => {
            witteBal.setBounce(1, 1);
            gameState.powerUpGeraakt.play();
            gameState.allePowerUps5.anims.pause();
            powerUp.destroy();
            // Deze moet nog (2/2)

            gameState.particles = this.add.particles('strandbal');
            gameState.emitter = gameState.particles.createEmitter({
                x: {min: 0, max: 900},
                y: -100,
                lifespan: 2000,
                speedX: {min: -5, max: -200},
                speedY: {min: 200, max: 400},
                scale: {start: 0.2, end: 0},
                quantity: 1,
                length: 1000
            })
        });


        // De rode blokken toevoegen die de bal moet raken      
        gameState.blokken = this.physics.add.group();
        var blok;
        for(var yVal = 1; yVal < 11; yVal++) {
          for(var xVal = 1; xVal < 6; xVal++){   
            blok = gameState.blokken.create(400 + (80 * xVal), -25 + (50 * yVal), 'balkRood').setScale(.12);
            blok.enableBody = true;
            blok.body.bounce.set(1);
            blok.body.immovable = true;
            blok.setCollideWorldBounds(true);
          }
        }
      
        // function blokkenSorteren() {
        //   const ordenenMetXCoord = gameState.blokken.getChildren().sort((a, b) => a.x - b.x);
        //   return ordenenMetXCoord;
        // }
      
        function totaleNummerBlokken() {
          const blokTotaal = gameState.blokken.getChildren().length;
          return blokTotaal;    
        }
      
    
        // Ervoor zorgen dat de bal en balk niet uit het spel kunnen 'vallen'.
        gameState.bal.setCollideWorldBounds(true);
        gameState.balk.setCollideWorldBounds(true);
        gameState.balkBlauw.setCollideWorldBounds(true);
        
        gameState.bal.setBounce(1, 1);
        gameState.balk.body.immovable = true;  
        gameState.balkBlauw.body.immovable = true;
        gameState.bal.body.velocity.setTo(300, 200);
        // gameState.bal.body.velocity.setTo(300, 0);

        
        // var snelheidX = 300;
        // var snelheidY = 200;
        // gameState.bal.body.velocity.setTo(snelheidX, snelheidY);

        // for(snelheidX = 300; snelheidX < 500; snelheidX++) {
        //     for(snelheidY = 200; snelheidY < 300; snelheidY++){
        //         snelheidX += 10;
        //         snelheidY += 10;
        //     }
        // }

        // function snelheidBalVerhogen() {
        //     setTimeout(function(){ gameState.bal.body.velocity.setTo(800, 700); }, 3000);
        // }; 

        // function snelheidBalVerhogen() {
        //     setTimeout(function(){ gameState.bal.body.velocity.setTo(800, 700); }, 3000);
        // }; 
        
        // snelheidBalVerhogen();

        // let scoreText = this.add.text(55, 30, `score: ${score}`, { fontSize: '15px', fill: '#34fd54' });
        let scoreText = this.add.text(55, 30, `score: ${score}`, { fontSize: '15px' });
        this.physics.add.collider(gameState.bal, gameState.blokken, (witteBal, blokken) => {
            witteBal.setBounce(1, 1);
            gameState.blokGeluid.play();
            blokken.destroy();
            score += 10;
            scoreText.setText(`score: ${score}`);
            scoreText.setTint(0xFFFFFF);
        });

        this.cameras.main.setBounds(0, 0, gameState.width, gameState.height);


        this.physics.add.collider(gameState.bal, gameState.balkBlauw, () => {
            score -= 10;
            scoreText.setText(`score: ${score}`);
            scoreText.setTint(0x000000);
            gameState.foutmelding.play();

            this.cameras.main.shake(200, .01);

        });
      
    }


    update() {

        this.physics.add.collider(gameState.bal, gameState.balk, () => {
            // gameState.balk.destroy();
            // this.physics.pause();
            // this.add.text(230, 120, 'Game over', {fill: '#FFFFFF', fontSize: '40px'});
            // this.add.text(150, 270, 'Klik om opnieuw te spelen', { fontSize: '20px', fill: '#FFFFFF' });
            // this.scene.stop('GameScene')
            // this.scene.start('EndScene')
            gameState.groeneBalkGeluid.play();
            if(gameState.emitter){
                gameState.emitter.stop();
            }
        });

        // this.physics.add.collider(gameState.bal, gameState.balkBlauw, () => {
        //     // gameState.balk.destroy();
        //     // this.physics.pause();
        //     // this.add.text(230, 120, 'Game over', {fill: '#FFFFFF', fontSize: '40px'});
        //     // this.add.text(152, 270, 'Klik om opnieuw te spelen', { fontSize: '20px', fill: '#FFFFFF' });
        //     // this.scene.stop('GameScene')
        //     // this.scene.start('EndScene')
        //     // scoreText.setText(`score: ${score}`, { fontSize: '15px', fill: '#FF0000' });
        //     // scoreText.addColor('#FF0000, 0');
        //     // gameState.groeneBalkGeluid.play();
        // });
    
        // this.physics.add.collider(gameState.bal, gameState.balkBlauw, function(){
        // gameState.active = false;
        // // this.endGame();
        // });


        this.physics.add.collider(gameState.balkBlauw, gameState.balk);
    
        // Balk laten bewegen van boven naar beneden en andersom.
        function balkBewegen() {
        if(gameState.cursors.up.isDown) {
            gameState.balk.y -= 3;
        }
        else if(gameState.cursors.down.isDown) {
            gameState.balk.y += 3;
        }
        else{
            gameState.balk.y += 0;
        }
        };
        
        balkBewegen();
    
        if(aantalBlokken() === 0) {
            gameState.achtergrondGeluid.stop();
            this.scene.stop('GameScene');
            this.scene.start('EndScene');
        }
        
    
    }


}