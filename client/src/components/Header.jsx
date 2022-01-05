import React, {useEffect, useState,useContext} from 'react';
import {AppContext} from './AppContext.jsx';



export const Header = () => {
  const {setSelectedProductID, products} = useContext(AppContext);





  return ( <div className = 'HeaderMain'>HEADER
    <select onChange= {(e) => {setSelectedProductID(e.target.value); }}>
      {products.data.map((oneProduct) => {
        return (<option value = {oneProduct.id}>{oneProduct.name}</option>);
      })}
    </select>


  </div>
  );
};
