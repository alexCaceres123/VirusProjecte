import Card from "./Card.js";

export default class Deck {
    constructor() {
      this.cards =[];
    }

    createDeck(){
        let tipus = ["organ", "medicina", "virus"];
        let colors = ["blau", "vermell", "groc", "verd"];

        let indexMulticolor = 1;

        for(let tipo of tipus){
            for(let color of colors){
                let cartaMulticolor = new Card(tipo, "mcolor", indexMulticolor);
                indexMulticolor++;
                this.cards.push(cartaMulticolor);
                for(let i = 1; i <= 4; i++){
                    let carta = new Card(tipo, color, i);
                    this.cards.push(carta);
                }
            }
        }
    }

    getCard(){
        const CartRandomNumber=Math.floor(Math.random()*this.cards.length-1)+1;
        const carta = this.cards[CartRandomNumber];
        this.pop(CartRandomNumber);
        return carta;
    }

    setCard(card){
        this.cards.push(card);
    }

    pop(indxCard) {
        this.cards.splice(indxCard, 1);
    }

    createCard(tipus, color, id){
        let card = new Card(tipus, color, id)
        return card;
    }
}