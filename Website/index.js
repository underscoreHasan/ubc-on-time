const item = document.getElementById("actual-btn");
const formElem = document.getElementById("form")


item.addEventListener("change", async function(e) {
    e.preventDefault();

    console.log(e.target.files[0])
    
    const content = await e.target.files[0].text()
    
    response = await fetch("/process", {method:"POST", body:content})
    
    localStorage.setItem("journeys", await response.text())
    
    window.location="/results.html"
})

// const newElement = document.createElement("div")

// const Element = document.getElementById("parent")
// Element.append(newElement)