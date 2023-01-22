const item = document.getElementById("actual-btn");
const formElem = document.getElementById("form")


item.addEventListener("change", function(e) {
    e.preventDefault();

    console.log(e.target.files[0])

    
    window.location="/Website/results.html"
})

// const newElement = document.createElement("div")

// const Element = document.getElementById("parent")
// Element.append(newElement)