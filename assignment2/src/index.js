import React from 'react';
import ReactDOM from 'react-dom/client';
import {useState, useEffect} from "react";
import './index.css';
import {Products} from './Products'

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <div>
    <DisplayItems />
    <Counter/>
  </div>
);
function Counter() {
  const [toaster, setToaster] = useState(0);
  const [fan, setFan] = useState(0);
  const [eggs, setEggs] = useState(0);
  const [couch, setCouch] = useState(0);
  const [flowers, setFlowers] = useState(0);
  const [mug, setMug] = useState(0);
  return (
  <div>
  <p>Add toaster to cart {toaster}</p>
  <button onClick={()=>{setToaster(toaster+1)}}>+</button>
  <button onClick={()=>setToaster(toaster-1)}>-</button>
  <p>Add fan to cart {fan}</p>
  <button onClick={()=>{setFan(fan+1)}}>+</button>
  <button onClick={()=>setFan(fan-1)}>-</button>
  <p>Add eggs to cart {eggs}</p>
  <button onClick={()=>{setEggs(eggs+1)}}>+</button>
  <button onClick={()=>setEggs(eggs-1)}>-</button>
  <p>Add couch to cart {couch}</p>
  <button onClick={()=>{setCouch(couch+1)}}>+</button>
  <button onClick={()=>setCouch(couch-1)}>-</button>
  <p>Add flowers to cart {flowers}</p>
  <button onClick={()=>{setFlowers(flowers+1)}}>+</button>
  <button onClick={()=>setFlowers(flowers-1)}>-</button>
  <p>Add mug to cart {mug}</p>
  <button onClick={()=>{setMug(mug+1)}}>+</button>
  <button onClick={()=>setMug(mug-1)}>-</button>
  
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
