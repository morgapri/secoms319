import React from 'react';
import ReactDOM from 'react-dom/client';
import {useState, useEffect} from "react";
import './index.css';
import {Products} from './Products'

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <div id='order'>
    <DisplayItems />
    <Counter/>
    <CheckOut/>
    
  </div>
);

function CheckOut() {
  
  return (

  <button id='checkout' onClick={hide}>Check Out</button>
  )
}

function hide() {
  document.getElementById('checkout').className = 'hidden'
  document.getElementById('checkout').classList.add('hidden')
  document.getElementId("order").className = "hidden"
}
function Counter() {
  const [toaster, setToaster] = useState(0);
  const [fan, setFan] = useState(0);
  const [eggs, setEggs] = useState(0);
  const [couch, setCouch] = useState(0);
  const [flowers, setFlowers] = useState(0);
  const [mug, setMug] = useState(0);
  return (
  <div className='counter'>
  <h1>Cart: </h1>
  <p>Add toaster to cart {toaster}</p>
  <button onClick={()=>{setToaster(toaster+1)}}>+</button>
  <button onClick={()=>{if(toaster>=1)setToaster(toaster-1)}}>-</button>
  <p>Add fan to cart {fan}</p>
  <button onClick={()=>{setFan(fan+1)}}>+</button>
  <button onClick={()=>{if(fan>=1)setFan(fan-1)}}>-</button>
  <p>Add eggs to cart {eggs}</p>
  <button onClick={()=>{setEggs(eggs+1)}}>+</button>
  <button onClick={()=>{if(eggs>=1)setEggs(eggs-1)}}>-</button>
  <p>Add couch to cart {couch}</p>
  <button onClick={()=>{setCouch(couch+1)}}>+</button>
  <button onClick={()=>{if(couch>=1)setCouch(couch-1)}}>-</button>
  <p>Add flowers to cart {flowers}</p>
  <button onClick={()=>{setFlowers(flowers+1)}}>+</button>
  <button onClick={()=>{if(flowers>=1)setFlowers(flowers-1)}}>-</button>
  <p>Add mug to cart {mug}</p>
  <button onClick={()=>{setMug(mug+1)}}>+</button>
  <button onClick={()=>{if(mug >= 1)setMug(mug-1)}}>-</button>
  <br></br>
  <br></br>
  <br></br>
  
  </div>
  );
  }

function DisplayItems(){
  const [ProductsCategory, setProductsCategory] = useState(Products);
  const [query, setQuery] = useState('');



  const handleChange = (e) => {
    setQuery(e.target.value);
    const results = ProductsCategory.filter(eachProduct => {
   
    if (e.target.value === "") return ProductsCategory;
    return eachProduct.title.toLowerCase().includes(e.target.value.toLowerCase())
    });
    setProductsCategory(results);
    }

  return <div>
    <div class="search">
      <input type="search" value={query} onChange={handleChange} />
    </div>
    {ProductsCategory.map((product, index) => (
      <div key={index} >
        <img alt="Product Image" src={product.image} />
        <h3>{product.title}</h3>
        <p class="price">{product.price}</p>
        <p>{product.description}</p>
      </div>
    ))}
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


