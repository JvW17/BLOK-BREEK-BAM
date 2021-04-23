const gameState = {}

const config = {
  type: Phaser.AUTO,
  width: 900,
  height: 500,
  // backgroundColor: 0x477DFB,
  // backgroundColor: 0x000000,

  physics: {
    default: 'arcade',
    arcade: {
      // gravity: { x: -200 },
      enableBody: true,
    }
  },
  
  scene: [StartScene, InstructionScene, GameScene, EndScene]
}

const game = new Phaser.Game(config)
