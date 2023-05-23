export default class Game{
    constructor(deck, player1, player2, vista){
        this.deck = deck;
        this.players = [player1, player2];
        this.vista = vista;
        this.torn = 1;
        this.allFunctions = {
            "startGame" : this.startGame.bind(this),
            "onPosarCarta" : this.onPosarCarta.bind(this),
            "addCartaTablero" : this.addCartaTablero.bind(this),
            "addNewCardDeckPlayer" : this.addNewCardDeckPlayer.bind(this),
            "trashCard" : this.trashCard.bind(this),
            "changeTorn" : this.changeTorn.bind(this),
            "getTorn" : this.getTorn.bind(this)
        }
        this.eventListeners()
    }

    eventListeners(){
        this.vista.listenners(this.allFunctions);
    }

    changeTorn(){
        let ma = this.players[this.torn].getCardsMaPlayer();
        this.vista.changeTornView(this.torn, ma);

        if(this.torn == 0){
            this.torn = 1;
        }else if(this.torn == 1){
            this.torn = 0;
        }

    }

    getTorn(){
        return this.torn;
    }

    startGame(){
        this.deck.createDeck();

        for(let i = 0; i < 3; i++){
            let card = this.deck.getCard();
            this.players[0].setCardsMaPlayer(card, i);
            this.vista.addHandCards(card, i, this.allFunctions, 0);
        }
        
        for(let i = 0; i < 3; i++){
            let card = this.deck.getCard();
            this.players[1].setCardsMaPlayer(card, i);
            this.vista.addHandCards(card, i, this.allFunctions, 1);
        }

        this.changeTorn();
        this.vista.disableButtonStartGame();
    }

    onPosarCarta(card){
    
        //Falta posar les condicions de on posar les cartes

        let tipus = card.id.split("_")[0];
        let color = card.id.split("_")[1];        
        let torn = this.torn;
        
        
        // let nameAllTaulersPlayer = this.pl.getNameAllCardsTauler();
        // let nameAllTaulersMaquina = this.maquina.getNameAllCardsTauler();
        // let nameAllTaulers = nameAllTaulersPlayer.concat(nameAllTaulersMaquina);
        // let containersPlayerCards = this.player.getAllCardsTauler();
        // let containersMaquinaCards = this.maquina.getAllCardsTauler();

        //AQUI ES POSARAN EL NOM DELS CONTENIDORS QUE PINTARAN AL POSAR EL MOUSE SOBRE LA CARTA

        let paintContainers = [];

        // if(tipus == "organ"){
            
        // }
        
        this.vista.addClassDragOverContainers(paintContainers);
        this.vista.addClassDragOverContainers(paintContainers);

    }
    
    addCartaTablero(card, container){
        if(card != ""){
            let nameContainer = container.className.split(" ")[2];
            let torn = this.torn;
            let numCartesContainer = [];

            let cartaReal = []

            //AQUI ES TREU LA CARTA DEL JUGADOR A TRAVÉS DEL TORN JA QUE SI ALGU TIRA UNA CARTA SABRE QUI ES PER EL TORN
            
            cartaReal = this.players[this.torn].getCardXId(card);
            this.players[this.torn].deleteCardMaPlayer(card);

            //AFEGEIXO LA CARTAREAL AL CONTENIDOR INDICAT
            
            //if(x.indexOf(nameContainer.split("C")[0]) !== -1) afegir carta;


            this.players[this.torn].setCardTauler(cartaReal, nameContainer)
            numCartesContainer = this.players[this.torn].getCardsTauler(nameContainer);

            //RETURN PER SABER ON POSAR LA CARTA A LA VISTA

            return numCartesContainer.length;

        }
    }

    addNewCardDeckPlayer(){
        let card = this.deck.getCard();

        let ma = this.players[this.torn].getCardsMaPlayer();
        for(let i = 0; i < ma.length; i++){
            if(ma[i] == ""){
                this.players[this.torn].setCardsMaPlayer(card, i)                    
                this.vista.addHandCards(card, i, this.allFunctions, this.torn);
            }
        }

    }

    trashCard(idCard){

        let tipus = idCard.split("_")[0];
        let color = idCard.split("_")[1];
        let number = idCard.split("_")[2];
        let card = this.deck.createCard(tipus, color, number)
        this.deck.setCard(card);
        
        this.players[this.torn].deleteCardMaPlayer(card.id)

        this.addNewCardDeckPlayer();
    }

}