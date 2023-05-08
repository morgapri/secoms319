import { useState, useEffect } from "react"; 
import Amounts from './amounts.json'
function App() {
const [product, setProduct] = useState([]); //for all product view
const [viewer1, setViewer1] = useState(true); //for all product view
const [productDetails, setproductDetails] = useState([]); //for single product view
const [viewer3, setViewer3] = useState(true); //for single view
const [index, setIndex] = useState(0); //for delete index
const [checked4, setChecked4] = useState(false); //for delete
const [amounts, setAmounts] = useState(Amounts); //access amount json
const[cart, setCart] = useState([]);
const[cartTotal, setCartTotal] = useState(0);
const [checked5, setChecked5] = useState(false);
  const [index2, setIndex2] = useState(0);
  const [addNewPrice, setAddNewPrice] = useState(0);
let tax = cartTotal.toFixed(2) - (cartTotal.toFixed(2) / 1.1);

useEffect(() => {
  total();
}, [cart])

const showAllItems = product.map((el) => (
  <div key={el._id}>
    <img src={el.image} width={120} /> <br />
    Title: {el.title} <br />
    Category: {el.category} <br />
    Price: ${el.price} <br />
    Amount: {amounts[el._id].amount} <br />
    <button onClick={() => addToCart(el)}>+</button>
    <button onClick={() => removeFromCart(el)}>-</button> <br />
    <button onClick={() => singleProduct(el._id)}>Details</button> <br />
    <br />
  </div>
));

const showproductDetails = productDetails.map((el) => (
  <div key={el._id}>
    <img src={el.image} width={120} /> <br />
    Title: {el.title} <br />
    Category: {el.category} <br />
    Description: {el.description} <br />
    Price: ${el.price} <br />
    Ratings: <ul>{el.rating.map(rating =><li key={rating}>{rating}</li>)}</ul> <br />
    Amount: {amounts[el._id].amount} <br />
    <button onClick={() => addToCart(el)}>+</button>
    <button onClick={() => removeFromCart(el)}>-</button>  
  </div>
)); 

//cart structure
const cartItems = cart.map((el) => (
  <div key={el.id}>
    <img class = "img-fluid" src = {product[el.id -1].image} width={100}/>
    {product[el.id -1].title}:
    ${product[el.id -1].price}:
    x{el.amount}
    <br />
  </div>
))

//add new product
const [addNewProduct, setAddNewProduct] = useState({
  _id: 0,
  title: "",
  price: 0.0,
  description: "",
  category: "",
  image: "http://127.0.0.1:4000/images/",
  rating: [""]
});


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

//show product functions
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

//cart functions
const addToCart = (el) => {
  if(amounts[el._id].amount == 0){
    setCart([...cart, amounts[el._id]])
    {amounts[el._id].amount++}
  }
  else{
    let id;
    for(let j = 0; j < cart.length; j++){
      if(cart[j].id == el._id){
        id = j;
      }
    }
    let hardCopy = [...cart];
    hardCopy[id].amount = amounts[el._id].amount++;
    {amounts[el._id].amount++}
    setCart(hardCopy)
  }
}

const removeFromCart = (el) =>{
  let id;
  let hardCopy;
  for(let j = 0; j < cart.length; j++){
    if(cart[j].id == el._id){
      id = j;
    }
  }

  if(amounts[el._id].amount > 1){
    hardCopy = [...cart];
    hardCopy[id].amount = amounts[el._id].amount--;
    setCart(hardCopy)
  }
  else{
    hardCopy = [...cart];
    hardCopy = hardCopy.filter((cartItem) => cartItem.id != el._id);
    setCart(hardCopy);
  }
  if(amounts[el._id].amount > 0){
    {amounts[el._id].amount--}
  }
}

const total = () => {
  let totalVal = 0;
  let tax = 1.1;
  for(let i = 0; i < cart.length; i++){
    totalVal+=product[cart[i].id-1].price * cart[i].amount;
  }
  totalVal = totalVal * tax;
  setCartTotal(totalVal);
}

//add functions
function handlePostChange(evt) {
  const value = evt.target.value;
  if (evt.target.name === "_id") {
    setAddNewProduct({ ...addNewProduct, _id: value });
  } else if (evt.target.name === "title") {
    setAddNewProduct({ ...addNewProduct, title: value });
  } else if (evt.target.name === "price") {
    setAddNewProduct({ ...addNewProduct, price: value });
  } else if (evt.target.name === "description") {
    setAddNewProduct({ ...addNewProduct, description: value });
  } else if (evt.target.name === "category") {
    setAddNewProduct({ ...addNewProduct, category: value });
  } else if (evt.target.name === "image") {
    const temp = value;
    setAddNewProduct({ ...addNewProduct, image: temp });
  } else if (evt.target.name === "rate") {
    setAddNewProduct({ ...addNewProduct, rating: [value]  });
  } 
}

function handleOnSubmit(e) {
  e.preventDefault();
  console.log(e.target.value);
  fetch("http://localhost:4000/insert", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(addNewProduct),
  })
  .then((response) => response.json())
  .then((data) => {
    console.log("Post a new product completed");
    console.log(data);
    if (data) {
      //const keys = Object.keys(data);
      const value = Object.values(data);
      alert(value);
    }
  });
}

//delete functions
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

//update functions
function getOneByOneProductNext2() {
  if (product.length > 0) {
    if (index2 === product.length - 1) setIndex2(0);
    else setIndex2(index2 + 1);
    if (product.length > 0) setChecked5(true);
    else setChecked5(false);
  }
}

function getOneByOneProductPrev2() {
  if (product.length > 0) {
    if (index2 === 0) setIndex2(product.length - 1);
    else setIndex2(index2 - 1);
    if (product.length > 0) setChecked5(true);
    else setChecked5(false);
  }
}
function updateOneProduct(updateid, new_price) {
  console.log("Product to update :", updateid);
  console.log("Value to update :", new_price);
  fetch("http://localhost:4000/update/", {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ _id: updateid , price: new_price}),
  })
    .then((response) => response.json())
    .then((data) => {
      console.log("Updating the product's price completed : ", updateid);
      console.log(data);
      if (data) {
        //const keys = Object.keys(data);
        const value = Object.values(data);
        alert(value);
      }
    });
  setChecked5(!checked5);
}
function handleUpdateChange(evt){
  setAddNewPrice(evt.target.value);
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
        <h1>Welcome to our Final Project</h1> <br />
        <p>SE/ComS 319 Construction of User Interfaces, Spring 2023</p> <br />
        <p>Instructor: Dr. Abraham N. Aldaco Gastelum aaldaco@iastate.edu</p> <br />
        <h3>Creators</h3>  <br />
        <p>Paige Schneider: schnpa@iastate.edu</p> <br />
        <p>Morgan Prieskorn: mopriesk@iastate.edu</p> <br />
        <hr></hr>
      </div>
      <div id="admin">
        <div id="addItem">
          <h3>Add a new product :</h3>
          <form action="">
            <input type="number" placeholder="id?" name="_id" value={addNewProduct._id} onChange={handlePostChange}/>
            <input type="text" placeholder="title?" name="title" value={addNewProduct.title} onChange={handlePostChange} />
            <input type="number" placeholder="price?" name="price" value={addNewProduct.price} onChange={handlePostChange} /> <br />
            <input type="text" placeholder="description?" name="description" value={addNewProduct.description} onChange={handlePostChange} />
            <input type="text" placeholder="category?" name="category" value={addNewProduct.category} onChange={handlePostChange} />
            <input type="text" placeholder="image?" name="image" value={addNewProduct.image} onChange={handlePostChange} /> <br />
            <input type="text" placeholder="rate?" name="rate" value={addNewProduct.rating} onChange={handlePostChange} />
            <button type="submit" onClick={handleOnSubmit}>
            submit
            </button>
          </form><br />
        </div>

        <div id="deleteItem">
          <h3>Delete a product</h3>
          <input type="checkbox" id="acceptdelete" name="acceptdelete" checked={checked4} onChange={(e) => setChecked4(!checked4)} /> <br />
          {checked4 && (
            <div key={product[index]._id}>
            <img src={product[index].image} width={30} /> <br />
            Id:{product[index]._id} <br />
            Title: {product[index].title} <br />
            Category: {product[index].category} <br />
            Price: ${product[index].price} <br />
          </div>
          )} <br />
          <button onClick={() => getOneByOneProductPrev()}>Prev</button>
          <button onClick={() => getOneByOneProductNext()}>Next</button>
          <button onClick={() => deleteOneProduct(product[index]._id)}>Delete</button>
          
        </div>
        <div id="updateItem">
        <h3>Edit one product:</h3>
        <input type="checkbox" id="acceptupdate" name="acceptdelete" checked={checked5} onChange={(e) => setChecked5(!checked5)} />
        <button onClick={() => getOneByOneProductPrev2()}>Prev</button>
        <button onClick={() => getOneByOneProductNext2()}>Next</button>
        {checked5 && (
          <div>
            <input type="number" placeholder="New Price" name="updated_price" value={addNewPrice} onChange={handleUpdateChange} />
            <button onClick={() => updateOneProduct(product[index2]._id, addNewPrice)}>Update</button>
            <div key={product[index2]._id}>
              <img src={product[index2].image} width={30} /> <br />
              Id:{product[index2]._id} <br />
              Title: {product[index2].title} <br />
              Category: {product[index2].category} <br />
              Price: {product[index2].price} <br />
              Rate :{product[index2].rating.rate} and Count:
              {product[index2].rating.count} <br />
            </div>
          </div>
        )}
        </div>
        <hr></hr>
      </div>
      <div id="productspage">
        <h1>Catalog of Products</h1>
        <hr></hr>
        <div id="productList">{viewer1 && <div>{showAllItems}</div>}</div>
        <div id="productSingle">{viewer3 && 
          <div>{showproductDetails} <br /></div>}
        </div>
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