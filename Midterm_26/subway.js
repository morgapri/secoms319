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
    let mainContainer = document.getElementById("subImage1");
    let div = document.createElement("div");
    let restaurantName = data["Subway"];
    div.innerHTML = `<h1>${restaurantName[0]["name"]}</h1>`;
    mainContainer.appendChild(div);   
    let div3 = document.createElement("div");
    div3.innerHTML = `<h2> ${restaurantName[0]["foodName"]}</h2>`;
    mainContainer.appendChild(div3);
    let div2 = document.createElement("div");
    div2.innerHTML = `<img src = ${restaurantName[0]["imageFood"]} alt = "sandwich" width = "400px" height = "250px">`;
    mainContainer.appendChild(div2);
    let div5 = document.createElement("div");
    div5.innerHTML = `<h3> ${restaurantName[0]["price"]}</h3>`;
    mainContainer.appendChild(div5);
    let div4 = document.createElement("div");
    div4.innerHTML = `<p> ${restaurantName[0]["foodDescription"]}</p>`;
    mainContainer.appendChild(div4);
}   