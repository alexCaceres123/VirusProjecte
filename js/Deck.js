import Card from './Card.js';
/**
 * Classe Deck
 */
export default class Deck {
  /**
   * Constructor
   */
  constructor() {
    this.cards =[];
  }
  /**
   * Funcio que crea la deck
   */
  createDeck() {
    const tipus = ['organ', 'medicina', 'virus'];
    const colors = ['blau', 'vermell', 'groc', 'verd'];

    let indexMulticolor = 1;

    for (const tipo of tipus) {
      for (const color of colors) {
        const cartaMulticolor = new Card(tipo, 'mcolor', indexMulticolor);
        indexMulticolor++;
        this.cards.push(cartaMulticolor);
        for (let i = 1; i <= 4; i++) {
          const carta = new Card(tipo, color, i);
          this.cards.push(carta);
        }
      }
    }
  }
  /**
   * Funció que retorn una carta
   * @return {Card}
   */
  getCard() {
    const CartRandomNumber=Math.floor(Math.random()*this.cards.length-1)+1;
    const carta = this.cards[CartRandomNumber];
    this.pop(CartRandomNumber);
    return carta;
  }
  /**
   * Funció que afegeix una carta a deck
   * @param {Card} card
   */
  setCard(card) {
    this.cards.push(card);
  }
  /**
   * Funció que elimina una carta de deck
   * @param {int} indxCard
   */
  pop(indxCard) {
    this.cards.splice(indxCard, 1);
  }
  /**
   * Funció que crea una carta
   * @param {String} tipus
   * @param {String} color
   * @param {int} id
   * @return {Card}
   */
  createCard(tipus, color, id) {
    return new Card(tipus, color, id);
  }
}
