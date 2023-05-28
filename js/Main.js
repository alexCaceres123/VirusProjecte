import Deck from './Deck.js';
import Game from './Game.js';
import Player from './Player.js';
import Vista from './Vista.js';

const deck = new Deck();
const player = new Player('player');
const maquina = new Player('maquina');
const vista = new Vista();
new Game(deck, player, maquina, vista);
