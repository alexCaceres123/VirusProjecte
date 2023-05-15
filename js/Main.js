import Deck from "./Deck.js";
import Game from "./Game.js";
import Player from "./Player.js";
import Vista from "./Vista.js";

let deck = new Deck();
let player = new Player("player");
let maquina = new Player("maquina");
let vista = new Vista();
let game = new Game(deck, player, maquina, vista);