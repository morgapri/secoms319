import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals

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
    "Vermont", "Virginia", "Washington", "West Virginia", "Wisconsin", "Wyoming"];
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