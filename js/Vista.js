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
                this.drop(e, container, allFunctions);
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

    cardDragStart(e){
        let claseCard = e.target.classList[1].split("C")[0];
        e.dataTransfer.setData('id', e.target.id);
        e.dataTransfer.setData('player', claseCard);
    }

    dragEnter(e){
        e.preventDefault();
    }

    dragOver(e){
        e.preventDefault();
    }

    drop(e, container, allFunctions){

        let id = e.dataTransfer.getData('id');
        let player = e.dataTransfer.getData('player');
        let draggable = document.getElementById(id);
        let numberPosition = allFunctions["addCartaTablero"](id, container);

        draggable.classList = `cardDentroTablero${numberPosition - 1}`
        if(e.target instanceof HTMLImageElement) e.target.parentNode.appendChild(draggable);
        else e.target.appendChild(draggable);

    }
}