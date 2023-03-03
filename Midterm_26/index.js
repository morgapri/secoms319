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
    // let mainContainer = document.getElementById("restaurants");
    // for (let restaurantName in data) {
    //     let div = document.createElement("div");
    //     div.innerHTML = `<br> <br> <h2> ${restaurantName} </h2>`;
    //     mainContainer.appendChild(div);
    //     //let mainContainer2 = document.getElementById("data");
    //     for (let element of data[restaurantName]) {
    //         console.log(element);
    //         let div2 = document.createElement("div");
    //         div2.innerHTML = `${element["id"]} : ${element["foodName"]} <br>
    //         <img src= "${element['imageBuilding']}" alt = "${element['name']}" width = "400px" height = "250px"> <br>`;
    //         mainContainer.appendChild(div2);
    //     }
    // }

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

    let nameSub = document.createElement("div");
    nameSub.innerHTML = `<h1>${restaurantSub[0]["name"]}</h1>`;
    subway.appendChild(nameSub);
    let imageSub = document.createElement("div");
    imageSub.innerHTML = `<img src = ${restaurantSub[0]["imageBuilding"]} alt = "McDonald's" width = "400px" height = "250px">`;
    subway.appendChild(imageSub);
    let locationSub = document.createElement("div");
    locationSub.innerHTML = `<h3>Location: ${restaurantSub[0]["location"]}</h3>`;
    subway.appendChild(locationSub);

    let nameCul = document.createElement("div");
    nameCul.innerHTML = `<h1>${restaurantCul[0]["name"]}</h1>`;
    culvers.appendChild(nameCul);
    let imageCul = document.createElement("div");
    imageCul.innerHTML = `<img src = ${restaurantCul[0]["imageBuilding"]} alt = "McDonald's" width = "400px" height = "250px">`;
    culvers.appendChild(imageCul);
    let locationCul = document.createElement("div");
    locationCul.innerHTML = `<h3>Location: ${restaurantCul[0]["location"]}</h3>`;
    culvers.appendChild(locationCul);

    let nameCold = document.createElement("div");
    nameCold.innerHTML = `<h1>${restaurantCold[0]["name"]}</h1>`;
    coldstone.appendChild(nameCold);
    let imageCold = document.createElement("div");
    imageCold.innerHTML = `<img src = ${restaurantCold[0]["imageBuilding"]} alt = "McDonald's" width = "400px" height = "250px">`;
    coldstone.appendChild(imageCold);
    let locationCold = document.createElement("div");
    locationCold.innerHTML = `<h3>Location: ${restaurantCold[0]["location"]}</h3>`;
    coldstone.appendChild(locationCold);

} 



