//Selectors
const tipsContainer = document.getElementById("tips-container")
const closeContainer = document.getElementById("close-container")
const cardContainer = document.getElementById("card-container")
const controlsContainer = document.getElementById("controls-container")


let cardFrontTemplate = [
    `<div class="card view" data-match="1"> 3 <sup> 2 </sup></div>`,
    `<div class="card view" data-match="1"> 9 </div>`,
    `<div class="card view" data-match="2"> 4 <sup> 1 </sup></div>`,
    `<div class="card view" data-match="2"> 4 </div>`,
    `<div class="card view" data-match="3"> 3 <sup> 3 </sup></div>`,
    `<div class="card view" data-match="3"> 27 </div>`,
    `<div class="card view" data-match="4"> 1 <sup> 3 </sup></div>`,
    `<div class="card view" data-match="4"> 1 </div>`,
    `<div class="card view" data-match="5"> 7 <sup> 2 </sup></div>`,
    `<div class="card view" data-match="5"> 49 </div>`,
    `<div class="card view" data-match="6"> 6 <sup> 2 </sup></div>`,
    `<div class="card view" data-match="6"> 36 </div>`
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
    divEl.innerText = "?"
    cardContainer.append(divEl)
}

// shuffle cards
function shuffleCards() {
    cardArray.forEach(card => {
        card.style.order = Math.floor(Math.random() * cardArray.length - 1) + 1;
    });
}

//Card front view
const cardArray = document.querySelectorAll(".card");
for (let i = 0; i < cardArray.length; i++) {
    
    cardArray[i].addEventListener("click", function (event) {
        const newCard = document.createElement("div");
        newCard.innerHTML = cardFrontTemplate[i % cardFrontTemplate.length]; // Use modulus operator to cycle through cardTemplate array
        newCard.classList.add("front","view", "card");
        const selectedCard = event.currentTarget;
        selectedCard.append(newCard);
        //console.log(selectedCard);

        cardEvents(newCard, selectedCard)
    });

    return
}


// Restart Button
const restartBtn = document.getElementById("restart")
restartBtn.addEventListener("click", function () {
    location.reload();
});




//Card Events
function cardEvents(newCard, selectedCard) {
    
    //Is there an open card?
    const openedCard = document.querySelectorAll(".open")
    console.log(openedCard);

    if(openedCard.length === 0) { //It means there are no open cards.
        selectedCard.classList.add("open")

        setTimeout(() => {
        selectedCard.classList.remove("open")
        newCard.remove()

        }, 1500)
    }
    //We had a card that was opened before and we opened the one that was opened later.
    selectedCard.classList.add("open")
}







