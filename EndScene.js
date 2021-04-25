class EndScene extends Phaser.Scene {
    constructor() {
        super({key: 'EndScene'})
    }

    preload() {
        // Geluiden toevoegen
        this.load.audio('eindGeluid', 'sounds/eindGeluid.wav');
        this.load.audio('kortStartGeluid', 'sounds/334284__projectsu012__whirring.wav');

        // animatie toevoegen
        this.load.spritesheet('eindAnimatie', 'images/EndScene animatie.png', { frameWidth: 350.5, frameHeight: 301});
        this.load.spritesheet('eindAnimatieDisco', 'images/EndScene animatie disco.png', { frameWidth: 350.25, frameHeight: 301});
    }

    create() {
        // Paarse achtergrond-gradient toevoegen
        const graphics = this.add.graphics();
        graphics.fillGradientStyle(0xBF82FD, 0xFF71C0, 0x5AAEFD, 0xBF82FD, 1);
        graphics.fillRect(0, 0, 900, 500);

        // Muziekje afspelen + volume aanpassen
        gameState.einde = this.sound.add('eindGeluid', {volume: 2});
        gameState.einde.play();

        // X-coördinaat bepalen zodat de tekst kan centreren op de X-as
        const screenCenterX = this.cameras.main.worldView.x + this.cameras.main.width / 2;

        // Constante variabele maken van de behaalde eindscore in GameScene
        const eindScore = score;

        // Bijbehorende tekst en sprite toevoegen als de score gelijk of groter is aan 500
        if(eindScore >= 500){
            this.add.text(screenCenterX, 80, 'Wow, wat goed!', {fill: '#FFFFFF', fontSize: '40px'}).setOrigin(0.5);
            this.add.text(screenCenterX, 170, 'Wat een topscore! Het is tijd voor een feestje.', {fill: '#FFFFFF', fontSize: '20px'}).setOrigin(0.5);

            // Disco animatie laden
            gameState.eindAnimatieDisco = this.physics.add.sprite(screenCenterX, 315, 'eindAnimatieDisco').setScale(.5);

            // Disco animatie toevoegen
            this.anims.create({
                key: 'eindAnimatieDiscoStart',
                frames: this.anims.generateFrameNumbers('eindAnimatieDisco', { start: 0, end: 3 }),
                frameRate: 3,
                repeat: -1
            })

            // Disco animatie starten
            gameState.eindAnimatieDisco.anims.play('eindAnimatieDiscoStart', true);
            
        }
        // Bijbehorende tekst en sprite toevoegen als de score kleiner is dan 500
        else if(eindScore < 500) {
            this.add.text(screenCenterX, 80, 'Goed gespeeld!', {fill: '#FFFFFF', fontSize: '40px'}).setOrigin(0.5);
            this.add.text(screenCenterX, 170, 'Je hebt bijna de topscore van 500 gehaald.', {fill: '#FFFFFF', fontSize: '20px'}).setOrigin(0.5);

            // Blij/neutraal animatie laden
            gameState.eindAnimatie = this.physics.add.sprite(screenCenterX, 315, 'eindAnimatie').setScale(.5);

            // Blij/neutraal animatie toevoegen
            this.anims.create({
                key: 'eindAnimatieStart',
                frames: this.anims.generateFrameNumbers('eindAnimatie', { start: 0, end: 1 }),
                frameRate: 1.5,
                repeat: -1
            })

            // Blij/neutraal animatie starten
            gameState.eindAnimatie.anims.play('eindAnimatieStart', true);

        }
        
        // Tekst tonen dat altijd in beeld is, ongeacht de behaalde score
        this.add.text(screenCenterX, 135, `Jouw score: ${eindScore}`, { fontSize: '20px', fill: '#FFFFFF' }).setOrigin(0.5);
        this.add.text(screenCenterX, 450, 'Klik om opnieuw te spelen', { fontSize: '20px', fill: '#000000' }).setOrigin(0.5);

        // Muziekje stoppen wanneer is geklikt + GameScene starten
        this.input.on('pointerdown', () => {
            // Kort start geluidje afspelen + muziekje stoppen
            gameState.kortStartGeluid.play();
            gameState.einde.stop();

            // Fade effect afspelen en GameScene laden
            this.cameras.main.fade(1000, 0, 180, 216, false,
                function(camera, progress) {
                    if (progress > .9){
                        this.scene.stop('EndScene')
                        this.scene.start('GameScene')
                    }
                })
            
        }, null, this)

    }
    

    update() {
        // De behaalde score resetten naar 0 (1/1)
        score = 0;
    }

}