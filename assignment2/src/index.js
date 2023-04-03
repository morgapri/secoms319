import React from 'react';
import ReactDOM from 'react-dom/client';
import {useState, useEffect} from "react";
import './index.css';
import {Products} from './Products'

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <div>
    <DisplayItems />
  </div>
);

function DisplayItems(){
  const [ProductsCategory, setProductsCategory] = useState(Products);
  const [query, setQuery] = useState('');
  const handleChange = (e) => {
    setQuery(e.target.value);
    console.log("Step 6 : in handleChange, Target Value :",e.target.value," Query Value :",query);
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
