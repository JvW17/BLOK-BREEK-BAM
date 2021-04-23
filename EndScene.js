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
        const graphics = this.add.graphics();
        graphics.fillGradientStyle(0xBF82FD, 0xFF71C0, 0x5AAEFD, 0xBF82FD, 1);
        graphics.fillRect(0, 0, 900, 500);

        const eindScore = score;

        gameState.einde = this.sound.add('eindGeluid', {volume: 2});
        gameState.einde.play();

        const screenCenterX = this.cameras.main.worldView.x + this.cameras.main.width / 2;

        if(eindScore >= 500){
            this.add.text(screenCenterX, 80, 'Wow, wat goed!', {fill: '#FFFFFF', fontSize: '40px'}).setOrigin(0.5);
            this.add.text(screenCenterX, 170, 'Wat een topscore! Het is tijd voor een feestje.', {fill: '#FFFFFF', fontSize: '20px'}).setOrigin(0.5);

            gameState.eindAnimatieDisco = this.physics.add.sprite(screenCenterX, 315, 'eindAnimatieDisco').setScale(.5);

            this.anims.create({
                key: 'eindAnimatieDiscoStart',
                frames: this.anims.generateFrameNumbers('eindAnimatieDisco', { start: 0, end: 3 }),
                frameRate: 3,
                repeat: -1
            })

            gameState.eindAnimatieDisco.anims.play('eindAnimatieDiscoStart', true);
            
        }
        else if(eindScore < 500) {
            this.add.text(screenCenterX, 80, 'Goed gespeeld!', {fill: '#FFFFFF', fontSize: '40px'}).setOrigin(0.5);
            this.add.text(screenCenterX, 170, 'Je hebt bijna de topscore van 500 gehaald.', {fill: '#FFFFFF', fontSize: '20px'}).setOrigin(0.5);

            gameState.eindAnimatie = this.physics.add.sprite(screenCenterX, 315, 'eindAnimatie').setScale(.5);

            this.anims.create({
                key: 'eindAnimatieStart',
                frames: this.anims.generateFrameNumbers('eindAnimatie', { start: 0, end: 1 }),
                frameRate: 1.5,
                repeat: -1
            })

            gameState.eindAnimatie.anims.play('eindAnimatieStart', true);

        }
        
        // this.add.text(275, 150, 'Goed gespeeld!', {fill: '#FFFFFF', fontSize: '40px'});
        this.add.text(screenCenterX, 135, `Jouw score: ${eindScore}`, { fontSize: '20px', fill: '#FFFFFF' }).setOrigin(0.5);
        this.add.text(screenCenterX, 450, 'Klik om opnieuw te spelen', { fontSize: '20px', fill: '#000000' }).setOrigin(0.5);
        // this.input.on('pointerdown', () => {
        //     this.scene.stop('EndScene')
        //     this.scene.start('GameScene')
        //     gameState.einde.stop();
        // })
        this.input.on('pointerdown', () => {
            gameState.kortStartGeluid.play();
            
            // this.scene.stop('StartScene')
            // this.scene.start('InstructionScene')
            gameState.einde.stop();

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
        score = 0;
    }

}