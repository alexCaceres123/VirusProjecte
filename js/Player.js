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

    setCardsMaPlayer(card, indx){
        this.cardsMaPlayer[indx] = card;
    }

    getCardsTauler(tauler){
        return this.cardsTaulerPlayer[tauler];
    }

    getAllCardsTauler(){
        return this.cardsTaulerPlayer;
    }

    getNameAllCardsTauler(){
        let alltaulersplayer = this.getAllCardsTauler();

        let names = [];

        for(let i = 0; i < Object.entries(alltaulersplayer).length; i++){
            names.push(Object.entries(alltaulersplayer)[i][0]);
        }

        return names;
    }

    setCardTauler(idcard, tauler){
        for(let i = 0; i < this.cardsMaPlayer.length; i++){
            if(this.cardsMaPlayer[i].id == idcard){
                this.cardsTaulerPlayer[tauler].push(this.cardsMaPlayer[i]);
                this.cardsMaPlayer[i] = "";
            }
        }
    }

    deleteCardMaPlayer(idCard){
        for(let i = 0; i < this.cardsMaPlayer.length; i++){
            if(this.cardsMaPlayer[i].id == idCard){
                this.cardsMaPlayer[i] = "";
            }
        }
    }
}