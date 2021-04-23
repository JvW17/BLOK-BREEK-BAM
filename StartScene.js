class StartScene extends Phaser.Scene {
    constructor() {
        super({key: 'StartScene'})
    }

    preload() {
        this.load.spritesheet('beginAnimatie', 'images/Sprite StartScene 2.png', { frameWidth: 300.2, frameHeight: 300});
        this.load.audio('startAchtergrondGeluid', 'sounds/2019-01-10_-_Land_of_8_Bits_-_Stephen_Bennett_-_FesliyanStudios.com.mp3');
    }

    create() {
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

        this.cameras.main.fadeIn(1000, 0, 180, 216, false);

        const graphics = this.add.graphics();
        graphics.fillGradientStyle(0x00B4D8, 0x0096C7, 0x90E0EF, 0x00B4D8, 1);
        graphics.fillRect(0, 0, 900, 500);

        var score = 0;

        const screenCenterX = this.cameras.main.worldView.x + this.cameras.main.width / 2;

        this.add.text(screenCenterX, 80, 'BLOK BREEK BAM!', {fill: '#000000', fontSize: '60px'}).setOrigin(0.5);
        this.add.text(screenCenterX, 135, 'Haal jij de topscore van 500?', {fill: '#FFFFFF', fontSize: '25px'}).setOrigin(0.5);
        this.add.text(screenCenterX, 450, 'Klik om verder te gaan', {fill: '#FFFFFF', fontSize: '20px'}).setOrigin(0.5);
        this.input.on('pointerdown', () => {
            
            // this.scene.stop('StartScene')
            // this.scene.start('InstructionScene')

            this.cameras.main.fade(1000, 0, 180, 216, false,
                function(camera, progress) {
                    if (progress > .9){
                        // this.scene.stop('StartScene')
                        this.scene.start('InstructionScene')
                    }
                })
            
        }, null, this)

        gameState.animatie = this.physics.add.sprite(screenCenterX, 300, 'beginAnimatie').setScale(.6);

        this.anims.create({
            key: 'beginAnimatieStart',
            frames: this.anims.generateFrameNumbers('beginAnimatie', { start: 0, end: 5 }),
            frameRate: 4,
            repeat: -1
        })
    }

    update() {
        score = 0;
        gameState.animatie.anims.play('beginAnimatieStart', true)
    }

}
