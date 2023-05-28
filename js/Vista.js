/**
 * Classe Vista
 */
export default class Vista {
  /**
   * Constructor
   */
  constructor() {
    this.buttonStartGame = document.querySelector('.startGame');
    this.buttonAcabarTorn = document.querySelector('.acabarTorn');
    this.allhandCards = document.querySelectorAll('.cards');
    this.allContainers = document.querySelectorAll('.cardsContainer');
    this.parentContainer = document.querySelector('.container');
    this.trash = document.querySelector('.trash');
    this.winner = document.querySelector('.winner');
    this.labelWinner = document.querySelector('.winnerP');
    this.players = ['player', 'maquina'];
    this.alert = document.getElementById('GameModeDiv');
    this.buttonOnevsOne = document.querySelector('.onePlayerMode');
    this.buttonMaquinavsOne = document.querySelector('.maquinaMode');
  }
  /**
   * Funció que te els listeners del butons i els contenidors del joc
   * @param {{}} allFunctions
   */
  listenners(allFunctions) {
    this.buttonStartGame.addEventListener('click', allFunctions['startGame']);

    this.buttonOnevsOne.addEventListener('click', function() {
      allFunctions['modeJugador']('jugador');
    });
    this.buttonMaquinavsOne.addEventListener('click', function() {
      allFunctions['modeJugador']('maquina');
    });


    this.buttonAcabarTorn.addEventListener('click', function() {
      allFunctions['changeTorn']();
    });


    this.allContainers.forEach((container) => {
      container.addEventListener('dragenter', this.dragEnter);

      container.addEventListener('dragover', this.dragOver);

      container.addEventListener('drop', (e) => {
        this.drop(e, container, allFunctions);
      });
    });

    this.trash.addEventListener('dragenter', this.dragEnter);

    this.trash.addEventListener('dragover', this.dragOver);

    this.trash.addEventListener('drop', (e) => {
      this.trashDrop(e, allFunctions);
    });
  }
  /**
   * Funció encarregada de afegir les cartes al jugador i crear els seus addEventListeners
   * @param {card} card
   * @param {int} index
   * @param {{}} allFunctions
   * @param {int} torn
   * @param {String} gameMode
   */
  addHandCards(card, index, allFunctions, torn, gameMode) {
    const src = `/img/${card.color}-${card.tipus}.png`;
    const id = card.id;

    const img = document.createElement('img');
    img.setAttribute('src', src);
    img.setAttribute('class', `cards ${this.players[torn]}Card ${this.players[torn]}Card${index + 1}`);
    img.setAttribute('id', `${id}`);
    img.setAttribute('draggable', 'true');
    this.parentContainer.appendChild(img);

    if (this.players[torn] == 'player' || (this.players[torn] == 'maquina' && gameMode != 'maquina')) {
      img.addEventListener('dragstart', this.cardDragStart);

      img.addEventListener('mouseover', () => {
        allFunctions['onPosarCarta'](img, true, this.players[torn]);
      });

      img.addEventListener('mouseout', () => {
        this.deleteClassDragOver();
      });
    }
  }
  /**
   * Funció encarregada de deshabilitar el boto startGame i mostrar el boto acabarTorn
   */
  disableButtonStartGame() {
    this.buttonStartGame.style.display = 'none';
    this.buttonAcabarTorn.style.display = 'block';
  }
  /**
   * Funció encarregada de afegir la classe drag als contenidors
   * @param {[]} containers
   */
  addClassDragOverContainers(containers) {
    for (const nameContainer of containers) {
      const container = document.querySelector(`.${nameContainer}`);
      container.classList.add('drag-over');
    }
  }
  /**
   * Funció encarregada de borrar la classe drag a tots els contenidors
   */
  deleteClassDragOver() {
    let containers = document.querySelectorAll(`.${this.players[0]}CardsContainer`);
    for (const container of containers) {
      container.classList.remove('drag-over');
    }

    containers = document.querySelectorAll(`.${this.players[1]}CardsContainer`);
    for (const container of containers) {
      container.classList.remove('drag-over');
    }
  }
  /**
   * Funció encarregada de saber si una el mouse te una carta
   * @param {{}} e
   */
  cardDragStart(e) {
    const claseCard = e.target.classList[1].split('C')[0];
    e.dataTransfer.setData('id', e.target.id);
    e.dataTransfer.setData('player', claseCard);
  }
  /**
   * Drag enter
   * @param {{}} e
   */
  dragEnter(e) {
    e.preventDefault();
  }
  /**
   * Drag Over
   * @param {{}} e
   */
  dragOver(e) {
    e.preventDefault();
  }
  /**
   * Funció encarregada de afegir una carta al deixarla a un contenidor valid
   * @param {{}} e
   * @param {String} container
   * @param {{}} allFunctions
   */
  drop(e, container, allFunctions) {
    const player = e.dataTransfer.getData('player');
    const torn = allFunctions['getTorn']();

    if (this.players[torn] == player) {
      const id = e.dataTransfer.getData('id');
      const draggable = document.getElementById(id);
      const numberPosition = allFunctions['addCartaTablero'](id, container, this.players[torn]);

      if (numberPosition != -1 && numberPosition != -2) {
        draggable.classList = `cardDentroTablero${numberPosition - 1}`;

        if (e.target instanceof HTMLImageElement) {
          e.target.parentNode.appendChild(draggable);
        } else {
          e.target.appendChild(draggable);
        }
      }

      const winner = allFunctions['checkWinnerGame']();

      if (winner == false) {
        if (numberPosition != -2) {
          allFunctions['addNewCardDeckPlayer']();
          allFunctions['changeTorn']();
        }
      } else {
        this.finishGame(winner);
      }
    }
  }
  /**
   * Funció encarregada de afegir una carta automaticament de la maquina al tablero
   * @param {String} idcard
   * @param {String} containerName
   * @param {int} posCard
   */
  automaticAddCardMaquina(idcard, containerName, posCard) {
    if (posCard != -1) {
      const src = `/img/${idcard.split('_')[1]}-${idcard.split('_')[0]}.png`;
      const id = idcard;

      const img = document.createElement('img');
      img.setAttribute('src', src);
      img.setAttribute('class', `cardDentroTablero${posCard - 1}`);
      img.setAttribute('id', `${id}`);
      img.setAttribute('draggable', 'true');

      const containerAdd = document.querySelector(`.${containerName}`);
      containerAdd.appendChild(img);
    }
  }
  /**
   * Funció que mostrara el label de qui ha guanyat
   * @param {String} nameWinner
   */
  finishGame(nameWinner) {
    this.winner.style.display = 'block';
    this.labelWinner.innerHTML = `${nameWinner.toUpperCase()} GUANYA!`;
  }

  /**
   * Funció que descartara una carta a la basura
   * @param {{}} e
   * @param {{}} allFunctions
   */
  trashDrop(e, allFunctions) {
    const player = e.dataTransfer.getData('player');
    const torn = allFunctions['getTorn']();

    if (this.players[torn] == player) {
      const id = e.dataTransfer.getData('id');
      const draggable = document.getElementById(id);
      this.parentContainer.removeChild(draggable);
      allFunctions['trashCard'](id);
    }
  }
  /**
   * Funció encarregada de cambiar la vista de les cartes dels jugador depenguent del torn
   * @param {int} torn
   */
  changeTornView(torn) {
    for (const handCard of document.querySelectorAll(`.${this.players[torn]}Card`)) {
      handCard.src = '/img/cartaRedera.png';
    }

    if (torn == 0) {
      torn = 1;
    } else if (torn == 1) {
      torn = 0;
    }

    for (let i = 0; i < 3; i++) {
      const handCard = document.querySelector(`.${this.players[torn]}Card${i + 1}`);
      handCard.src = `/img/${handCard.id.split('_')[1]}-${handCard.id.split('_')[0]}.png`;
    }
  }
  /**
   * Funció encarregada de borrar una carta del tablero
   * @param {card} card
   */
  deleteCardsTablero(card) {
    const idCard = card.id;
    const deleteCard = document.getElementById(idCard);
    deleteCard.parentNode.removeChild(deleteCard);
  }
  /**
   * Funció encarregada de borrar totes les cartes de un tablero
   * @param {[]} cardsDelete
   */
  deleteAllCardsTablero(cardsDelete) {
    for (const card of cardsDelete) {
      const idCard = card.id;
      const deleteCard = document.getElementById(idCard);
      deleteCard.parentNode.removeChild(deleteCard);
    }
  }
  /**
   * Funció per deshabilitar la alerta inicial
   */
  disableAlert() {
    this.alert.style.display = 'none';
  }
}
