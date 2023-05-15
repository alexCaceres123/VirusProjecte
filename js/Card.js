export default class Card {
    constructor(tipus, color, number) {
      this.tipus = tipus;
      this.color = color;
      this.id = `${tipus}_${color}_${number}`
    }
}