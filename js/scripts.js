
const body = document.querySelector('body')
const performRotationBtn = document.querySelector('.header__btn--rotate')
const confirmRotationDialog = document.querySelector('.dialog--rotate')
const confirmRotationBtn = document.querySelector('.dialog--rotate .dialog__btn--primary')
const cancelRotationBtn = document.querySelector('.dialog--rotate .dialog__btn--secondary')
const rotationProgressOverlay = document.querySelector('.overlay--rotate')
const rotationProgressBarStep1 = document.querySelector('.overlay__progress-bar--1')
const rotationProgressBarStep2 = document.querySelector('.overlay__progress-bar--2')
const toastMessages = document.querySelectorAll('.toast')
const successRotationToast = document.querySelector('.toast--success')
const searchAndSwitch = document.querySelector('.search-and-switch')
const searchModeSelector = document.querySelector('.search-bar__selector')
const searchModePanel = document.querySelector('.search-bar__dropdown-panel--search-mode')
const searchHistoryBtn = document.querySelector('.search-bar__btn--history')
const searchHistoryPanel = document.querySelector('.search-bar__dropdown-panel--search-history')



const triggerRotationRequest =
function() {
    confirmRotationDialog.classList.toggle('hidden')
    body.classList.add('prevent-scroll')
}
performRotationBtn.addEventListener('click', triggerRotationRequest)


const cancelRotation =
function() {
    confirmRotationDialog.classList.toggle('hidden')
    body.classList.remove('prevent-scroll')
}
cancelRotationBtn.addEventListener('click', cancelRotation)


let successRotationProgress
const confirmRotation =
function() {
    confirmRotationDialog.classList.toggle('hidden')
    rotationProgressOverlay.classList.toggle('hidden')
    body.classList.add('prevent-scroll')

    rotationProgressStep1(rotationProgressBarStep1)

    successRotationProgress= setTimeout(() => {
        rotationProgressOverlay.classList.toggle('hidden')
        body.classList.remove('prevent-scroll')
        successRotationToast.classList.add('toast--enter')
    }, 6 * 1000)
}
confirmRotationBtn.addEventListener('click', confirmRotation)


let i = 0
const rotationProgressStep1 =
function (step) {
    if (i == 0) {
        i = 1
        let progressBar = step
        let width = 0
        let interval = setInterval(progress, 30)
        function progress() {
            if (width >= 100) {
                clearInterval(interval)
                i = 0
                document.querySelector('.overlay__text--1').classList.toggle('hidden')
                document.querySelector('.overlay__text--2').classList.toggle('hidden')
                document.querySelector('.overlay__progress-bar--2').style.width = 0
                rotationProgressStep2(rotationProgressBarStep2)
            } else {
                width++
                progressBar.style.width = width + '%'
            }
        }
    } 
}

const rotationProgressStep2 =
function (step) {
    if (i == 0) {
        i = 1
        let progressBar = step
        let width = 0
        let interval = setInterval(progress, 30)
        function progress() {
            if (width >= 100) {
                clearInterval(interval)
                i = 0
                document.querySelector('.overlay__text--1').classList.toggle('hidden')
                document.querySelector('.overlay__text--2').classList.toggle('hidden')
                document.querySelector('.overlay__progress-bar--1').style.width = 0
                document.querySelector('.overlay__progress-bar--2').style.width = 0
            } else {
                width++
                progressBar.style.width = width + '%'
            }
        }
    } 
}


const closeToast =
function() {
    toastMessages.forEach(function(element){
        element.classList.remove('toast--enter')
    })
}
document.querySelectorAll('.toast__btn--close').forEach(function(element){
    element.addEventListener('click', closeToast);
})


let topPosition = searchAndSwitch.offsetTop - 70; 
/* substract (70px) wich is frame (50) and search-and-switch (20) padding top to prevent overlapping with the fixed navbar */
const stickySearchOnScroll =
function() {
    if (window.scrollY >= topPosition) {    
        searchAndSwitch.classList.add('search-and-switch--sticky')
    } else {
        searchAndSwitch.classList.remove('search-and-switch--sticky')   
    }
}
window.addEventListener('scroll', stickySearchOnScroll)


const toggleSearchModeDropdown = 
function() {   
    searchModePanel.classList.toggle('hidden')

    const caretDownArrow = document.querySelector('.search-bar__icon--selector')

    if(!searchModePanel.classList.contains('hidden')) {
        caretDownArrow.classList.add('flip-vertical')
    } else {
        caretDownArrow.classList.remove('flip-vertical')
    }
}
searchModeSelector.addEventListener('click', toggleSearchModeDropdown)


const toggleSearchHistoryDropdown = 
function() {   
    searchHistoryPanel.classList.toggle('hidden')

    const caretDownArrow = document.querySelector('.search-bar__icon--history')

    if(!searchHistoryPanel.classList.contains('hidden')) {
        searchHistoryBtn.classList.add('active')
        caretDownArrow.classList.add('flip-vertical')
    } else {
        searchHistoryBtn.classList.remove('active')
        caretDownArrow.classList.remove('flip-vertical')
    }
}
searchHistoryBtn.addEventListener('click', toggleSearchHistoryDropdown)
