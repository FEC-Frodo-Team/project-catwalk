import React, {useContext, useEffect, useState} from 'react';
import {AppContext} from '../AppContext.jsx';
import {StyleSelector} from './StyleSelector.jsx';
import axios from 'axios';

export const AddToCart = (props) => {
  const {cart, setCart} = useContext(AppContext);
  const {selectedProductID, setSelectedProductID} = useContext(AppContext);
  // const item = products.data.filter((item) => item.id === selectedProductID);
  const style = {'display': 'flex', 'gap': '40px', 'flex-wrap': 'wrap', 'justify-content': 'center'};
  console.log('Cart object: ', cart);

  return (
    <div style={style}>
      <button>Select Size</button>
      <button>Quantity</button>
      <div><button>Add to cart</button></div>
    </div>
  );
};
