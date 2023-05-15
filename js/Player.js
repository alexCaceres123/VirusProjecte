export default class Player{
    constructor(name){
        this.cardsMaPlayer = [];
        this.name = name;
        this.cardsTaulerPlayer = this.createTaulersObject();
    }

    createTaulersObject(){
        let allContainers = {};

        for(let i = 1; i <= 4; i++){
            allContainers[`${this.name}cardsContainer${i}`] = [];
        }
        return allContainers;
    }

    getCardsMaPlayer(){
        return this.cardsMaPlayer;
    }

    setCardsMaPlayer(card){
        this.cardsMaPlayer.push(card);
    }

    getCardsTauler(tauler){
        return this.cardsTaulerPlayer[tauler];
    }

    setCardTauler(card, tauler){
        this.cardsTaulerPlayer[tauler].push(card);
    }
}