export default class MainMenu extends Phaser.State {

  create() {
    ui.changeState('MainMenu');
    let bkg = this.add.image(0, 0, 'bkg');
    let button = this.game.add.button(this.game.world.centerX, 300, 'NewGameButton',
                 this.newGame, this);
    button.anchor.setTo(0.5);

    let titleStyle = { font: 'bold 60pt Arial', fill: '#FDFFB5', align: 'center'};
    let text = this.add.text(this.game.world.centerX, 80, 'Apothecary', titleStyle);
    text.setShadow(3, 3, 'rgba(0,0,0,0.5)', 5);
    text.anchor.set(0.5);

  }

  newGame(){
    this.state.start('CharacterCreate');
  }
}
