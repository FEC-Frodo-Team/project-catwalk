import React, {useContext, useEffect, useState} from 'react';
import {AppContext} from '../AppContext.jsx';
import axios from 'axios';

export const ProductDetails = (props) => {
  const {products, setProducts} = useContext(AppContext);
  return (
    <div>
      Product Details
    </div>
  );
};
