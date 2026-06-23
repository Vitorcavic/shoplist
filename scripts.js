const form = document.querySelector('form')
const input = document.querySelector('#input')
const list = document.querySelector('.items-list ul')
const alert = document.querySelector(".alert")
const closeAlert = document.querySelector(".close-msg")

closeAlert.addEventListener('click', () => {
    alert.hidden = true
})

form.addEventListener('submit', (event) => {
    event.preventDefault()

    const value = input.value.trim()
    if (value === '') {
        return;
    }

    const newItem = document.createElement('li')
    newItem.classList.add("item")
    newItem.innerHTML = `
        <div class="item-content">
            <div class="checkbox-img"></div>
            <input type="checkbox" name="item">
            <span>${value}</span>
        </div>
        <button type="button" class="remove-item">
            <img src="assets/garbage.svg" alt="Remover item">
        </button>
    `;

    list.appendChild(newItem)
    input.value = ''
    saveList()
});

list.addEventListener('click', (event) => {
    const removeButton = event.target.closest(".remove-item")

    if (!removeButton) return;

    const item = removeButton.closest(".item")

    const itemName = item.querySelector("span").textContent
    const alertText = document.querySelector(".alert-content span")

    alertText.textContent = `O item '${itemName}' foi removido da lista`

    item.remove()
    saveList()

    alert.hidden = false
})

list.addEventListener('change', (event) => {
    if (event.target.matches('input[type="checkbox"]')) {
        saveList()
    }
})

function saveList() {
    const itens = [];

    document.querySelectorAll(".item").forEach(item => {
        itens.push({
            nome: item.querySelector("span").textContent,
            concluido: item.querySelector('input[type="checkbox"]').checked
        })
    })
    localStorage.setItem("lista", JSON.stringify(itens))
}

function restoreList() {
    const savedItens = JSON.parse(localStorage.getItem("lista"))

    if (savedItens === null) return

    savedItens.forEach(item => {
        list.innerHTML += `
        <li class="item">
            <div class="item-content">
                <div class="checkbox-img"></div>
                <input type="checkbox" name="item"
                    ${item.concluido ? "checked" : ""}
                >
                <span>${item.nome}</span>
            </div>
            <button type="button" class="remove-item">
                <img src="assets/garbage.svg" alt="Remover item">
            </button>
        </li>
        `
    })
}

document.addEventListener("DOMContentLoaded", () => {
    restoreList()
})