
const tipsContainer = document.getElementById("tips-container")
const closeContainer = document.getElementById("close-container")
const cardContainer = document.getElementById("card-container")
const controlsContainer = document.getElementById("controls-container")

//Tips container view function
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

// shuffle cards
function shuffleCards() {
    cardArray.forEach(card => {
        card.style.order = Math.floor(Math.random() * cardArray.length - 1) + 1;
    });
}

//Card front view
const cardArray = document.querySelectorAll(".card")
for (let i = 0; i < cardArray.length; i++) {
    cardArray[i].addEventListener("click", function () {
        cardArray[i].classList.remove("front")
        cardArray[i].classList.add("back")

    })
}

//
const restartBtn = document.getElementById("restart")
restartBtn.addEventListener("click", function () {
    location.reload();
});




