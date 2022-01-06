import React, {useEffect, useState, useContext} from 'react';
import {AppContext} from './AppContext.jsx';


export const Header = () => {
  const {setSelectedProductID, products} = useContext(AppContext);


  return ( <span className='HeaderMain'>
    <h1 id="brand-name">Fashion by Frodo</h1>
    <div id="product-selector">Select Product:
      <select onChange= {(e) => {
        setSelectedProductID(e.target.value);
      }}>
        {products.data.map((oneProduct) => {
          return (<option value={oneProduct.id}>{oneProduct.name}</option>);
        })}
      </select>
    </div>
  </span>
  );
};
