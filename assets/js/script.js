let button = document.querySelector(".button")
let ul = document.querySelector("ul")
let itemsArray = localStorage.getItem("items") ? JSON.parse(localStorage.getItem("items")) : []
// Events

button.addEventListener("click", creatLi)
ul.addEventListener("click", removeLi)
showFromLS()


// Functions



function creatLi() {
    let inputValue = document.querySelector("input").value
    if (!inputValue == '') {
        let li = document.createElement("li")
        let textContent = document.createElement("span")
        textContent.innerHTML = inputValue
        let closeBtn = document.createElement("span")
        closeBtn.innerHTML = '<i class="fa-solid fa-trash"></i>'
        closeBtn.classList.add("close-button")
        li.append(textContent); li.append(closeBtn)
        ul.append(li)
        addToLS(inputValue)
        document.querySelector(".input").value = "" //To clear input content
    }
}

function removeLi(e) {
    if (e.target.classList.contains("fa-trash")) {
        e.target.parentElement.parentElement.remove()
        removeFromLS(e.target.parentElement.parentElement.firstChild.textContent)
    }
}

function addToLS(inputValue) {
    let allList = getFromLS()
    allList.push(inputValue)
    localStorage.setItem("items", JSON.stringify(allList))
}

function getFromLS() {
    let itemsArray;

    let getFromLS = localStorage.getItem("items")

    if (getFromLS == null) {
        itemsArray = []
    } else {
        itemsArray = JSON.parse(getFromLS)
    }

    return itemsArray
}

function showFromLS() {
    let itemsArray = getFromLS()
    for (let i = 0; i < itemsArray.length; i++) {
        let li = document.createElement("li")
        let textContent = document.createElement("span")
        textContent.innerHTML = itemsArray[i]
        let closeBtn = document.createElement("span")
        closeBtn.innerHTML = '<i class="fa-solid fa-trash"></i>'
        closeBtn.classList.add("close-button")
        li.append(textContent); li.append(closeBtn)
        ul.append(li)
    }
}

function removeFromLS(innerContent) {
    let itemsArray = getFromLS()
    itemsArray.forEach((note, index) => {
        if (note == innerContent) {
            itemsArray.splice(index, 1)
        }
        localStorage.setItem("items", JSON.stringify(itemsArray))
    });
}