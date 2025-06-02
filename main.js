let items = []

function addItem(){
    const itemName = document.querySelector("#item").value

    if (itemName === ""){
        alert("Digite um item válido")
        return
    }

    const item = {
        nome: itemName,
        checked: false
    }

    items.push(item)

    document.querySelector("#item").value = ""

    showItemsList()
    
}

document.querySelector("#item").addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
        addItem()
    }
})


function showItemsList(){
    const sectionList = document.querySelector(".list")
    sectionList.textContent = ""

    items.sort((itemA, itemB) => Number(itemA.checked) - Number(itemB.checked))


    items.map((item, index) => {
        sectionList.innerHTML += `
           <div class="item">
                <div>
                    <input type="checkbox" name="list" id="item-${index}" ${item.checked && "checked"}>

                    <div class="custom-checkbox" onclick="checkItem('${item.nome}')">
                        <img src="./assets/checked.svg" alt="checked">
                    </div>

                    <label for="item-${index}" onclick="checkItem('${item.nome}')">${item.nome}</label>
                </div>

                <button onclick="removeItem('${item.nome}')">
                    <img src="./assets/trash-icon.svg" alt="trash icon">
                </button>
            </div>
        `

    })

    localStorage.setItem("items", JSON.stringify(items))
    
}

function removeItem(itemName){
    const itemIndex = items.findIndex((item) => item.nome === itemName)
    const divWarning = document.querySelector(".warning")

    divWarning.classList.remove("hide-warning")

    setTimeout(() => {
        divWarning.classList.add("hide-warning")
    }, 4000)

    if(itemIndex !== -1) {
        items.splice(itemIndex, 1)
    }

    showItemsList()

}

function addHideWarningClass(){
    document.querySelector(".warning").classList.add("hide-warning")

}


function checkItem(itemName){
    const item = items.find((item) => item.nome === itemName)
    


    if(item.checked === true) {
        item.checked = false
    } else {
        item.checked = true
    }

    showItemsList()
}


function verifyLocalStorageItems(){
    const localStorageItems = localStorage.getItem("items")

    if(localStorageItems) {
        items = JSON.parse(localStorageItems)
        showItemsList()
    }
}

verifyLocalStorageItems()
