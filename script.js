window.addEventListener("load", () => {
    renderPosts();
})

let namnInput = document.getElementById("namnInput");
let textInput = document.getElementById("textInput");
let dateInput = document.getElementById("dateInput");
let postContainer = document.getElementById("postContainer");
let buttonContainer = document.getElementById("buttonContainer");

gsap.from("#header", {duration: 3, x: 300, opacity: 0, scale: 0.5});

document.getElementsByTagName("button")[0].addEventListener("click", addNewPost);

function addNewPost() {
    let newPost = {
        name: namnInput.value,
        text: textInput.value,
        date: dateInput.value
    }

    let collectedPosts = localStorage.getItem("posts");

    if(collectedPosts) {
        collectedPosts = JSON.parse(collectedPosts);
    } else {
        collectedPosts = [];
    }

    collectedPosts.push(newPost);

    localStorage.setItem("posts", JSON.stringify(collectedPosts));

    renderPosts();
}

function renderPosts() {

    postContainer.innerHTML = "";

    let posts = localStorage.getItem("posts");

    if(posts) {
        posts = JSON.parse(posts);
    } else {
        let emptyHeader = document.createElement("h2");
        emptyHeader.innerText = "Inga inlägg ännu, bli den första!";
        postContainer.append(emptyHeader);
    }

    posts.sort(function(a,b){
        return new Date(b.date) + new Date(a.date);
    });

    posts.forEach((post) => {
        console.log(post);

        let postDiv = document.createElement("div");
        postDiv.id = "postDiv";

        let nameText = document.createElement("h3");
        nameText.id = "nameText";
        nameText.innerText = "Från: " + post.name;
        
        let descText = document.createElement("p");
        descText.innerText = post.text;
        
        let dateText = document.createElement("h3");
        dateText.innerText = post.date;

        postDiv.append(nameText, descText, dateText);
        postContainer.append(postDiv);
    })

    addRemovePostsButton();
}

function addRemovePostsButton(){
    let clearPosts = document.createElement("button");
    clearPosts.innerText = "Rensa inlägg";
    clearPosts.id = "clearPosts";
    buttonContainer.append(clearPosts);

    document.getElementById("clearPosts").addEventListener("click", () => {
        localStorage.clear();
        postContainer.innerHTML = "<h2>Inga inlägg ännu, bli den första!</h2>";
    })
}