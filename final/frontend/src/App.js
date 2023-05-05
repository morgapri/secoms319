import { useState, useEffect } from "react"; 
function App() {
const [product, setProduct] = useState([]);
const [viewer1, setViewer1] = useState(false);
const [oneProduct, setOneProduct] = useState([]);
const [viewer2, setViewer2] = useState(false);
const [productDetails, setproductDetails] = useState([]);
const [viewer3, setViewer3] = useState(false);

const showAllItems = product.map((el) => (
  <div key={el._id}>
  <img src={el.image} width={40} /> <br />
  Title: {el.title} <br />
  Category: {el.category} <br />
  Price: {el.price} <br />
  Amount: {el.amount} <br />
  <button>+</button>
  <button>-</button> <br />
  <button onClick={() => singleProduct(el._id)}>Details</button> <br />
  </div>
  ));
  
  const showOneItem = oneProduct.map((el) => (
    <div key={el._id}>
    <img src={el.image} width={40} /> <br />
    Title: {el.title} <br />
    Category: {el.category} <br />
    Category: {el.category} <br />
    Price: ${el.price} <br />
    Rate: {el.rating.rate} and Count: {el.rating.count} <br />
    </div>
  ));

window.addEventListener('load', () => showHome());

function showHome(){
  document.getElementById('homepage').setAttribute('style', 'display: initial')
  document.getElementById('productspage').setAttribute('style', 'display: none')
  document.getElementById('cart').setAttribute('style', 'display: none')
  document.getElementById('form').setAttribute('style', 'display: none')
}
function  showProducts(){
  document.getElementById('homepage').setAttribute('style', 'display: none')
  document.getElementById('productspage').setAttribute('style', 'display: initial')
  document.getElementById('cart').setAttribute('style', 'display: initial')
  document.getElementById('form').setAttribute('style', 'display: none')
}
function showCheckout(){
  document.getElementById('homepage').setAttribute('style', 'display: none')
  document.getElementById('productspage').setAttribute('style', 'display: none')
  document.getElementById('cart').setAttribute('style', 'display: initial')
  document.getElementById('form').setAttribute('style', 'display: initial')
}
//functions to hide all but specific product clicked

function getAllProducts() {
  document.getElementById('productList').setAttribute('style', 'display: initial');
  document.getElementById('productSearch').setAttribute('style', 'display: none');
  document.getElementById('productSingle').setAttribute('style', 'display: none');
  fetch("http://localhost:4000/")
  .then((response) => response.json())
  .then((data) => {
  console.log("Show Catalog of Products :");
  console.log(data);
  setProduct(data);
  });
  setViewer1(!viewer1);
  }
  
  function getOneProduct(id) {
    document.getElementById('productList').setAttribute('style', 'display: none');
  document.getElementById('productSearch').setAttribute('style', 'display: initial');
  document.getElementById('productSingle').setAttribute('style', 'display: none');
    console.log(id);
    if (id >= 1 && id <= 20) {
      fetch("http://localhost:4000/" + id)
      .then((response) => response.json())
      .then((data) => {
        console.log("Show one product :", id);
        console.log(data);
        const dataArr = [];
        dataArr.push(data);
        setOneProduct(dataArr);
      });
      setViewer2(!viewer2);
    } 
    else {
      console.log("Wrong number of Product id.");
    }
  }

//stuff from assignment 2 cart
 const [ProductsCategory, setProductsCategory] = useState(product);
  const [query, setQuery] = useState('');
  const[cart, setCart] = useState([]);
  const[cartTotal, setCartTotal] = useState(0);
  let tax = cartTotal.toFixed(2) - (cartTotal.toFixed(2) / 1.1);

  useEffect(() => {
      total();
  }, [cart])

  const addToCart = (el) => {
    if(el.amount == 0){
      setCart([...cart, el])
      {el.amount++}
    }
    else{
      let id;
      for(let j = 0; j < cart.length; j++){
        if(cart[j].id == el.id){
          id = j;
        }
      }
      let hardCopy = [...cart];
      hardCopy[id].amount = el.amount++;
      {el.amount++}
      setCart(hardCopy)
    }
  }

  const total = () => {
      let totalVal = 0;
      let tax = 1.1;
      for(let i = 0; i < cart.length; i++)
      {
          totalVal+=cart[i].price*cart[i].amount;
      }
      totalVal = totalVal * tax;
      setCartTotal(totalVal);
  }

  const removeFromCart = (el) =>
  {
    let id;
    let hardCopy;
      for(let j = 0; j < cart.length; j++){
        if(cart[j].id == el.id){
          id = j;
        }
      }

    if(el.amount > 1){
      hardCopy = [...cart];
      hardCopy[id].amount = el.amount--;
      setCart(hardCopy)
    }
    else{
      hardCopy = [...cart];
      hardCopy = hardCopy.filter((cartItem) => cartItem.id != el.id);
      setCart(hardCopy);
    }
    if(el.amount > 0){
      {el.amount--}
    }
  }

  const cartItems = cart.map((el) => (
      <div key={el.id}>
          <img class = "img-fluid" src = {el.image} width={100}/>
          {el.title}:
           ${el.price}:
          x{el.amount}
      </div>
  ))

  const handleChange = (e) => {
    setQuery(e.target.value);
    const results = ProductsCategory.filter(eachProduct => {
   
    if (e.target.value === "") return ProductsCategory;
    return eachProduct.title.toLowerCase().includes(e.target.value.toLowerCase())
    });
    setProductsCategory(results);
  }

  function clear() {
    setProductsCategory(product);
  }

  //single product descriptions

  function singleProduct(id){
    document.getElementById('productList').setAttribute('style', 'display: none');
  document.getElementById('productSearch').setAttribute('style', 'display: none');
  document.getElementById('productSingle').setAttribute('style', 'display: initial');
    console.log(id);
    if (id >= 1 && id <= 20) {
      fetch("http://localhost:4000/" + id)
      .then((response) => response.json())
      .then((data) => {
        console.log("Show single product :", id);
        console.log(data);
        const dataArr = [];
        dataArr.push(data);
        setproductDetails(dataArr);
      });
      setViewer3(!viewer3);
    } 
    else {
      console.log("Wrong number of Product id.");
    }
  }

  const showproductDetails = productDetails.map((el) => (
    <div key={el._id}>
    <img src={el.image} width={40} /> <br />
    Title: {el.title} <br />
    Category: {el.category} <br />
    Category: {el.category} <br />
    Price: ${el.price} <br />
    Rate: {el.rating.rate} and Count: {el.rating.count} <br />
    </div>
  ));

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
        <input type="text" id="message" name="message" placeholder="id" onChange={(e) =>getOneProduct(e.target.value)} />
        <button onClick={() => clear()}>Clear</button>
        <button onClick={() => showProducts()}>Show All</button>
        
        <h1>Catalog of Products</h1>
        <div id="productList">{viewer1 && <div>Products {showAllItems}</div>}</div>
        <div id="productSearch">{viewer2 && <div>Product: {showOneItem}</div>}</div>
        <div id="productSingle">{viewer3 && <div>Product: {showproductDetails}</div>}</div>
        <hr></hr>
      </div>
      <div id="cart">
        {ProductsCategory.map((product, index) => (
      <div key={index} >
        <img alt="Product Image" src={product.image} />
        <h3>{product.title}</h3>
        <p class="price">${product.price}</p>
        <p>{product.description}</p>
        <button type="button" onClick={() => removeFromCart(product)}>-</button>{" "}
        <button type="button" variant="light" onClick={() => addToCart(product)}>+</button>
        <p>Amount: {product.amount}</p>
        <div class="gap"></div>
        <h3>Cart</h3>
    <div>{cartItems}</div>
    <p>Tax (10%): ${tax.toFixed(2)}</p>
    <p>Total: ${cartTotal.toFixed(2)}</p>
      </div>
    ))}
      </div>
      <div id="checkoutpage">
        {/*data for order form in index.js file in frontend, access with id form */}
      </div>
    </div>
  </div>
  )

} // App end
export default App;