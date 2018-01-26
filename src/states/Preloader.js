/*
 * Preloader state
 * ===============
 *
 * Takes care of loading the main game assets, including graphics and sound
 * effects, while displaying a busy splash screen.
 */

import {gameAssets} from '../assets';
//let FontFaceObserver = require('fontfaceobserver');

import UI from '../objects/UI'

export default class Preloader extends Phaser.State {

  preload() {
    //this.game.load = new CustomLoader(this.game);
    this.showSplashScreen();
    this.game.load.pack('gameAssets', null, {gameAssets});
    //this.game.load.webfont('fancy', 'Amatica SC');

    //init UI
    ui = new UI();
  }

  create() {
    //  Here is a good place to initialize plugins dependent of any game asset.
    //  Don't forget to `import` them first. Example:
    // this.game.myPlugin = this.plugins.add(MyPlugin/*, ... parameters ... */);

    this.state.start('MainMenu');
  }

  // --------------------------------------------------------------------------

  showSplashScreen() {
    this.add.image(0, 0, 'splash-screen');
    this.load.setPreloadSprite(this.add.image(82, 282, 'progress-bar'));
  }

}

// We create our own custom loader class extending Phaser.Loader.
// This new loader will support web fonts
function CustomLoader(game) {
  Phaser.Loader.call(this, game);
}

CustomLoader.prototype = Object.create(Phaser.Loader.prototype);
CustomLoader.prototype.constructor = CustomLoader;

// new method to load web fonts
// this follows the structure of all of the file assets loading methods
CustomLoader.prototype.webfont = function (key, fontName, overwrite) {
  if (typeof overwrite === 'undefined') { overwrite = false; }

  // here fontName will be stored in file's `url` property
  // after being added to the file list
  this.addToFileList('webfont', key, fontName);
  return this;
};

CustomLoader.prototype.loadFile = function (file) {
  Phaser.Loader.prototype.loadFile.call(this, file);

  // we need to call asyncComplete once the file has loaded
  if (file.type === 'webfont') {
      var _this = this;
      // note: file.url contains font name
      var font = new FontFaceObserver(file.url);
      font.load(null, 10000).then(function () {
        _this.asyncComplete(file);
      }, function ()  {
        _this.asyncComplete(file, 'Error loading font ' + file.url);
      });
    }
};
