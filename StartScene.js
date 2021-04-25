class StartScene extends Phaser.Scene {
    constructor() {
        super({key: 'StartScene'})
    }

    preload() {
        // Spritesheet animatie + muziekje laden
        this.load.spritesheet('beginAnimatie', 'images/Sprite StartScene 2.png', { frameWidth: 300.2, frameHeight: 300});
        this.load.audio('startAchtergrondGeluid', 'sounds/2019-01-10_-_Land_of_8_Bits_-_Stephen_Bennett_-_FesliyanStudios.com.mp3');
    }

    create() {
        // Muziekje laten loopen en afspelen
        gameState.startAchtergrondGeluid = this.sound.add('startAchtergrondGeluid', {
            mute: false,
            volume: 1,
            rate: 1,
            detune: 0,
            seek: 0,
            loop: true,
            delay: 0
        });
        gameState.startAchtergrondGeluid.play();

        // Fade effect toevoegen wanneer de scene wordt gestart (automatisch)
        this.cameras.main.fadeIn(1000, 0, 180, 216, false);

        // Blauwe achtergrond-gradient toevoegen
        const graphics = this.add.graphics();
        graphics.fillGradientStyle(0x00B4D8, 0x0096C7, 0x90E0EF, 0x00B4D8, 1);
        graphics.fillRect(0, 0, 900, 500);

        // De behaalde score resetten naar 0 (1/2)
        var score = 0;

        // X-coördinaat bepalen zodat de tekst kan centreren op de X-as
        const screenCenterX = this.cameras.main.worldView.x + this.cameras.main.width / 2;
        this.add.text(screenCenterX, 80, 'BLOK BREEK BAM!', {fill: '#000000', fontSize: '60px'}).setOrigin(0.5);
        this.add.text(screenCenterX, 135, 'Haal jij de topscore van 500?', {fill: '#FFFFFF', fontSize: '25px'}).setOrigin(0.5);
        this.add.text(screenCenterX, 450, 'Klik om verder te gaan', {fill: '#FFFFFF', fontSize: '20px'}).setOrigin(0.5);

        // Fade-effect starten wanneer wordt geklikt + naar InstructionScene gaan
        this.input.on('pointerdown', () => {
            
            // this.scene.stop('StartScene')
            // this.scene.start('InstructionScene')

            // Fade effect afspelen en InstructionScene laden
            this.cameras.main.fade(1000, 0, 180, 216, false,
                function(camera, progress) {
                    if (progress > .9){
                        // this.scene.stop('StartScene')
                        this.scene.start('InstructionScene')
                    }
                })
            
        }, null, this)

        // Sprite animatie laden van de bal die een blok raakt
        gameState.animatie = this.physics.add.sprite(screenCenterX, 300, 'beginAnimatie').setScale(.6);

        // Sprite animatie toevoegen
        this.anims.create({
            key: 'beginAnimatieStart',
            frames: this.anims.generateFrameNumbers('beginAnimatie', { start: 0, end: 5 }),
            frameRate: 4,
            repeat: -1
        })
    }

    update() {
        // De behaalde score resetten naar 0 (2/2)
        score = 0;
        // Sprite animatie van de bal die een blok raakt starten
        gameState.animatie.anims.play('beginAnimatieStart', true)
    }

}
