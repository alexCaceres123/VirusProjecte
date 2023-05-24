export default class Vista{
    constructor(){
        this.buttonStartGame = document.querySelector(".startGame");
        this.allhandCards = document.querySelectorAll(".cards");
        this.allContainers = document.querySelectorAll(".cardsContainer");
        this.parentContainer = document.querySelector(".container");
        this.trash = document.querySelector(".trash");
        this.players = ["player", "maquina"];
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

    addHandCards(card, index, allFunctions, torn){
        let src = `/img/${card.color}-${card.tipus}.png`;
        let id = card.id;

        const img = document.createElement("img")
        img.setAttribute("src", src);
        img.setAttribute("class",  `cards ${this.players[torn]}Card ${this.players[torn]}Card${index + 1}`);
        img.setAttribute("id", `${id}`);
        img.setAttribute("draggable", "true");
        this.parentContainer.appendChild(img);

        img.addEventListener("dragstart", this.cardDragStart)

        img.addEventListener("mouseover", () => {
            allFunctions["onPosarCarta"](img, true, this.players[torn]);
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

        let containers = document.querySelectorAll(`.${this.players[0]}CardsContainer`);
        for(let container of containers){
            container.classList.remove("drag-over");
        }

        containers = document.querySelectorAll(`.${this.players[1]}CardsContainer`);
        for(let container of containers){
            container.classList.remove("drag-over");
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

        let player = e.dataTransfer.getData('player');
        let torn = allFunctions["getTorn"]();

        if(this.players[torn] == player){

            let id = e.dataTransfer.getData('id');
            let draggable = document.getElementById(id);
            let numberPosition = allFunctions["addCartaTablero"](id, container, this.players[torn]);
            
            if(numberPosition){
                draggable.classList = `cardDentroTablero${numberPosition - 1}`;
                
                if(e.target instanceof HTMLImageElement){

                    e.target.parentNode.appendChild(draggable);

                }
                else{

                    e.target.appendChild(draggable);

                }

                allFunctions["addNewCardDeckPlayer"]();
                allFunctions["changeTorn"]();

            }  
        } 
    }


    trashDrop(e, allFunctions){
        let player = e.dataTransfer.getData('player');
        let torn = allFunctions["getTorn"]();

        if(this.players[torn] == player){
            let id = e.dataTransfer.getData('id');
            let draggable = document.getElementById(id);
            this.parentContainer.removeChild(draggable);
            allFunctions["trashCard"](id);
            allFunctions["changeTorn"]();
        }
    }

    changeTornView(torn){
        for(let handCard of document.querySelectorAll(`.${this.players[torn]}Card`)){
            handCard.src = "/img/cartaRedera.png";
        }

        if(torn == 0){
            torn = 1;
        }
        else if (torn == 1){
            torn = 0;
        }

        for(let i = 0; i < 3; i++){
            let handCard = document.querySelector(`.${this.players[torn]}Card${i + 1}`)
            handCard.src = `/img/${handCard.id.split("_")[1]}-${handCard.id.split("_")[0]}.png`;
        }

    }

    deleteCardsTablero(card){
        
        let idCard = card.id;
        let deleteCard = document.getElementById(idCard);
        deleteCard.parentNode.removeChild(deleteCard);

    }

    deleteAllCardsTablero(cardsDelete){

        for(let card of cardsDelete){
            let idCard = card.id
            let deleteCard = document.getElementById(idCard);
            deleteCard.parentNode.removeChild(deleteCard);
        }

    }
}