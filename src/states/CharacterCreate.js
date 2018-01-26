
export default class CharacterCreate extends Phaser.State {

  preload() {
  }

  create() {
    //Set background
    let bkg = this.game.add.tileSprite(0, 0,  window.innerWidth, window.innerHeight, 'wood');

    //Set Text background and center
    /*
    let board = this.game.add.image(window.innerWidth/2, window.innerHeight/2, 'board');
    board.height =  window.innerHeight * .80;
    board.width =  window.innerWidth * .80;
    board.anchor.setTo(0.5);
    */


    //boad.add

  }

}
