window.addEventListener("load", () => {
    renderPosts()
})

let titleInput = document.getElementById("titleInput")
let descriptionInput = document.getElementById("descriptionInput")
let dateInput = document.getElementById("dateInput")
let postContainer = document.getElementById("postContainer")

document.getElementsByTagName("button")[0].addEventListener("click", addNewPost)

function addNewPost() {
    let newPost = {
        title: titleInput.value,
        description: descriptionInput.value,
        date: dateInput.value
    }

    let collectedPosts = localStorage.getItem("posts")

    if(collectedPosts) {
        collectedPosts = JSON.parse(collectedPosts)
    } else {
        collectedPosts = []
    }

    collectedPosts.push(newPost)

    localStorage.setItem("posts", JSON.stringify(collectedPosts))

    renderPosts()
}

function renderPosts() {

    postContainer.innerHTML = ""

    let posts = localStorage.getItem("posts")

    if(posts) {
        posts = JSON.parse(posts)
    } else {
        let emptyHeader = document.createElement("h2")
        emptyHeader.innerText = "Det fanns inga posts 😥"
        postContainer.append(emptyHeader)
        return
    }

    posts.sort(function(a,b){
        // Turn your strings into dates, and then subtract them
        // to get a value that is either negative, positive, or zero.
        return new Date(b.date) + new Date(a.date);
    });

    posts.forEach((post) => {
        console.log(post)

        let postDiv = document.createElement("div")
        postDiv.style.margin = "50px"

        let titleText = document.createElement("h3")
        titleText.innerText = post.title
        
        let descText = document.createElement("h3")
        descText.innerText = post.description
        
        let dateText = document.createElement("h3")
        dateText.innerText = post.date

        postDiv.append(titleText, descText, dateText)
        postContainer.append(postDiv)
    })
}