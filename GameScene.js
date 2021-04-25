// score variabele aanmaken die automatisch op 0 staat + variabele toevoegen die de TEKST met daarin de score bevat
var score = 0;
var scoreText;

// functie aanmaken die telt hoeveel rechthoekige blokken er (nog) aanwezig zijn
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

        // Geluiden laden
        this.load.audio('hit1', 'sounds/hit1.wav');
        this.load.audio('hit2', 'sounds/hit2.wav');
        this.load.audio('powerUpGeraakt', 'sounds/powerUp.wav');
        this.load.audio('achtergrondGeluid', 'sounds/2019-01-02_-_8_Bit_Menu_-_David_Renda_-_FesliyanStudios.com.mp3');
        this.load.audio('foutmelding', 'sounds/445978__breviceps__error-signal-2.wav');
    }


    create() {
        // Blauwe achtergrond-gradient toevoegen 
        const graphics = this.add.graphics();
        graphics.fillGradientStyle(0x00B4D8, 0x0096C7, 0x90E0EF, 0x00B4D8, 1);
        graphics.fillRect(0, 0, 900, 500);
        
        
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

        // De afbeeldingen toevoegen
        gameState.bal = this.physics.add.sprite(200, 250, 'bal').setScale(.1);
        gameState.balk = this.physics.add.sprite(60, 250, 'balkLinks').setScale(.1);
        gameState.balkBlauw = this.physics.add.sprite(0, 250, 'balkCheat').setScale(.05, .6);
        gameState.cursors = this.input.keyboard.createCursorKeys();
        

        // De powerups toevoegen als groep
        gameState.allePowerUps1 = this.physics.add.group();
        gameState.allePowerUps2 = this.physics.add.group();
        gameState.allePowerUps3 = this.physics.add.group();
        gameState.allePowerUps4 = this.physics.add.group();
        
        // Variabelen maken van alle powerups
        var powerUp1;
        var powerUp2;
        var powerUp3;
        var powerUp4;
        var powerUpDisco;
        // Functie maken vier (van de vijf) powerups een unieke Y-coördinaat geeft EN plaatst in de game
        function powerUpsPlaatsen() {
            const yCoord1 = Math.random() * 460 + 20;
            const yCoord2 = Math.random() * 460 + 20;
            const yCoord3 = Math.random() * 460 + 20;
            const yCoord4 = Math.random() * 460 + 20;
            // Posities van vier (van de vijf) powerups bepalen
            powerUp1 = gameState.allePowerUps1.create(520, yCoord1, 'powerUp1').setScale(.1);
            powerUp2 = gameState.allePowerUps2.create(600, yCoord2, 'powerUp2').setScale(.1);
            powerUp3 = gameState.allePowerUps3.create(760, yCoord3, 'powerUp3').setScale(.1);
            powerUp4 = gameState.allePowerUps4.create(840, yCoord4, 'powerUp4').setScale(.1);
        }


        // X- en Y-coördinaat van de speciale disco powerup bepalen
        const xCoordDisco = Math.random() * 860 + 20;
        const yCoordDisco = Math.random() * 460 + 20;

        // Positie van de disco powerup bepalen 
        gameState.allePowerUps5 = this.physics.add.sprite(xCoordDisco, yCoordDisco, 'discoBal').setScale(.17);

        // Disco powerup animeren
        this.anims.create({
            key: 'tijdVoorDisco',
            frames: this.anims.generateFrameNumbers('discoBal', { start: 0, end: 7 }),
            frameRate: 4,
            repeat: -1
          });

        // Disco powerup animatie starten
        gameState.allePowerUps5.anims.play('tijdVoorDisco', true);


        // Constante variabele aanmaken die ÉÉN KEER de powerups plaatst in de game
        const powerUpsLoop = this.time.addEvent({
            callback: powerUpsPlaatsen,
            callbackScope: this,
            loop: false,
        });


        // Overlap toevoegen die een bepaalde actie uitvoert wanneer de bal en powerup 1 elkaar raken + powerup laten verdwijnen
        this.physics.add.overlap(gameState.bal, gameState.allePowerUps1, (witteBal, powerUp) => {
            witteBal.setBounce(1, 1);
            gameState.powerUpGeraakt.play();
            powerUp.destroy();
            // De balk krimpt
            gameState.balk.setScale(.05);
        });

        // Overlap toevoegen die een bepaalde actie uitvoert wanneer de bal en powerup 2 elkaar raken + powerup laten verdwijnen
        this.physics.add.overlap(gameState.bal, gameState.allePowerUps2, (witteBal, powerUp) => {
            witteBal.setBounce(1, 1);
            gameState.powerUpGeraakt.play();
            powerUp.destroy();
            // De bal groeit
            gameState.bal.setScale(.2);
        });

        // Overlap toevoegen die een bepaalde actie uitvoert wanneer de bal en powerup 3 elkaar raken + powerup laten verdwijnen
        this.physics.add.overlap(gameState.bal, gameState.allePowerUps3, (witteBal, powerUp) => {
            witteBal.setBounce(1, 1);
            gameState.powerUpGeraakt.play();
            powerUp.destroy();
            // De balk groeit
            gameState.balk.setScale(.15);
        });

        // Overlap toevoegen die een bepaalde actie uitvoert wanneer de bal en powerup 4 elkaar raken + powerup laten verdwijnen
        this.physics.add.overlap(gameState.bal, gameState.allePowerUps4, (witteBal, powerUp) => {
            witteBal.setBounce(1, 1);
            gameState.powerUpGeraakt.play();
            powerUp.destroy();
            // De snelheid van de bal neemt toe
            gameState.bal.body.velocity.setTo(400);
        });

        // Overlap toevoegen die een bepaalde actie uitvoert wanneer de bal en de disco powerup elkaar raken + powerup laten verdwijnen
        this.physics.add.overlap(gameState.bal, gameState.allePowerUps5, (witteBal, powerUp) => {
            witteBal.setBounce(1, 1);
            gameState.powerUpGeraakt.play();
            gameState.allePowerUps5.anims.pause();
            powerUp.destroy();

            // Particle emitter starten van de strandbal sprite
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


        // Daadwerkelijk de rechthoekige blokken toevoegen die de bal moet raken EN deze rechts in het spel positioneren   
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
      
        // Functie toevoegen die update hoeveel rechthoekige blokken er nog over zijn
        function totaleNummerBlokken() {
          const blokTotaal = gameState.blokken.getChildren().length;
          return blokTotaal;    
        }
      
    
        // Ervoor zorgen dat de bal en twee linkerbalken niet uit het spel kunnen 'vallen'.
        gameState.bal.setCollideWorldBounds(true);
        gameState.balk.setCollideWorldBounds(true);
        gameState.balkBlauw.setCollideWorldBounds(true);
        
        // Snelheid en bounce aan de bal toevoegen + nog iets...
        gameState.bal.body.velocity.setTo(300, 200);
        gameState.bal.setBounce(1, 1);
        gameState.balk.body.immovable = true;  
        gameState.balkBlauw.body.immovable = true;

        // Daadwerkelijk de scoretekst toevoegen met de gegevens die eerder zijn aangemaakt en opgehaald
        let scoreText = this.add.text(55, 30, `score: ${score}`, { fontSize: '15px' });

        // Collider toevoegen die een bepaalde actie uitvoert wanneer de bal en een rechthoekig blok elkaar raken
        this.physics.add.collider(gameState.bal, gameState.blokken, (witteBal, blokken) => {
            witteBal.setBounce(1, 1);
            gameState.blokGeluid.play();
            // Geraakt rechthoekig blok verwijderen
            blokken.destroy();
            // Score toevoegen met 10 EN de scoretekst updaten EN deze een andere kleur geven
            score += 10;
            scoreText.setText(`score: ${score}`);
            scoreText.setTint(0xFFFFFF);
        });

        // Camera toevoegen (maar of dit iets doet? ...)
        this.cameras.main.setBounds(0, 0, gameState.width, gameState.height);

        // Collider toevoegen die een bepaalde actie uitvoert wanneer de bal en de grote linkerbalk elkaar raken
        this.physics.add.collider(gameState.bal, gameState.balkBlauw, () => {
            // Score verlagen met 10 EN de scoretekst updaten EN deze een andere kleur geven
            score -= 10;
            scoreText.setText(`score: ${score}`);
            scoreText.setTint(0x000000);
            // Geluidje afspelen
            gameState.foutmelding.play();

            // Shake effect toevoegen
            this.cameras.main.shake(200, .01);

        });
      
    }


    update() {

        // Collider toevoegen die een bepaalde actie uitvoert wanneer de bal en de linkerbalk elkaar raken
        this.physics.add.collider(gameState.bal, gameState.balk, () => {
            // Geluidje afspelen
            gameState.groeneBalkGeluid.play();
            // Particle emitter stoppen WANNEER deze true is
            if(gameState.emitter){
                gameState.emitter.stop();
            }
        });

        // Collider toevoegen die ervoor zorgt dat de grote linkerbalk en de andere linkerbalk niet door elkaar heen kunnen 'vallen'
        this.physics.add.collider(gameState.balkBlauw, gameState.balk);
    
        // Linkerbalk  van boven naar beneden laten bewegen en andersom wanneer de pijltjestoetsen zijn ingedrukt.
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
        
        // De functie starten die ervoor zorgt dat de linkerbalk bewogen kan worden
        balkBewegen();
    
        // GameScene stoppen en de EndScene starten wanneer alle rechthoekige blokken kapot zijn
        if(aantalBlokken() === 0) {
            gameState.achtergrondGeluid.stop();
            this.scene.stop('GameScene');
            this.scene.start('EndScene');
        }
        
    
    }


}