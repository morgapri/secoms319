import { useState, useEffect } from "react"; 
function App() {
const [product, setProduct] = useState([]); //for product view
const [viewer1, setViewer1] = useState(true);
const [productDetails, setproductDetails] = useState([]); //for single product view
const [viewer3, setViewer3] = useState(true);
const [addReview, setReview] = useState("");//the review added
const [index, setIndex] = useState(0); //for delete index
 const [checked4, setChecked4] = useState(false);

//cart
const [ProductsCategory, setProductsCategory] = useState(product);
  const [query, setQuery] = useState('');
  const[cart, setCart] = useState([]);
  const[cartTotal, setCartTotal] = useState(0);
  let tax = cartTotal.toFixed(2) - (cartTotal.toFixed(2) / 1.1);

const showAllItems = product.map((el) => (
  <div key={el._id}>
  <img src={el.image} width={40} /> <br />
  Title: {el.title} <br />
  Category: {el.category} <br />
  Price: ${el.price} <br />
  Amount: {el.amount} <br />
  <button onClick={() => updateAddProduct(el)}>+</button>
  <button onClick={() => updateRemoveProduct(el)}>-</button> <br />
  <button onClick={() => singleProduct(el._id)}>Details</button> <br />
  </div>
  ));

window.addEventListener('load', () => showHome());

function showHome(){
  document.getElementById('homepage').setAttribute('style', 'display: initial')
  document.getElementById('admin').setAttribute('style', 'display: none')
  document.getElementById('productspage').setAttribute('style', 'display: none')
  document.getElementById('cart').setAttribute('style', 'display: none')
  document.getElementById('form').setAttribute('style', 'display: none')
}
function  showProducts(){
  document.getElementById('homepage').setAttribute('style', 'display: none')
  document.getElementById('admin').setAttribute('style', 'display: none')
  document.getElementById('productspage').setAttribute('style', 'display: initial')
  document.getElementById('cart').setAttribute('style', 'display: initial')
  document.getElementById('form').setAttribute('style', 'display: none')
}
function showCheckout(){
  document.getElementById('homepage').setAttribute('style', 'display: none')
  document.getElementById('admin').setAttribute('style', 'display: none')
  document.getElementById('productspage').setAttribute('style', 'display: none')
  document.getElementById('cart').setAttribute('style', 'display: initial')
  document.getElementById('form').setAttribute('style', 'display: initial')
}
function showAdmin(){
  document.getElementById('homepage').setAttribute('style', 'display: none')
  document.getElementById('admin').setAttribute('style', 'display: initial')
  document.getElementById('productspage').setAttribute('style', 'display: none')
  document.getElementById('cart').setAttribute('style', 'display: none')
  document.getElementById('form').setAttribute('style', 'display: none')
}

function getAllProducts() {
  document.getElementById('productList').setAttribute('style', 'display: initial');
  document.getElementById('productSingle').setAttribute('style', 'display: none');
  fetch("http://localhost:4000/")
  .then((response) => response.json())
  .then((data) => {
  console.log("Show Catalog of Products :");
  console.log(data);
  setProduct(data);
  });
  setViewer1(viewer1);
  }

  function singleProduct(id){
    document.getElementById('productList').setAttribute('style', 'display: none');
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
      setViewer3(viewer3);
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
    Description: {el.description} <br />
    Price: ${el.price} <br />
    Amount: {el.amount} <br />
    <button onClick={() => updateAddProduct(el)}>+</button>
    <button onClick={() => updateRemoveProduct(el)}>-</button>
    Ratings: <ul>{el.rating.map(rating =><li key={rating}>{rating}</li>)}</ul> <br />
    </div>
  ));

//stuff from assignment 2 cart
  useEffect(() => {
      total();
  }, [cart])

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

  const cartItems = cart.map((el) => (
      <div key={el.id}>
          <img class = "img-fluid" src = {el.image} width={100}/>
          {el.title}:
           ${el.price}:
          x{el.amount}
      </div>
  ))

  function updateAddProduct(el) {
    console.log("Product to update :", el._id);
    console.log("Value to update add 1 :", el.amount);

    if(el.amount == 0){
      setCart([...cart, el])
      {el.amount++}
    }
    else{
      let id;
      for(let j = 0; j < cart.length; j++){
        if(cart[j].id == el._id){
          id = j;
        }
      }
      let hardCopy = [...cart];
      hardCopy[id].amount = el.amount++;
      {el.amount++}
      setCart(hardCopy)
    }
    fetch("http://localhost:4000/update/", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ _id: el._id , amount: el.amount}),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Updating the product's price completed : ", el._id);
        console.log(data);
        if (data) {
          //const keys = Object.keys(data);
          const value = Object.values(data);
          alert(value);
        }
      });
    //setChecked5(!checked5);
  }

  function updateRemoveProduct(el) {
    console.log("Product to update :", el._id);
    console.log("Value to update subtract 1 :", el.amount);

    let id;
    let hardCopy = [...cart];
      for(let j = 0; j < cart.length; j++){
        if(cart[j].id == el._id){
          id = j;
        }
      }

    if(el.amount > 1){
      hardCopy[id].amount = el.amount--;
      setCart(hardCopy)
    }
    else{
      hardCopy = hardCopy.filter((cartItem) => cartItem.id != el.id);
      setCart(hardCopy);
      
    }
    if(el.amount > 0){
      {el.amount--}
    }
    
    
    fetch("http://localhost:4000/update/", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ _id: el._id , amount: el.amount}),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Updating the product's price completed : ", el._id);
        console.log(data);
        if (data) {
          //const keys = Object.keys(data);
          const value = Object.values(data);
          alert(value);
        }
      });
    //setChecked5(!checked5);
  }

  function getOneByOneProductNext() {
    if (product.length > 0) {
      if (index === product.length - 1) setIndex(0);
      else setIndex(index + 1);
      if (product.length > 0) setViewer1(true);
      else setViewer1(false);
    }
  }

  function getOneByOneProductPrev() {
    if (product.length > 0) {
      if (index === 0) setIndex(product.length - 1);
      else setIndex(index - 1);
      if (product.length > 0) setViewer1(true);
      else setViewer1(false);
    }
  }

  function deleteOneProduct(deleteid) {
    console.log("Product to delete :", deleteid);
    fetch("http://localhost:4000/delete/", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ _id: deleteid }),
    })
    .then((response) => response.json())
    .then((data) => {
      console.log("Delete a product completed : ", deleteid);
      console.log(data);
      if (data) {
        //const keys = Object.keys(data);
        const value = Object.values(data);
        alert(value);
      }
    });
    setChecked4(!checked4);
  }

  function showProductToDelete(id){
    setIndex(id);
    <div>
      <img src={product[id].image} width={40}/> <br />
      Title: {product[id].title} <br />
    </div>
  }

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

return (
  <div>
    <div id="navbar" class="container-fluid">
        <nav class="navbar navbar-expand navbar-dark bg-fark">
          <button id="home" onClick={() => showHome()}>Home</button>
          <button id="products" onClick={() => {getAllProducts(); showProducts();}}>Products</button>
          <button id="adminbutton" onClick={() => showAdmin()}>Admin</button>
          <button id="checkout" onClick={() => showCheckout()}>Checkout</button>
        </nav>
    </div>

    <hr></hr>
    <div id="body">
      <div id="homepage">
        <h1>Welcome to our final Project</h1> <br />
        <p>SE/ComS 319 Construction of User Interfaces, Spring 2023</p> <br />
        <p>Paige Schneider: schnpa@iastate.edu</p> <br />
        <p>Morgan Prieskorn: mopriesk@iastate.edu</p> <br />
        <p>Instructor: Dr. Abraham N. Aldaco Gastelum aaldaco@iastate.edu</p>
        <hr></hr>
      </div>
      <div id="admin">
      <div>
      <input type="checkbox" id="acceptdelete" name="acceptdelete" checked={checked4}
        onChange={(e) => setChecked4(!checked4)} />
        <button onClick={() => getOneByOneProductPrev()}>Prev</button>
        <button onClick={() => getOneByOneProductNext()}>Next</button>
        <button onClick={() => deleteOneProduct(product[index]._id)}>Delete</button>
        {checked4 && (
          <div key={product[index]._id}>
          <img src={product[index].image} width={30} /> <br />
          Id:{product[index]._id} <br />
          Title: {product[index].title} <br />
          Category: {product[index].category} <br />
          Price: ${product[index].price} <br />
          </div>
        )}
        <hr></hr>
          </div>
        <hr></hr>
      </div>
      <div id="productspage">
        
        <h1>Catalog of Products</h1>
        <div id="productList">{viewer1 && <div>Products {showAllItems}</div>}</div>
        <div id="productSingle">{viewer3 && 
        <div>Product: {showproductDetails} <br />
        </div>}</div>
        <hr></hr>
      </div>
      <div id="cart">
        <h3>Cart</h3>
        <div>{cartItems}</div>
        
      <p>Tax (10%): ${tax.toFixed(2)}</p>
      <p>Total: ${cartTotal.toFixed(2)}</p>
      </div>
      <div id="checkoutpage">
        {/*data for order form in index.js file in frontend, access with id form */}
      </div>
    </div>
  </div>
  )};

 // App end
export default App