//selectors
const tipsContainer = document.getElementById("tips-container");
const closeContainer = document.getElementById("close-container");
const cardContainer = document.getElementById("card-container");
const controlsContainer = document.getElementById("controls-container");
const flipsEl = document.querySelector(".flips");
const timeEl = document.querySelector(".time");
let matches = 0;
let flips = 0;


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
    `<span class="card view" data-match="2"> 50 <sup> 0 </sup></span>`,
    `<span class="card view" data-match="1"> 3 <sup> -2 </sup></span>`,
    `<span class="card view" data-match="2"> 1 </span>`,
    `<span class="card view" data-match="3"> 10 <sup> 3 </sup></span>`,
    `<span class="card view" data-match="3"> 1000 </span>`,
    `<span class="card view" data-match="1"> 1 / 9 </span>`,
    `<span class="card view" data-match="4"> 2 <sup> (-2) <sup> 2 </sup></span>`,
    `<span class="card view" data-match="4"> 16 </span>`,
    `<span class="card view" data-match="5"> - 7 <sup> 2 </sup></span>`,
    `<span class="card view" data-match="5"> - 49 </span>`,
    `<span class="card view" data-match="6"> 2 <sup> 2 </sup> + 1 </span>`,
    `<span class="card view" data-match="6"> 5 </span>`
]

//  Function that listens to level options
const memorySettingsGrid = document.getElementById("memory-settings-grid");


memorySettingsGrid.addEventListener("change", function () {
    const templateToUse = memorySettingsGrid.value;
    console.log("templateToUse:", templateToUse);
    if (templateToUse === "Medium") {
        cardFrontTemplate = mediumCardFrontTemplate;
    }
});

const tipsBtn = document.getElementById("tips-btn");
tipsBtn.addEventListener("click", function () {
    tipsContainer.classList.remove("hide");
    closeContainer.addEventListener("click", function () {
        tipsContainer.classList.add("hide");
    });
});

// Game section view function
const startBtn = document.getElementById("start");
const header = document.querySelector(".head");
const details = document.getElementById("details");
const results = document.getElementById("results");
startBtn.addEventListener("click", function () {
    cardContainer.classList.remove("hide");
    details.classList.remove("hide");
    results.classList.remove("hide");
    controlsContainer.classList.add("hide");
    header.classList.add("hide");
    startTimer();
    shuffleCards();
});

//Creating Cards(BACK)
for (let i = 0; i < 12; i++) {
    const divEl = document.createElement("div"); //node element
    divEl.classList.add("card", "view", "back");
    divEl.dataset.card = i;
    divEl.innerText = "?";
    cardContainer.append(divEl);
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
        //disable the card being clicked/played
        cardArray[i].classList.add("disable");
        const newCard = document.createElement("div");
        newCard.innerHTML = cardFrontTemplate[i % cardFrontTemplate.length]; // Use modulus operator to cycle through cardTemplate array
        newCard.classList.add("front", "view", "card");
        const selectedCard = event.currentTarget;
        selectedCard.append(newCard);
        checkCards(newCard, cardArray[i]);
        //flips set
        flips++;
        flipsEl.innerText = `Flips: ${flips}`;
    });
}


let cardsFlipped = [];


function checkCards(cardFront, cardBack) {
    const cardMatch = cardFront.querySelector('span').dataset.match;
    const cardBackNumber = cardBack.dataset.card;

    if (cardsFlipped.length == 0) {
        cardsFlipped.push({ cardFront, cardBack, cardMatch, cardBackNumber });
    }

    if (cardsFlipped.length == 1) {
        if (cardsFlipped[0].cardBack === cardBack) {
            if (cardBack.children.length > 1) {
                cardFront.remove();
            }
            return;
        }
        else {
            cardsFlipped.push({ cardFront, cardBack, cardMatch, cardBackNumber });
        }
    }

    if (cardsFlipped.length == 2) {
        //find all unmatched cards
        let disabledCards = document.querySelectorAll(".card.view.back:not(.match)");
        //temporarily disable other cards not currently being played
        disabledCards.forEach(card => {
            card.classList.add("disable");
        });

        // game is won, dont unflip
        if (cardsFlipped[0].cardMatch == cardsFlipped[1].cardMatch) {
            // add "match" class to permanently disable
            cardsFlipped[0].cardBack.classList.add("match");
            cardsFlipped[1].cardBack.classList.add("match");
            cardsFlipped = [];
            // re-enable unmatched cards
            disabledCards.forEach(card => {
                card.classList.remove("disable");
            });

            //
            matches += 1;
            if (matches >= (cardArray.length / 2)) {
                endGame();
            }
        }
        // unflip cards
        else {

            // reset array
            setTimeout(() => {
                cardsFlipped[0].cardFront.remove();
                cardsFlipped[1].cardFront.remove();
                cardsFlipped = [];
                // re-enable unmatched cards
                disabledCards.forEach(card => {
                    card.classList.remove("disable");
                });
            }, 1000);
        }
    }
}



//timer 
let startTime;
let timer;
function startTimer() {
    startTime = new Date();
    timer = setInterval(updateTimer, 1000);
}

function updateTimer() {
    let currentTime = new Date();
    let elapsedTime = Math.floor((currentTime - startTime) / 1000); // Calculate elapsed time in seconds
    const minutes = Math.floor(elapsedTime / 60);
    const seconds = elapsedTime % 60;
    let formattedTime;


    if (elapsedTime >= 60) {
        formattedTime = '01:00';
    } else {

        formattedTime = ('0' + minutes).slice(-2) + ':' + ('0' + seconds).slice(-2);
    }

    timeEl.innerText = `Time: ${formattedTime}`;
}


// Restart Button
const restartBtn = document.getElementById("restart")
restartBtn.addEventListener("click", function () {
    location.reload();
    startTimer()
});

function endGame() {
    clearInterval(timer);
    setTimeout(() => {
        alert("You found all matches!");
    }, 500);
}











