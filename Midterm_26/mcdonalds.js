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
    let mainContainer = document.getElementById("mcImage1");
    let div = document.createElement("div");
    let restaurantName = data["McDonalds"];
    div.innerHTML = `<h1>${restaurantName[0]["name"]}</h2>`;
    mainContainer.appendChild(div);   
    let div2 = document.createElement("div");
    div2.innerHTML = `<img src = ${restaurantName[0]["imageFood"]} alt = "french fries" width = "300px" height = "400px">` 
    mainContainer.appendChild(div2);
}