const tipsContainer = document.getElementById("tips-container")
const closeContainer = document.getElementById("close-container")
const tipBtn = document.getElementById("tips-btn")
tipsBtn.addEventListener("click", function(){
    tipsContainer.style.display = "flex"
    closeContainer.addEventListener("click", function(){
        tipsContainer.style.display = "none"
    })
})