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
    div.innerHTML = `${restaurantName[0]["name"]}`;
    mainContainer.appendChild(div);    
}