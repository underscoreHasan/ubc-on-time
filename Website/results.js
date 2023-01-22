const journeys = JSON.parse(localStorage.getItem("journeys")).data
//the above is an array. access any one of the elements by journeys[n]

var results = document.getElementById("results");

journeys.forEach(function (journey){
    result = document.createElement("div")
    result.innerHTML = `
    ${journey.class1} -> ${journey.class2}
    <br>
    ${journey.day}
    <br>
    Term: ${journey.term}
    <br>
    Walk Time: ${journey.time}
    <br>
    <br>

    `
    results.appendChild(result);
});

