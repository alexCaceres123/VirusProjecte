export default class Game{
    constructor(deck, player1, player2, vista){
        this.deck = deck;
        this.player = player1;
        this.maquina = player2;
        this.vista = vista;
        this.allFunctions = {
            "startGame" : this.startGame.bind(this),
            "onPosarCarta" : this.onPosarCarta.bind(this),
            "addCartaTablero" : this.addCartaTablero.bind(this),
            "addNewCardDeckPlayer" : this.addNewCardDeckPlayer.bind(this)
        }
        this.eventListeners()
    }

    eventListeners(){
        this.vista.listenners(this.allFunctions);
    }

    startGame(){
        this.deck.createDeck();
        
        for(let i = 0; i < 3; i++){
            let card = this.deck.getCard();
            this.player.setCardsMaPlayer(card, i);
        }

        for(let i = 0; i < 3; i++){
            let card = this.deck.getCard();
            this.maquina.setCardsMaPlayer(card, i);
        }

        let maPlayer = this.player.getCardsMaPlayer();
        let maMaquina = this.maquina.getCardsMaPlayer();


        for(let i = 0; i < 3; i++){
            this.vista.addHandCardsPlayer(maPlayer[i], i,  this.allFunctions);
            this.vista.addHandCardsMaquina(maMaquina[i], i, this.allFunctions);
        }

        this.vista.disableButtonStartGame();
    }

    onPosarCarta(card){
    
        //Falta posar les condicions de on posar les cartes

        if(card.id != ""){
            let tipus = card.id.split("_")[0];
            let color = card.id.split("_")[1];
            let player = card.className.split(" ")[1];

            if(player == "playerCard"){
                this.vista.addClassDragOverContainersPlayer();
            }
            else if(player == "maquinaCard"){
                this.vista.addClassDragOverContainersMaquina();
            }
        }            
    }

    valAddCard(card, container, player){

    }

    addCartaTablero(card, container){
        if(card != ""){
            let nameContainer = container.className.split(" ")[2];

            if(nameContainer.split("C")[0] == "player"){
                this.player.setCardTauler(card, nameContainer);
                let numCartesContainer = this.player.getCardsTauler(nameContainer);
                return numCartesContainer.length;

            }else if(nameContainer.split("C")[0] == "maquina"){
                this.maquina.setCardTauler(card, nameContainer);
                let numCartesContainer = this.maquina.getCardsTauler(nameContainer);
                return numCartesContainer.length;

            }
        }
    }

    addNewCardDeckPlayer(player){
        let card = this.deck.getCard();

        if(player == "player"){

            let maPlayer = this.player.getCardsMaPlayer();
            for(let i = 0; i < maPlayer.length; i++){
                if(maPlayer[i] == ""){
                    this.player.setCardsMaPlayer(card, i)
                    this.vista.addHandCardsPlayer(card, i, this.allFunctions);
                }
            }

        }else if(player == "maquina"){

            let maPlayer = this.maquina.getCardsMaPlayer();
            for(let i = 0; i < maPlayer.length; i++){
                if(maPlayer[i] == ""){
                    this.maquina.setCardsMaPlayer(card, i)
                    this.vista.addHandCardsMaquina(card, i, this.allFunctions);
                }
            }
        }

        console.log(this.player.cardsTaulerPlayer);
        console.log(this.maquina.cardsTaulerPlayer);

    }
}