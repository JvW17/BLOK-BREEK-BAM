class InstructionScene extends Phaser.Scene {
    constructor() {
        super({key: 'InstructionScene'})
    }

    preload() {
        this.load.spritesheet('instructieAnimatie', 'images/instructies 2.png', { frameWidth: 309.75, frameHeight: 203});
        this.load.audio('kortStartGeluid', 'sounds/334284__projectsu012__whirring.wav');
    }

    create() {
        gameState.kortStartGeluid = this.sound.add('kortStartGeluid');

        this.cameras.main.fadeIn(500, 0, 180, 216, false);

        const graphics = this.add.graphics();
        graphics.fillGradientStyle(0x00B4D8, 0x0096C7, 0x90E0EF, 0x00B4D8, 1);
        graphics.fillRect(0, 0, 900, 500);

        var score = 0;

        const screenCenterX = this.cameras.main.worldView.x + this.cameras.main.width / 2;
        // const screenCenterY = this.cameras.main.worldView.y + this.cameras.main.height / 2;
        this.add.text(screenCenterX, 100, 'Instructies', {fill: '#FFFFFF', fontSize: '40px'}).setOrigin(0.5);
        this.add.text(screenCenterX, 400, 'Klik om te starten', {fill: '#FFFFFF', fontSize: '30px'}).setOrigin(0.5);

        // this.input.on('pointerdown', () => {
        //     this.scene.stop('InstructionScene')
        //     this.scene.start('GameScene')
        // })

        this.input.on('pointerdown', () => {
            gameState.kortStartGeluid.play();

            gameState.startAchtergrondGeluid.stop();
            this.cameras.main.fade(1000, 255, 255, 255, false,
                function(camera, progress) {
                    if (progress > .9){
                        // this.scene.stop('InstructionScene')
                        this.scene.start('GameScene')
                    }
                })
            
        }, null, this)

        gameState.animatie = this.physics.add.sprite(screenCenterX, 250, 'instructieAnimatie').setScale(.8);

        this.anims.create({
            key: 'instructies',
            frames: this.anims.generateFrameNumbers('instructieAnimatie', { start: 0, end: 4 }),
            frameRate: 3,
            repeat: -1
        })
    }

    update() {
        score = 0;
        gameState.animatie.anims.play('instructies', true)
    }

}
