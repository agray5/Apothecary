/*
 * `assets` module
 * ===============
 *
 * Declares static asset packs to be loaded using the `Phaser.Loader#pack`
 * method. Use this module to declare game assets.
 */

//  -- Splash screen assets used by the Preloader.
export const preloaderAssets = [{
  key: 'splash-screen',
  type: 'image'
}, {
  key: 'progress-bar',
  type: 'image'
}];

//  -- General assets used throughout the game.
export const gameAssets = [{
  key: 'phaser',
  type: 'image'
},
{
  key: 'bkg',
  type: 'image'
},
{
  key: 'NewGameButton',
  type: 'image'
},
{
  key: 'wood',
  type: 'image',
},
{
  key: 'board',
  type: 'image',
   url: "board.jpg",
}];
