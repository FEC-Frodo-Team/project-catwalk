import React, {useContext, useEffect, useState} from 'react';
import {AppContext} from '../AppContext.jsx';
import axios from 'axios';

export const ImageGallery = (props) => {
  const {products, setProducts} = useContext(AppContext);
  const {selectedProductID, setSelectedProductID} = useContext(AppContext);
  const [image, setImage] = useState('Default');
  const item = products.data.filter((item) => item.id === selectedProductID);

  useEffect(() => {
    axios
        .get(`api/products/${selectedProductID}/styles`)
        .then((element) => {
          console.log('got Styles: ', element);
          setImage(element);
        });
  }, [selectedProductID]);

  const style = {
    width: '300px',
    margin: '5px'};

  return (
    !image.data ? <div>Loading Image..</div>:
    <div>
      <img src={image.data.results[0].photos[0].url} style={style}/>
      {console.log(image.data.results[0].photos[0].url)}
    </div>
  );
};
