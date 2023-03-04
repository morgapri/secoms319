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


function appendData(data)
{
    console.log(data);
    let mainContainer = document.getElementById("coldImage1");
    let div = document.createElement("div");
    let restaurantName = data["ColdStone"];
    div.innerHTML = `<h1>${restaurantName[0]["name"]}</h1>`;
    mainContainer.appendChild(div);   
    let div3 = document.createElement("div");
    div3.innerHTML = `<h2> ${restaurantName[0]["foodName"]}</h2>`;
    mainContainer.appendChild(div3);
    let div2 = document.createElement("div");
    div2.innerHTML = `<img src = ${restaurantName[0]["imageFood"]} alt = "mint ice cream" width = "400px" height = "300px">`;
    mainContainer.appendChild(div2);
    let div5 = document.createElement("div");
    div5.innerHTML = `<h3> Price: ${restaurantName[0]["price"]}</h3>`;
    mainContainer.appendChild(div5);
    let div4 = document.createElement("div");
    div4.innerHTML = `<p> <strong>Description:</strong> ${restaurantName[0]["foodDescription"]}</p>`;
    mainContainer.appendChild(div4);
    
    let mainContainer2 = document.getElementById("coldImage2");
    let foodName = document.createElement("div");
    foodName.innerHTML = `<h2> ${restaurantName[1]["foodName"]}</h2>`;
    mainContainer2.appendChild(foodName);
    let imageFood = document.createElement("div");
    imageFood.innerHTML = `<img src = ${restaurantName[1]["imageFood"]} alt = "chocolate ice cream" width = "400px" height = "300px">`;
    mainContainer2.appendChild(imageFood);
    let price = document.createElement("div");
    price.innerHTML = `<h3> Price: ${restaurantName[1]["price"]}</h3>`;
    mainContainer2.appendChild(price);
    let foodDescription = document.createElement("div");
    foodDescription.innerHTML = `<p> <strong>Description:</strong> ${restaurantName[1]["foodDescription"]}</p>`;
    mainContainer2.appendChild(foodDescription);
}   