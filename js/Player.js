/**
 * Classe Player
 */
export default class Player {
  /**
   * Constructor Player
   * @param {String} name
   */
  constructor(name) {
    this.cardsMaPlayer = [];
    this.name = name;
    this.cardsTaulerPlayer = this.createTaulersObject();
    this.taulersImonitzats = [];
  }
  /**
   * Funció que crea el objecte cardsTaulerPlayer
   * @return {[]}
   */
  createTaulersObject() {
    const allContainers = {};

    for (let i = 1; i <= 4; i++) {
      allContainers[`${this.name}CardsContainer${i}`] = [];
    }
    return allContainers;
  }
  /**
   * Funció que retorna la ma del jugador
   * @return {this.cardsMaPlayer}
   */
  getCardsMaPlayer() {
    return this.cardsMaPlayer;
  }
  /**
   * Fucnió que posa una carta a la ma del jugador
   * @param {card} card
   * @param {int} indx
   */
  setCardsMaPlayer(card, indx) {
    this.cardsMaPlayer[indx] = card;
  }
  /**
   * Funció que retorna les cartes del tauler seleccionat
   * @param {String} tauler
   * @return {[]}
   */
  getCardsTauler(tauler) {
    return this.cardsTaulerPlayer[tauler];
  }
  /**
   * Funció que retorna totes les cartes de cada tauler en un objecte
   * @return {{}}
   */
  getAllCardsTauler() {
    return this.cardsTaulerPlayer;
  }
  /**
   * Funció que retorna els noms de tots els contenidors en una Array
   * @return {[]}
   */
  getNameAllCardsTauler() {
    const alltaulersplayer = this.getAllCardsTauler();

    const names = [];

    for (let i = 0; i < Object.entries(alltaulersplayer).length; i++) {
      names.push(Object.entries(alltaulersplayer)[i][0]);
    }

    return names;
  }
  /**
   * Funcio que posa una carta al tauler seleccionat
   * @param {card} card
   * @param {String} tauler
   */
  setCardTauler(card, tauler) {
    const indx = this.getNumCartesTauler(tauler);
    this.cardsTaulerPlayer[tauler][indx] = card;
  }
  /**
   * Funció que borra una carta de la ma del jugador
   * @param {String} idCard
   */
  deleteCardMaPlayer(idCard) {
    for (let i = 0; i < this.cardsMaPlayer.length; i++) {
      if (this.cardsMaPlayer[i].id == idCard) {
        this.cardsMaPlayer[i] = '';
      }
    }
  }
  /**
   * Funció que borra la carta del tauler seleccionat
   * @param {String} nameContainer
   * @param {card} card
   */
  deleteCardsTablero(nameContainer, card) {
    for (let i = 0; i < this.cardsTaulerPlayer[nameContainer].length; i++) {
      if (card.id == this.cardsTaulerPlayer[nameContainer][i].id) {
        this.cardsTaulerPlayer[nameContainer][i] = '';
      }
    }
  }
  /**
   * Funció que borra totes les cartes del tauler seleccionat
   * @param {String} nameContainer
   */
  deleteAllCardsTablero(nameContainer) {
    for (let i = 0; i < this.cardsTaulerPlayer[nameContainer].length; i++) {
      this.cardsTaulerPlayer[nameContainer][i] = '';
    }
  }
  /**
   * Funció que retorna la carta tipus Card a traves de la id
   * @param {String} idCard
   * @return {[]}
   */
  getCardXId(idCard) {
    for (let i = 0; i < this.cardsMaPlayer.length; i++) {
      if (this.cardsMaPlayer[i].id == idCard) {
        return this.cardsMaPlayer[i];
      }
    }
  }
  /**
   * Funcio que retorna el numero de cartes del contenidor seleccionat
   * @param {String} nameContainer
   * @return {int}
   */
  getNumCartesTauler(nameContainer) {
    let num = 0;

    for (let i = 0; i < this.cardsTaulerPlayer[nameContainer].length; i++) {
      if (this.cardsTaulerPlayer[nameContainer][i] != '') {
        num++;
      }
    }

    return num;
  }
  /**
   * Funció que posa a taulersInomintzat el contenidor seleccionat
   * @param {String} container
   */
  addTaulerImonitzat(container) {
    this.taulersImonitzats.push(container);
  }
  /**
   * Funció que retorna els taulers inmunes
   * @return {[]}
   */
  getTaulersInmonitzats() {
    return this.taulersImonitzats;
  }
}
