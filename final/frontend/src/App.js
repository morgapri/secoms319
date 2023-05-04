import { useState, useEffect } from "react";
function App() {
const [product, setProduct] = useState([]);
const [viewer1, setViewer1] = useState(false);

const showAllItems = product.map((el) => (
  <div key={el._id}>
  <img src={el.image} width={40} /> <br />
  Title: {el.title} <br />
  Category: {el.category} <br />
  Price: {el.price} <br />
  Rate :{el.rating.rate} and Count:{el.rating.count} <br />
  </div>
  ));
  
window.addEventListener('load', () => showHome());

function showHome(){
  document.getElementById('homepage').setAttribute('style', 'display: initial')
  document.getElementById('productspage').setAttribute('style', 'display: none')
  document.getElementById('cart').setAttribute('style', 'display: none')
  document.getElementById('checkoutpage').setAttribute('style', 'display: none')
}
function  showProducts(){
  document.getElementById('homepage').setAttribute('style', 'display: none')
  document.getElementById('productspage').setAttribute('style', 'display: initial')
  document.getElementById('cart').setAttribute('style', 'display: initial')
  document.getElementById('checkoutpage').setAttribute('style', 'display: none')
}
function showCheckout(){
  document.getElementById('homepage').setAttribute('style', 'display: none')
  document.getElementById('productspage').setAttribute('style', 'display: none')
  document.getElementById('cart').setAttribute('style', 'display: initial')
  document.getElementById('checkoutpage').setAttribute('style', 'display: initial')
}
//functions to hide all but specific product clicked

function getAllProducts() {
  fetch("http://localhost:4000/")
  .then((response) => response.json())
  .then((data) => {
  console.log("Show Catalog of Products :");
  console.log(data);
  setProduct(data);
  });
  setViewer1(!viewer1);
  }
  

return (
  <div>
    <div id="navbar" class="container-fluid">
        <nav class="navbar navbar-expand navbar-dark bg-fark">
          <button id="home" onClick={() => showHome()}>Home</button>
          <button id="products" onClick={() => {getAllProducts(); showProducts();}}>Products</button>
          
          <button id="checkout" onClick={() => showCheckout()}>Checkout</button>
        </nav>
    </div>

    <hr></hr>
    <div id="body">
      <div id="homepage">
        <p>personal info here</p>
        <hr></hr>
      </div>
      <div id="productspage">
        <h1>Catalog of Products</h1>
        
        <div id="productList">{viewer1 && <div>Products {showAllItems}</div>}</div>
        <hr></hr>
      </div>
      <div id="cart">

      </div>
      <div id="checkoutpage">

      </div>
    </div>
  </div>
  )

} // App end
export default App;