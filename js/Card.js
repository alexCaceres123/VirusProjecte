/**
 * Class Card
 */
export default class Card {
  /**
   * Constructor
   * @param {String} tipus
   * @param {String} color
   * @param {int} number
   */
  constructor(tipus, color, number) {
    this.tipus = tipus;
    this.color = color;
    this.id = `${tipus}_${color}_${number}`;
  }
}
