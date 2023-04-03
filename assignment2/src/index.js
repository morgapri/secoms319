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

  return <div>
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
