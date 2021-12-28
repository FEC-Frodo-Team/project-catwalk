import React, {useContext, useEffect, useState} from 'react';
import {AppContext} from '../AppContext.jsx';
import {ProductContext} from './ProductContext.jsx';
import axios from 'axios';

export const StyleSelector = (props) => {
  const {products, setProducts} = useContext(AppContext);
  const {selectedProductID, setSelectedProductID} = useContext(AppContext);
  const {image, setImage} = useContext(ProductContext);
  const item = products.data.filter((item) => item.id === selectedProductID);

  const style = {'display': 'flex'};

  return (
    !image.data ? <div>Loading Image..</div>:
    <div style={style}>
      <div>Select Style:</div>
      {image.data.results.map((item) => <button>B</button>)}
    </div>
  );
};
