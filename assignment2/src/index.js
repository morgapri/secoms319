import React from 'react';
import ReactDOM from 'react-dom/client';
import {useState, useEffect} from "react";
import './index.css';
import Products from './Products.json'

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <div>
    <div id = 'order'>
    <DisplayItems />
    
    </div>
    
    <div id = 'return' className='hidden'>
    <Return/>
    </div>
  </div>
  
);

/*function CheckOut() {
  
  return (
  <button id='checkout' onClick={() => {hide();}}>Check Out</button>
  
  )
}*/

function Return() {
  return (
    <button onClick ={reveal}>Return</button>
  )
  
}

function reveal() {
  document.getElementById('checkout').classList.remove('hidden')
  document.getElementById('container').classList.remove('container')
  document.getElementById('container').classList.add('hidden')
  document.getElementById('return').classList.add('hidden')
  document.getElementById('order-form').classList.remove('hidden')
}

function hide() {
  document.getElementById('checkout').className = 'hidden'
  document.getElementById('checkout').classList.add('hidden')
  document.getElementById('order-form').classList.add('hidden')
  
  document.getElementById('container').classList.add('container')
  document.getElementById('container').classList.remove('hidden')
  document.getElementById('return').classList.remove('hidden')

  //document.getElementById('order').innerHTML = '<div id="order" className="hidden"' 
}

function DisplayItems(){
  const [ProductsCategory, setProductsCategory] = useState(Products);
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
    setProductsCategory(Products);
  }
  
  console.log(document.getElementById("checkout"));
  return <div>
    <div id = 'order-form'>
    <div class="search">
      <label>Search🔎 </label>
      <input class="search" value={query} onChange={handleChange} />
      <button type="button" value={query} onClick={clear}>Clear</button>
    </div>
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
      </div>
    ))}
    </div>
    <h3>Cart</h3>
    <div>{cartItems}</div>
    <p>Tax (10%): ${tax.toFixed(2)}</p>
    <p>Total: ${cartTotal.toFixed(2)}</p>
    <button id='checkout' onClick={() => {hide();clear();}}>Check Out</button>
  </div>
  
}


//order form
const alertPlaceholder = document.getElementById('liveAlertPlaceholder')
const form = document.getElementById('checkout-form')
const inputCard = document.querySelector('#inputCard')
const alertTrigger = document.getElementById('submit-btn')
const summaryCard = document.querySelector('.card')
const summaryList = document.querySelector('.card > ul')
var order = { name: '',
  email: '',
  card: '' }

const state = document.getElementById('inputState');
let addOption = function(){
  let arr = ["Alabama", "Alaska", "Arizona", "Arkansas", "California", "Colorado", "Connecticut",
    "Delaware", "Florida", "Georgia", "Hawaii", "Idaho", "Illinois", "Indiana", "Iowa", "Kansas",
    "Kentucky", "Louisiana", "Maine", "Maryland", "Massachusetts", "Michigan", "Minnesota", 
    "Mississippi", "Missouri", "Montana", "Nebraska", "Nevada", "New Hampshire", "New Jersey",
    "New Mexico", "New York", "North Carolina", "North Dakota", "Ohio", "Oklahoma", "Oregon",
    "Pennsylvania", "Rhode Island", "South Carolina", "South Dakota", "Tennessee", "Texas", "Utah",
    "Vermont", "Virginia", "Washington", "West Virginia", "Wisonsin", "Wyoming"];
  let option;
  let text;
  for(const name of arr){
    option = document.createElement('option');
    text = document.createTextNode(name);
    option.appendChild(text);
    state.appendChild(option);
  }
}

addOption();

const alert = (message, type) => {
    const wrapper = document.createElement('div')

    wrapper.innerHTML = [
    
    `<div class="alert alert-${type} alert-dismissible" role="alert">`,
    
    ` <div>${message}</div>`,
    
    ' <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>',
    
    '</div>'
    
    ].join('')
    
    alertPlaceholder.append(wrapper)
    
    }

    function isNumeric (n) {

        return !isNaN(parseFloat(n)) && isFinite(n)
        
        }
        
        inputCard.addEventListener('input', event => {
        
        if (!inputCard.value) {
        
        return event.preventDefault() // stops modal from being shown
        
        } else {
        
        inputCard.value = inputCard.value.replace(/-/g, '')
        
        let newVal = ''
        
        for (var i = 0, nums = 0; i < inputCard.value.length; i++) {
        
        if (nums != 0 && nums % 4 == 0) {
        
        newVal += '-'
        
        }
        
        newVal += inputCard.value[i]
        
        if (isNumeric(inputCard.value[i])) {
        
        nums++
        
        }
        
        }
        
        inputCard.value = newVal
        
        }
        
        })

        form.addEventListener('submit', event => {

            //if (!form.checkValidity()) {
            
            
            if (!validate()) {
            
            alertPlaceholder.innerHTML = ''
            
            alert('<i class="bi-exclamation-circle"></i> Something went wrong!','danger')
            
            }
            
            event.preventDefault()
            
            event.stopPropagation()
            
            //form.classList.add('was-validated')
            
            }, false )

let validate = function(){
  let val = true
  let email = document.getElementById('inputEmail4')
  let name = document.getElementById('inputName')
  let card = document.getElementById('inputCard')
  let zip = document.getElementById('inputZip')
  let address = document.getElementById('inputAddress');
  let city = document.getElementById('inputCity');
  let state = document.getElementById('inputState');
  
  if (!email.value.match(
    /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      )){
    email.setAttribute("class", "form-control is-invalid");
    val = false;
  }
  else{
      email.setAttribute("class", "form-control is-valid");
      order.email = email.value
  }

  if (name.value.length == 0)
  {
    name.setAttribute("class","form-control is-invalid")
    val = false
  }
  else{
    name.setAttribute("class", "form-control is-valid");
    order.name = name.value
  }

  if (!card.value.match(/^[0-9]{4}\-[0-9]{4}\-[0-9]{4}\-[0-9]{4}$/))
  {
    card.setAttribute("class","form-control is-invalid")
    val = false
  }
  else{
    card.setAttribute("class", "form-control is-valid");
    order.card = card.value
  }

  if(!zip.value.match(/^[0-9]{5}$/))
  {
    zip.setAttribute("class","form-control is-invalid")
    val = false;
  }
  else{
    zip.setAttribute("class", "form-control is-valid")
  }
  if (address.value.length == 0)
  {
    address.setAttribute("class","form-control is-invalid")
    val = false
  }
  else{
    address.setAttribute("class", "form-control is-valid");
  }
  if (city.value.length == 0)
  {
    city.setAttribute("class","form-control is-invalid")
    val = false
  }
  else{
    city.setAttribute("class", "form-control is-valid");
  }
  if (state.value == "Choose...")
  {
    state.setAttribute("class","form-control is-invalid")
    val = false
  }
  else{
    state.setAttribute("class", "form-control is-valid");
  }

  if (val){
    form.classList.add("collapse")

    for (const [key, value] of Object.entries(order)) {
        summaryList.innerHTML += '<li class="list-group-item"> <b>' + `${key}` + ': </b>' + `${value}` +'</li>'
    }
    summaryCard.classList.remove("collapse")
    alertPlaceholder.innerHTML = ""
    alert('<i class="bi-cart-check-fill"></i> You have made an order!', 'success')
  }
  return val;
}


