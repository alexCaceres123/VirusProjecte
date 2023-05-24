export default class Player{
    constructor(name){
        this.cardsMaPlayer = [];
        this.name = name;
        this.cardsTaulerPlayer = this.createTaulersObject();
        this.taulersImonitzats = [];
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

    setCardTauler(card, tauler){
        let indx = this.getNumCartesTauler(tauler);
        this.cardsTaulerPlayer[tauler][indx] = card;
    }

    deleteCardMaPlayer(idCard){
        for(let i = 0; i < this.cardsMaPlayer.length; i++){
            if(this.cardsMaPlayer[i].id == idCard){
                this.cardsMaPlayer[i] = "";
            }
        }
    }

    deleteCardsTablero(nameContainer, card){

        for(let i = 0; i < this.cardsTaulerPlayer[nameContainer].length; i++){
            if(card.id == this.cardsTaulerPlayer[nameContainer][i].id){
                this.cardsTaulerPlayer[nameContainer][i] = "";
            }
        }
    }

    deleteAllCardsTablero(nameContainer){

        for(let i = 0; i < this.cardsTaulerPlayer[nameContainer].length; i++){
            this.cardsTaulerPlayer[nameContainer][i] = "";
        }

    }

    getCardXId(idCard){
        for(let i = 0; i < this.cardsMaPlayer.length; i++){
            if(this.cardsMaPlayer[i].id == idCard){
                return this.cardsMaPlayer[i]
            }
        }
    }

    getNumCartesTauler(nameContainer){
        let num = 0;

        for(let i = 0; i < this.cardsTaulerPlayer[nameContainer].length; i++){
            
            if(this.cardsTaulerPlayer[nameContainer][i] != ""){
                num++;
            }
    
        }

        return num;
    }

    addTaulerImonitzat(container){
        this.taulersImonitzats.push(container);
    }

    getTaulersInmonitzats(){
        return this.taulersImonitzats;
    }

}