import { useState, useEffect } from "react";
function App() {
const [product, setProduct] = useState([]);
const [viewer1, setViewer1] = useState(false);

const showAllItems = product.map((el) => (
  <div key={el._id}>
  <img src={el.image} width={30} /> <br />
  Title: {el.title} <br />
  Category: {el.category} <br />
  Price: {el.price} <br />
  Rate :{el.rating.rate} and Count:{el.rating.count} <br />
  </div>
  ));
  

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
          <button id="home">Home</button>
          <button id="products" onClick={() => getAllProducts()}>Products</button>
          
          <button id="checkout">Checkout</button>
        </nav>
    </div>
    <hr></hr>
    <div id="body">
      <div id="products">
        <h1>Catalog of Products</h1>
        
        <div id="productList">{viewer1 && <div>Products {showAllItems}</div>}</div>
        <hr></hr>
      </div>
      <div id="cart">

      </div>
      <div id="checkout">

      </div>
    </div>
  </div>
  )

} // App end
export default App;