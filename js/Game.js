/**
 * Classe Game
 */
export default class Game {
  /**
   * Constructor
   * @param {Deck} deck
   * @param {Player} player1
   * @param {Player} player2
   * @param {Vista} vista
   */
  constructor(deck, player1, player2, vista) {
    this.deck = deck;
    this.players = [player1, player2];
    this.vista = vista;
    this.torn = 1;
    this.allFunctions = {
      'startGame': this.startGame.bind(this),
      'onPosarCarta': this.onPosarCarta.bind(this),
      'addCartaTablero': this.addCartaTablero.bind(this),
      'addNewCardDeckPlayer': this.addNewCardDeckPlayer.bind(this),
      'trashCard': this.trashCard.bind(this),
      'changeTorn': this.changeTorn.bind(this),
      'getTorn': this.getTorn.bind(this),
      'checkWinnerGame': this.checkWinnerGame.bind(this),
      'modeJugador': this.modeJugador.bind(this),
    };
    this.eventListeners();
    this.changeValTorn = 0;
    this.gameMode = '';
  }

  /**
   * Funcio encarregada de inicialitzar els addEventListeners de vista
   */
  eventListeners() {
    this.vista.listenners(this.allFunctions);
  }
  /**
   * Funció per posar el game mode del joc
   * @param {String} mode
   */
  modeJugador(mode) {
    this.gameMode = mode;
    this.vista.disableAlert();
  }
  /**
   * Funció encarregada de cambiar el torn i fer jugar la maquina si el game mode es maquina
   */
  changeTorn() {
    this.changeValTorn = 0;
    this.vista.changeTornView(this.torn);

    if (this.torn == 0) {
      this.torn = 1;

      if (this.gameMode == 'maquina') {
        this.maquinaPlays();
      }
    } else if (this.torn == 1) {
      this.torn = 0;
    }
  }
  /**
   * Funció encarregada de fer jugar la maquina automaticament
   */
  maquinaPlays() {
    const cartesMaquina = this.players[1].getCardsMaPlayer();

    const possibleContainers = [];

    for (let i = 0; i < 3; i++) {
      const cartId = cartesMaquina[i].id;
      const containers = this.onPosarCarta(cartId, false, 'maquina');

      const CartRandomNumber=Math.floor(Math.random()*containers.length-1)+1;
      const containerName = containers[CartRandomNumber];
      possibleContainers.push([cartId, containerName]);
    }

    // Trec les possibilitats Undefined
    const realPossibilities = [];

    for (let i = 0; i < possibleContainers.length; i++) {
      if (possibleContainers[i][1] != undefined) {
        realPossibilities.push(possibleContainers[i]);
      }
    }

    if (realPossibilities.length != 0) {
      const random = Math.floor(Math.random()*realPossibilities.length-1)+1;
      const pushContainer = realPossibilities[random];
      console.log(pushContainer);
      const posCard = this.automaticAddCartaTablero(pushContainer[0], pushContainer[1]);
      this.vista.automaticAddCardMaquina(pushContainer[0], pushContainer[1], posCard);

      const winner = this.checkWinnerGame();

      if (winner == false) {
        this.addNewCardDeckPlayer();
      } else {
        this.vista.finishGame(winner);
      }
    } else {
      for (let i = 0; i < 3; i++) {
        console.log(cartesMaquina[i].id);
        this.automaticTrashCard(cartesMaquina[i].id);
      }

      for (let i = 0; i < 3; i++) {
        const card = this.deck.getCard();
        this.players[1].setCardsMaPlayer(card, i);
        this.vista.addHandCards(card, i, this.allFunctions, 1, this.gameMode);
      }
    }

    this.changeTorn();
  }
  /**
   * Funció per sabe el torn acutal
   * @return {int}
   */
  getTorn() {
    return this.torn;
  }
  /**
   * Funció per saber el torn contrari
   * @param {int} torn
   * @return {int}
   */
  getTornCambiat(torn) {
    if (torn == 0) {
      torn = 1;
    } else if (torn == 1) {
      torn = 0;
    }
    return torn;
  }
  /**
   * Funció que començara el joc
   */
  startGame() {
    this.deck.createDeck();

    for (let i = 0; i < 3; i++) {
      const card = this.deck.getCard();
      this.players[0].setCardsMaPlayer(card, i);
      this.vista.addHandCards(card, i, this.allFunctions, 0, this.gameMode);
    }


    for (let i = 0; i < 3; i++) {
      const card = this.deck.getCard();
      this.players[1].setCardsMaPlayer(card, i);
      this.vista.addHandCards(card, i, this.allFunctions, 1, this.gameMode);
    }

    this.changeTorn();
    this.vista.disableButtonStartGame();
  }
  /**
   * Funció que retornara els contenidors que pot anar una carta
   * @param {card} card
   * @param {boolean} dragVal
   * @param {String} namePlayer
   * @return {[]}
   */
  onPosarCarta(card, dragVal, namePlayer) {
    if (namePlayer == this.players[this.torn].name && this.changeValTorn == 0) {
      let tipus;
      let color;

      if (dragVal) {
        tipus = card.id.split('_')[0];
        color = card.id.split('_')[1];
      } else {
        tipus = card.split('_')[0];
        color = card.split('_')[1];
      }

      // AQUI ES POSARAN EL NOM DELS CONTENIDORS QUE PINTARAN AL POSAR EL MOUSE SOBRE LA CARTA

      let paintContainers = [];

      if (tipus == 'organ') {
        let valColorOrgan = false;
        const containersName = this.players[this.torn].getNameAllCardsTauler();

        for (const nameContainer of containersName) {
          const cardsTauler = this.players[this.torn].getCardsTauler(nameContainer);
          const lenghtContainer = this.players[this.torn].getNumCartesTauler(nameContainer);

          if (lenghtContainer == 0) {
            paintContainers.push(nameContainer);
          } else {
            if (cardsTauler[0].color == color && color != 'mcolor') {
              valColorOrgan = true;
            }
          }
        }

        if (valColorOrgan) {
          paintContainers = [];
        }
      }

      const tornEnemig = this.getTornCambiat(this.torn);

      if (tipus == 'virus') {
        const containersName = this.players[tornEnemig].getNameAllCardsTauler();

        for (const nameContainer of containersName) {
          const cardsTauler = this.players[tornEnemig].getCardsTauler(nameContainer);
          const lenghtContainer = this.players[tornEnemig].getNumCartesTauler(nameContainer);

          if (lenghtContainer != 0) {
            if (cardsTauler[lenghtContainer - 1].color == color) {
              paintContainers.push(nameContainer);
            } else if (cardsTauler[0].color == 'mcolor' || color == 'mcolor' || cardsTauler[0].color == color) {
              paintContainers.push(nameContainer);
            }
          }
        }
      }

      if (tipus == 'medicina') {
        const containersName = this.players[this.torn].getNameAllCardsTauler();

        for (const nameContainer of containersName) {
          const cardsTauler = this.players[this.torn].getCardsTauler(nameContainer);
          const lenghtContainer = this.players[this.torn].getNumCartesTauler(nameContainer);

          if (lenghtContainer != 0) {
            if (cardsTauler[lenghtContainer - 1].color == color) {
              paintContainers.push(nameContainer);
            } else if (cardsTauler[0].color == 'mcolor' || color == 'mcolor' || cardsTauler[0].color == color) {
              paintContainers.push(nameContainer);
            }
          }
        }
      }

      for (let i = 0; i < this.players.length; i++) {
        const taulersInmonitzats = this.players[i].getTaulersInmonitzats();

        for (let j = 0; j < taulersInmonitzats.length; j++) {
          if (paintContainers.indexOf(taulersInmonitzats[j]) !== -1) {
            const indx = paintContainers.indexOf(taulersInmonitzats[j]);
            paintContainers.splice(indx, 1);
          }
        }
      }

      if (dragVal) {
        this.vista.addClassDragOverContainers(paintContainers);
        this.vista.addClassDragOverContainers(paintContainers);
      } else {
        return paintContainers;
      }
    }
  }
  /**
   * Funció que posa la carta al contenidor seleccionat automaticament per la maquina
   * @param {String} card
   * @param {String} nameContainer
   * @return {int}
   */
  automaticAddCartaTablero(card, nameContainer) {
    let posicioCarta = -1;
    const cartaReal = this.players[1].getCardXId(card);
    const checkPosar = this.checkTablero(cartaReal, nameContainer);

    if (checkPosar) {
      this.players[1].deleteCardMaPlayer(card);

      if (this.players[1].name == nameContainer.split('C')[0]) {
        this.players[1].setCardTauler(cartaReal, nameContainer);
        posicioCarta = this.players[1].getNumCartesTauler(nameContainer);
      } else {
        this.players[0].setCardTauler(cartaReal, nameContainer);
        posicioCarta = this.players[0].getNumCartesTauler(nameContainer);
      }
    }

    return posicioCarta;
  }
  /**
   * Funció per afegir una carta al tablero
   * @param {String} card
   * @param {String} container
   * @param {String} namePlayer
   * @return {int}
   */
  addCartaTablero(card, container, namePlayer) {
    let numCartesContainer = -1;
    if (card != '') {
      const nameContainer = container.className.split(' ')[2];

      let cartaReal = [];

      const validContainers = this.onPosarCarta(card, false, namePlayer);

      if (validContainers.indexOf(nameContainer) !== -1) {
        // AQUI ES TREU LA CARTA DEL JUGADOR A TRAVÉS DEL TORN JA QUE SI ALGU TIRA UNA CARTA SABRE QUI ES PER EL TORN

        cartaReal = this.players[this.torn].getCardXId(card);

        // AFEGEIXO LA CARTAREAL AL CONTENIDOR INDICAT

        const checkPosar = this.checkTablero(cartaReal, nameContainer);

        if (checkPosar) {
          this.players[this.torn].deleteCardMaPlayer(card);

          if (this.players[this.torn].name == validContainers[0].split('C')[0]) {
            this.players[this.torn].setCardTauler(cartaReal, nameContainer);
            numCartesContainer = this.players[this.torn].getNumCartesTauler(nameContainer);
          } else {
            const enemig = this.getTornCambiat(this.torn);
            this.players[enemig].setCardTauler(cartaReal, nameContainer);
            numCartesContainer = this.players[enemig].getNumCartesTauler(nameContainer);
          }

          // RETURN PER SABER ON POSAR LA CARTA A LA VISTA

          this.changeValTorn = 0;
        }
      } else {
        numCartesContainer = -2;
      }
    }
    return numCartesContainer;
  }
  /**
   * Funció s'encarregara de saber la logica al afegir una carta a una altre
   * @param {card} card
   * @param {String} nameContainer
   * @return {boolean}
   */
  checkTablero(card, nameContainer) {
    let jugador = this.torn;

    if (nameContainer.split('C')[0] != this.players[this.torn].name) {
      jugador = this.getTornCambiat(this.torn);
    }

    const cardsTauler = this.players[jugador].getCardsTauler(nameContainer);

    if (cardsTauler.length == 2) {
      if (cardsTauler[1].tipus == 'medicina' && card.tipus == 'medicina') {
        this.players[jugador].addTaulerImonitzat(nameContainer);
        return true;
      }

      if (cardsTauler[1].tipus == 'virus' && card.tipus == 'virus') {
        this.vista.deleteAllCardsTablero(cardsTauler);
        this.players[jugador].deleteAllCardsTablero(nameContainer);
        return false;
      }

      if (cardsTauler[1].tipus == 'virus' && card.tipus == 'medicina') {
        this.vista.deleteCardsTablero(cardsTauler[1]);
        this.players[jugador].deleteCardsTablero(nameContainer, cardsTauler[1]);
        return false;
      }

      if (cardsTauler[1].tipus == 'medicina' && card.tipus == 'virus') {
        this.vista.deleteCardsTablero(cardsTauler[1]);
        this.players[jugador].deleteCardsTablero(nameContainer, cardsTauler[1]);
        return false;
      }
    }

    return true;
  }
  /**
   * Funció encarregada de afegir una nova carta al jugador
   */
  addNewCardDeckPlayer() {
    const card = this.deck.getCard();

    const ma = this.players[this.torn].getCardsMaPlayer();
    for (let i = 0; i < ma.length; i++) {
      if (ma[i] == '') {
        this.players[this.torn].setCardsMaPlayer(card, i);
        this.vista.addHandCards(card, i, this.allFunctions, this.torn, this.gameMode);
      }
    }
  }
  /**
   * Funció que borrara de l'array del jugador la carta descartada
   * @param {String} idCard
   */
  trashCard(idCard) {
    const tipus = idCard.split('_')[0];
    const color = idCard.split('_')[1];
    const number = idCard.split('_')[2];
    const card = this.deck.createCard(tipus, color, number);
    this.deck.setCard(card);

    this.players[this.torn].deleteCardMaPlayer(card.id);

    this.addNewCardDeckPlayer();
    this.changeValTorn++;

    if (this.changeValTorn == 3) {
      this.changeTorn();
    }
  }
  /**
   * Funció que borrara automaticament de la ma de maquina una carta
   * @param {String} idCard
   */
  automaticTrashCard(idCard) {
    const tipus = idCard.split('_')[0];
    const color = idCard.split('_')[1];
    const number = idCard.split('_')[2];
    const card = this.deck.createCard(tipus, color, number);
    this.deck.setCard(card);
    this.players[1].deleteCardMaPlayer(card.id);
  }
  /**
   * Funció que mirara si algu ha guanyat
   * @return {boolean}
   */
  checkWinnerGame() {
    const containersName = this.players[this.torn].getNameAllCardsTauler();

    let winVal = 0;

    for (const container of containersName) {
      const cards = this.players[this.torn].getCardsTauler(container);

      if (cards[0] != undefined && cards[0] != '') {
        if (cards[1] != undefined && cards[1] != '') {
          if (cards[1].tipus != 'virus') {
            winVal++;
          }
        } else {
          winVal++;
        }
      }
    }

    if (winVal == 4) {
      return this.players[this.torn].name;
    } else {
      return false;
    }
  }
}
