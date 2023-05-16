export default class Player{
    constructor(name){
        this.cardsMaPlayer = [];
        this.name = name;
        this.cardsTaulerPlayer = this.createTaulersObject();
    }

    createTaulersObject(){
        let allContainers = {};

        for(let i = 1; i <= 4; i++){
            allContainers[`${this.name}CardsContainer${i}`] = [];
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

    setCardTauler(idcard, tauler){

        for(let i = 0; i < this.cardsMaPlayer.length; i++){
            if(this.cardsMaPlayer[i].id == idcard){
                this.cardsTaulerPlayer[tauler].push(this.cardsMaPlayer[i]);
                this.cardsMaPlayer.splice(i, 1);
            }
        }

        console.log(this.cardsTaulerPlayer[tauler]);
        console.log(this.cardsMaPlayer);
    }
}