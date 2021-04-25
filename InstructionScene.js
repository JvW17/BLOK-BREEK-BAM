class InstructionScene extends Phaser.Scene {
    constructor() {
        super({key: 'InstructionScene'})
    }

    preload() {
        // Sprite animatie laden van de pijltjestoetsen + kort start geluidje laden
        this.load.spritesheet('instructieAnimatie', 'images/instructies 2.png', { frameWidth: 309.75, frameHeight: 203});
        this.load.audio('kortStartGeluid', 'sounds/334284__projectsu012__whirring.wav');
    }

    create() {
        // Kort start geluidje toevoegen
        gameState.kortStartGeluid = this.sound.add('kortStartGeluid');

        // Fade effect toevoegen wanneer de scene wordt gestart (automatisch)
        this.cameras.main.fadeIn(500, 0, 180, 216, false);

        // Blauwe achtergrond-gradient toevoegen
        const graphics = this.add.graphics();
        graphics.fillGradientStyle(0x00B4D8, 0x0096C7, 0x90E0EF, 0x00B4D8, 1);
        graphics.fillRect(0, 0, 900, 500);

        // De behaalde score resetten naar 0 (1/2)
        var score = 0;

        // X-coördinaat (en Y-coördinaat) bepalen zodat de tekst kan centreren op de X-as
        const screenCenterX = this.cameras.main.worldView.x + this.cameras.main.width / 2;
        // const screenCenterY = this.cameras.main.worldView.y + this.cameras.main.height / 2;
        this.add.text(screenCenterX, 100, 'Instructies', {fill: '#FFFFFF', fontSize: '40px'}).setOrigin(0.5);
        this.add.text(screenCenterX, 400, 'Klik om te starten', {fill: '#FFFFFF', fontSize: '30px'}).setOrigin(0.5);

        // this.input.on('pointerdown', () => {
        //     this.scene.stop('InstructionScene')
        //     this.scene.start('GameScene')
        // })

        // Kort start geluidje afspelen + fade-effect starten wanneer wordt geklikt + naar GameScene gaan
        this.input.on('pointerdown', () => {
            gameState.kortStartGeluid.play();

            // Fade effect afspelen en GameScene laden
            gameState.startAchtergrondGeluid.stop();
            this.cameras.main.fade(1000, 255, 255, 255, false,
                function(camera, progress) {
                    if (progress > .9){
                        // this.scene.stop('InstructionScene')
                        this.scene.start('GameScene')
                    }
                })
            
        }, null, this)

        // Sprite animatie laden van de pijltjestoetsen
        gameState.animatie = this.physics.add.sprite(screenCenterX, 250, 'instructieAnimatie').setScale(.8);

        // Sprite animatie toevoegen
        this.anims.create({
            key: 'instructies',
            frames: this.anims.generateFrameNumbers('instructieAnimatie', { start: 0, end: 4 }),
            frameRate: 3,
            repeat: -1
        })
    }

    update() {
        // De behaalde score resetten naar 0 (2/2)
        score = 0;
        // Sprite animatie van de pijltjestoetsen starten
        gameState.animatie.anims.play('instructies', true)
    }

}
