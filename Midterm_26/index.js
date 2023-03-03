fetch('data.json')
    .then(function (response) {
        return response.json();
    })
    .then(function (data) {
        appendData(data);
    })
    .catch(function (err) {
        console.log('error:' + err);
    })

function appendData(data){
    let mcdonalds = document.getElementById("mcdonalds");
    let subway = document.getElementById("subway");
    let culvers = document.getElementById("culvers");
    let coldstone = document.getElementById("coldstone");
    let restaurantMc = data["McDonalds"];
    let restaurantSub = data["Subway"];
    let restaurantCul = data["Culvers"];
    let restaurantCold = data["ColdStone"];

    let nameMc = document.createElement("div");
    nameMc.innerHTML = `<h1>${restaurantMc[0]["name"]}</h1>`;
    mcdonalds.appendChild(nameMc);
    let imageMc = document.createElement("div");
    imageMc.innerHTML = `<img src = ${restaurantMc[0]["imageBuilding"]} alt = "McDonald's" width = "400px" height = "250px">`;
    mcdonalds.appendChild(imageMc);
    let locationMc = document.createElement("div");
    locationMc.innerHTML = `<h3>Location: ${restaurantMc[0]["location"]}</h3>`;
    mcdonalds.appendChild(locationMc);
    let descriptionMc = document.createElement("div");
    descriptionMc.innerHTML = `<p> <strong>Description: </strong>${restaurantMc[0]["description"]}</p>`;
    mcdonalds.appendChild(descriptionMc);

    let nameSub = document.createElement("div");
    nameSub.innerHTML = `<h1>${restaurantSub[0]["name"]}</h1>`;
    subway.appendChild(nameSub);
    let imageSub = document.createElement("div");
    imageSub.innerHTML = `<img src = ${restaurantSub[0]["imageBuilding"]} alt = "McDonald's" width = "400px" height = "250px">`;
    subway.appendChild(imageSub);
    let locationSub = document.createElement("div");
    locationSub.innerHTML = `<h3>Location: ${restaurantSub[0]["location"]}</h3>`;
    subway.appendChild(locationSub);
    let descriptionSub = document.createElement("div");
    descriptionSub.innerHTML = `<p> <strong>Description: </strong>${restaurantSub[0]["description"]}</p>`;
    subway.appendChild(descriptionSub);
    

    let nameCul = document.createElement("div");
    nameCul.innerHTML = `<h1>${restaurantCul[0]["name"]}</h1>`;
    culvers.appendChild(nameCul);
    let imageCul = document.createElement("div");
    imageCul.innerHTML = `<img src = ${restaurantCul[0]["imageBuilding"]} alt = "McDonald's" width = "400px" height = "250px">`;
    culvers.appendChild(imageCul);
    let locationCul = document.createElement("div");
    locationCul.innerHTML = `<h3>Location: ${restaurantCul[0]["location"]}</h3>`;
    culvers.appendChild(locationCul);
    let descriptionCul = document.createElement("div");
    descriptionCul.innerHTML = `<p> <strong>Description: </strong>${restaurantCul[0]["description"]}</p>`;
    culvers.appendChild(descriptionCul);

    let nameCold = document.createElement("div");
    nameCold.innerHTML = `<h1>${restaurantCold[0]["name"]}</h1>`;
    coldstone.appendChild(nameCold);
    let imageCold = document.createElement("div");
    imageCold.innerHTML = `<img src = ${restaurantCold[0]["imageBuilding"]} alt = "McDonald's" width = "400px" height = "250px">`;
    coldstone.appendChild(imageCold);
    let locationCold = document.createElement("div");
    locationCold.innerHTML = `<h3>Location: ${restaurantCold[0]["location"]}</h3>`;
    coldstone.appendChild(locationCold);
    let descriptionCold = document.createElement("div");
    descriptionCold.innerHTML = `<p> <strong>Description: </strong>${restaurantCold[0]["description"]}</p>`;
    coldstone.appendChild(descriptionCold);

} 



