export default class Vista{
    constructor(){
        this.buttonStartGame = document.querySelector(".startGame");
        this.allhandCards = document.querySelectorAll(".cards");
        this.allContainers = document.querySelectorAll(".cardsContainer");
        this.playerHandCards = document.querySelectorAll(".playerCard");
        this.maquinaHandCards = document.querySelectorAll(".maquinaCard");
        this.containersPlayer = document.querySelectorAll(".playerCardsContainer");
        this.containersMaquina = document.querySelectorAll(".maquinaCardsContainer");
    }

    listenners(allFunctions){
        this.buttonStartGame.addEventListener("click", allFunctions["startGame"]);

        this.allhandCards.forEach(handCard => {

            handCard.addEventListener("dragstart", this.cardDragStart)

            handCard.addEventListener("mouseover", () => {
                allFunctions["onPosarCarta"](handCard);
            });

            handCard.addEventListener('mouseout', () => {
                this.deleteClassDragOver();
            });

        });

        this.allContainers.forEach(container => {

            container.addEventListener('dragenter', this.dragEnter);

            container.addEventListener('dragover', this.dragOver);

            container.addEventListener('drop', (e) => {
                this.drop(e);
            });

        });

    }

    addHandCardsPlayer(cards){
        for(let i = 0; i < 3; i++){
            let card = cards[i];
            let src = `/img/${card.color}-${card.tipus}.png`;
            let id = card.id;
            this.playerHandCards[i].src = src;
            this.playerHandCards[i].id = id;
        }
    }

    addHandCardsMaquina(cards){
        for(let i = 0; i < 3; i++){
            let card = cards[i];
            let src = `/img/${card.color}-${card.tipus}.png`;
            let id = card.id;
            this.maquinaHandCards[i].src = src;
            this.maquinaHandCards[i].id = id;
        }
    }

    disableButtonStartGame(){
        this.buttonStartGame.style.display = "none";
    }

    addClassDragOverContainersPlayer(){
        for(let containerPlayer of this.containersPlayer){
            containerPlayer.classList.add("drag-over");
        }
    }

    addClassDragOverContainersMaquina(){
        for(let containerMaquina of this.containersMaquina){
            containerMaquina.classList.add("drag-over");
        }
    }

    deleteClassDragOver(){
        for(let containerPlayer of this.containersPlayer){
            containerPlayer.classList.remove("drag-over");
        }
        for(let containerMaquina of this.containersMaquina){
            containerMaquina.classList.remove("drag-over");
        }
    }

    cardDragStart(){
        console.log("cardDragStart");
    }

    dragEnter(e){
        e.preventDefault();
        console.log("dragEnter");
    }

    dragOver(e){
        e.preventDefault();
        console.log("dragOver");
    }

    drop(e){
        console.log("drop");
    }
}