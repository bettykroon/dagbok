let myDiv = document.getElementById("myDiv");
let myText = document.getElementById("myText");
let myBtn = document.getElementById("myBtn");

myBtn.addEventListener("click", function(){
    let textValue = myText.value;
    console.log(textValue);

    if(textValue) {
        localStorage.setItem("inlägg", textValue);
        location.reload();
    }
})

for(let i = 0; i < localStorage.length; i++) {
    let key = localStorage.key(i);
    let value = localStorage.getItem(key);

    myDiv.innerHTML += `${key}: ${value}<br/>`
}