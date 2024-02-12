//Selectors
const tipsContainer = document.getElementById("tips-container")
const closeContainer = document.getElementById("close-container")
const cardContainer = document.getElementById("card-container")
const controlsContainer = document.getElementById("controls-container")


let cardFrontTemplate = [
    `<span data-match="1"> 3 <sup> 2 </sup></span>`,
    `<span data-match="1"> 9 </span>`,
    `<span data-match="2"> 4 <sup> 1 </sup></span>`,
    `<span data-match="2"> 4 </span>`,
    `<span data-match="3"> 3 <sup> 3 </sup></span>`,
    `<span data-match="3"> 27 </span>`,
    `<span data-match="4"> 1 <sup> 3 </sup></span>`,
    `<span data-match="4"> 1 </span>`,
    `<span data-match="5"> 7 <sup> 2 </sup></span>`,
    `<span data-match="5"> 49 </span>`,
    `<span data-match="6"> 6 <sup> 2 </sup></span>`,
    `<span data-match="6"> 36 </span>`
]

let mediumCardFrontTemplate = [
    `<div class="card view" data-match="1"> 3 <sup> -2 </sup></div>`,
    `<div class="card view" data-match="1"> 1 / 9 </div>`,
    `<div class="card view" data-match="2"> 5000 <sup> 0 </sup></div>`,
    `<div class="card view" data-match="2"> 1 </div>`,
    `<div class="card view" data-match="3"> 10 <sup> 3 </sup></div>`,
    `<div class="card view" data-match="3"> 1000 </div>`,
    `<div class="card view" data-match="4"> 2 <sup> (-2) <sup> 2 </sup></div>`,
    `<div class="card view" data-match="4"> 16 </div>`,
    `<div class="card view" data-match="5"> - 7 <sup> 2 </sup></div>`,
    `<div class="card view" data-match="5"> - 49 </div>`,
    `<div class="card view" data-match="6"> 2 <sup> 2 </sup> + 1 </div>`,
    `<div class="card view" data-match="6"> 5 </div>`
]

//  Function that listens to level options
const memorySettingsGrid = document.getElementById("memory-settings-grid");


memorySettingsGrid.addEventListener("change", function () {
    const templateToUse = memorySettingsGrid.value;
    console.log("templateToUse:", templateToUse)
    if (templateToUse === "Medium") {
        cardFrontTemplate = mediumCardFrontTemplate
    }
});

const tipsBtn = document.getElementById("tips-btn")
tipsBtn.addEventListener("click", function () {
    tipsContainer.classList.remove("hide")
    closeContainer.addEventListener("click", function () {
        tipsContainer.classList.add("hide")
    })
})

// Game section view function
const startBtn = document.getElementById("start")
const header = document.querySelector(".head")
const details = document.getElementById("details")
const results = document.getElementById("results")
startBtn.addEventListener("click", function () {
    cardContainer.classList.remove("hide")
    details.classList.remove("hide")
    results.classList.remove("hide")
    controlsContainer.classList.add("hide")
    header.classList.add("hide")

    shuffleCards();
})

//Creating Cards(BACK)
for (let i = 0; i < 12; i++) {
    const divEl = document.createElement("div") //node element
    divEl.classList.add("card", "view", "back")
    divEl.dataset.card = i;
    divEl.innerText = "?"
    cardContainer.append(divEl)
}

// shuffle cards
function shuffleCards() {
    cardArray.forEach(card => {
        card.style.order = Math.floor(Math.random() * cardArray.length - 1) + 1;
    });
}

// flip card event listener
const cardArray = document.querySelectorAll(".card");
for (let i = 0; i < cardArray.length; i++) {
    cardArray[i].addEventListener("click", (event) => {
        const newCard = document.createElement("div");
        newCard.innerHTML = cardFrontTemplate[i % cardFrontTemplate.length]; // Use modulus operator to cycle through cardTemplate array
        newCard.classList.add("front", "view", "card");
        const selectedCard = event.currentTarget;
        selectedCard.append(newCard);
        checkCards(newCard, cardArray[i])
    });
}


let cardsFlipped = []

function checkCards(cardFront, cardBack) {
    const cardMatch = cardFront.querySelector('span').dataset.match;
    const cardBackNumber = cardBack.dataset.card;

    if (cardsFlipped.length == 0) {
        cardsFlipped.push({cardFront, cardBack, cardMatch, cardBackNumber});
    }

    if (cardsFlipped.length == 1) {
        if (cardsFlipped[0].cardBack === cardBack) {
            if (cardBack.children.length > 1) {
                cardFront.remove();           
            }
            return;             
        }
        else {
            cardsFlipped.push({cardFront, cardBack, cardMatch, cardBackNumber});
        }
    };

    if (cardsFlipped.length == 2) {
        // game is won, dont unflip
        console.log("match 1 = ", cardsFlipped[0].cardMatch, " / match 2 = ", cardsFlipped[1].cardMatch)
        if (cardsFlipped[0].cardMatch == cardsFlipped[1].cardMatch) {
            cardsFlipped[0].cardBack.pointerEvents = 'none';
            cardsFlipped[1].cardBack.pointerEvents = 'none';
            cardsFlipped = [];
        }
        // unflip cards
        else {
            // reset array
          /*   setTimeout(() => {
                cardsFlipped[0].cardFront.remove()
                cardsFlipped[1].cardFront.remove()
                cardsFlipped = [];
            }, 1000) */
            setTimeout(() => {
                cardsFlipped.forEach(({ cardFront }) => {
                    cardFront.remove();
                });
                cardsFlipped = [];
            }, 1000);
        }
    }
}


// Restart Button
const restartBtn = document.getElementById("restart")
restartBtn.addEventListener("click", function () {
    location.reload();
});








