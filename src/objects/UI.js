/*
 * `UI` module
 * ============
 *
 * Game UI is state based.
 * For most states in the game there is a corresponding state.
 * Whenever a state the start of every state must call UI.changeState();
 * If a state does not have a UIstate it will default to a blank UI.
 */

import { el, mount, setChildren } from 'redom';
import * as states from './UIComponents';

// Creates interface for game UI
class UI {
  constructor(state = "MainMenu"){
    this.state = {};
    //Create overlay for ui
    this.root = el('#gameOverlay', 'Hello');
    mount(document.body, this.root);

    //Add UIComponents to list of components
    Object
      .entries(states)
      .forEach(([key, state]) => this.state[key] = state);
    console.log(this.state);
  }

  changeState(stateName) {
    //Clear root
    setChildren(this.root, []);

    //stateName = null can be used to clear UI
    if (stateName != null)
      //Mount new state
      mount(this.root, new this.state[stateName]);
  }

}

export default UI
