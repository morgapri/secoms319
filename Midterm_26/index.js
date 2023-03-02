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
    let mainContainer = document.getElementById("restaurants");
    for (let restaurantName in data) {
        let div = document.createElement("div");
        div.innerHTML = `<br> <br> <h2> ${restaurantName} </h2>`;
        mainContainer.appendChild(div);
        //let mainContainer2 = document.getElementById("data");
        for (let element of data[restaurantName]) {
            console.log(element);
            let div2 = document.createElement("div");
            div2.innerHTML = `${element["id"]} : ${element["foodName"]} <br>`;
            mainContainer.appendChild(div2);
        }
    }
}          
