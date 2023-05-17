export default class Vista{
    constructor(){
        this.buttonStartGame = document.querySelector(".startGame");
        this.allhandCards = document.querySelectorAll(".cards");
        this.allContainers = document.querySelectorAll(".cardsContainer");
        this.playerHandCards = document.querySelectorAll(".playerCard");
        this.maquinaHandCards = document.querySelectorAll(".maquinaCard");
        this.containersPlayer = document.querySelectorAll(".playerCardsContainer");
        this.containersMaquina = document.querySelectorAll(".maquinaCardsContainer");
        this.parentContainer = document.querySelector(".container");
        this.trash = document.querySelector(".trash");
    }

    listenners(allFunctions){
        this.buttonStartGame.addEventListener("click", allFunctions["startGame"]);

        this.allContainers.forEach(container => {

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

    addHandCardsPlayer(card, index, allFunctions){
        let src = `/img/${card.color}-${card.tipus}.png`;
        let id = card.id;

        const img = document.createElement("img")
        img.setAttribute("src", src);
        img.setAttribute("class",  `cards playerCard playerCard${index + 1}`);
        img.setAttribute("id", `${id}`);
        img.setAttribute("draggable", "true");
        this.parentContainer.appendChild(img);

        img.addEventListener("dragstart", this.cardDragStart)

        img.addEventListener("mouseover", () => {
            allFunctions["onPosarCarta"](img);
        });

        img.addEventListener('mouseout', () => {
            this.deleteClassDragOver();
        });
    }

    addHandCardsMaquina(card, index, allFunctions){
        let src = `/img/${card.color}-${card.tipus}.png`;
        let id = card.id;

        const img = document.createElement("img")
        img.setAttribute("src", src);
        img.setAttribute("class",  `cards maquinaCard maquinaCard${index + 1}`);
        img.setAttribute("id", `${id}`);
        img.setAttribute("draggable", "true");
        this.parentContainer.appendChild(img);

        img.addEventListener("dragstart", this.cardDragStart)

        img.addEventListener("mouseover", () => {
            allFunctions["onPosarCarta"](img);
        });

        img.addEventListener('mouseout', () => {
            this.deleteClassDragOver();
        });
    }

    disableButtonStartGame(){
        this.buttonStartGame.style.display = "none";
    }

    addClassDragOverContainers(containers){
        for(let nameContainer of containers){
            let container = document.querySelector(`.${nameContainer}`);
            container.classList.add("drag-over");
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

        if(numberPosition){
            draggable.classList = `cardDentroTablero${numberPosition - 1}`
            if(e.target instanceof HTMLImageElement){
                e.target.parentNode.appendChild(draggable);
            }
            else{
                e.target.appendChild(draggable);
            }

            allFunctions["addNewCardDeckPlayer"](player);
        }   
    }


    trashDrop(e, allFunctions){
        let id = e.dataTransfer.getData('id');
        let player = e.dataTransfer.getData('player');
        let draggable = document.getElementById(id);
        this.parentContainer.removeChild(draggable);
        allFunctions["trashCard"](id, player);
    }
}