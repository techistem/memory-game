const tipsContainer = document.getElementById("tips-container")
const closeContainer = document.getElementById("close-container")
const cardContainer = document.getElementById("card-container")
const controlsContainer = document.getElementById("controls-container")
const tipsBtn = document.getElementById("tips-btn")
tipsBtn.addEventListener("click", function(){
    tipsContainer.classList.remove("hide")
    closeContainer.addEventListener("click", function(){
        tipsContainer.classList.add("hide")
    })
})
const startBtn = document.getElementById("start") 
startBtn.addEventListener("click", function(){
    cardContainer.classList.remove("hide")
    controlsContainer.classList.add("hide")
})

