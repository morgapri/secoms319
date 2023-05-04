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
          <h1>Search</h1>
          <input type="text" id="message" name="message" placeholder="id" /*onChange={(e) =>getOneProduct(e.target.value)}*/ />
        </nav>
    </div>
    <hr></hr>
    <div id="body">
    <h1>Catalog of Products</h1>
    <button onClick={() => getAllProducts()}>Show All products</button>
    <h1>Show all available Products.</h1>
    <hr></hr>
    {viewer1 && <div>Products {showAllItems}</div>}
    <hr></hr>
    </div>
  </div>
  )

} // App end
export default App;