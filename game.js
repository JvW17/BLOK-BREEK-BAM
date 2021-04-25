const gameState = {}

const config = {
  type: Phaser.AUTO,
  width: 900,
  height: 500,

  physics: {
    default: 'arcade',
    arcade: {
      enableBody: true,
    }
  },
  
  scene: [StartScene, InstructionScene, GameScene, EndScene]
}

const game = new Phaser.Game(config)
