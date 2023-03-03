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
    let mainContainer = document.getElementById("culImage1");
    let div = document.createElement("div");
    let restaurantName = data["Culvers"];
    div.innerHTML = `<h1>${restaurantName[0]["name"]}</h1>`;
    mainContainer.appendChild(div);   
    let div3 = document.createElement("div");
    div3.innerHTML = `<h2> ${restaurantName[0]["foodName"]}</h2>`;
    mainContainer.appendChild(div3);
    let div2 = document.createElement("div");
    div2.innerHTML = `<img src = ${restaurantName[0]["imageFood"]} alt = "french fries" width = "400px" height = "275px">`;
    mainContainer.appendChild(div2);
    let div5 = document.createElement("div");
    div5.innerHTML = `<h3> Price: ${restaurantName[0]["price"]}</h3>`;
    mainContainer.appendChild(div5);
    let div4 = document.createElement("div");
    div4.innerHTML = `<p> Descrption: ${restaurantName[0]["foodDescription"]}</p>`;
    mainContainer.appendChild(div4);
}   