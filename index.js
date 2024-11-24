import { initializeApp } from "https://firebase.google.com/.js"
import { getDatabase, ref,push } from "https://console.firebase.google.com/project/realtime-database-7b947/database/realtime-database-7b947-default-rtdb/data/~2F.js"



console.log(add(1.1))

const appSettings = {
    databaseURL: "https://console.firebase.google.com/project/realtime-database-7b947/database/realtime-database-7b947-default-rtdb/data/~2F"
}

const app = initializeApp(appSettings)
const database = getDatabase(app)
const shoppingListInDB = ref(database, "shoppingList")



const inputFieldEL = document.getElementById("input-field")
const addButtonEL = document.getElementById("add-button")

addButtonEL.addEventListener("click",function() {
   let inputValue =inputFieldEL.Value

   push(shoppingListInDB, inputValue)


    console. log(`${inputValue} added to database`)
})

onValue(shoppingListInDB, function(snapshot) {
    if (snapshot.exists()) {
        let itemsArray = Object.entries(snapshot.val())
    
        clearShoppingListEl()
        
        for (let i = 0; i < itemsArray.length; i++) {
            let currentItem = itemsArray[i]
            let currentItemID = currentItem[0]
            let currentItemValue = currentItem[1]
            
            appendItemToShoppingListEl(currentItem)
        }    
    } else {
        shoppingListEl.innerHTML = "No items here... yet"
    }
})

function clearShoppingListEl() {
    shoppingListEl.innerHTML = ""
}

function clearInputFieldEl() {
    inputFieldEL.value = ""
}

function appendItemToShoppingListEl(item) {
    let itemID = item[0]
    let itemValue = item[1]
    
    let newEl = document.createElement("li")
    
    newEl.textContent = itemValue
    
    newEl.addEventListener("click", function() {
        let exactLocationOfItemInDB = ref(database,` shoppingList/${itemID}`)
        
        remove(exactLocationOfItemInDB)
    })
}
