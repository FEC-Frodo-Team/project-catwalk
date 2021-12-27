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
        .get(`api/products/44388/styles`)
        .then((element) => {
          console.log('got Styles: ', element);
          setImage(element);
        });
  }, [selectedProductID]);
  return (
    !image.data ? <div>Loading Image..</div>:
    <div>
      Image Gallery
      <img src={image.data.results[0].photos[0].url}/>
      {console.log(image.data.results[0].photos[0].url)}
    </div>
  );
};
