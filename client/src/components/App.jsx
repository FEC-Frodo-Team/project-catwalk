import React, {useEffect, useState} from 'react';
import {AppContext} from './AppContext.jsx';
import {ProductDetails} from './Overview/ProductDetails.jsx';
import {RatingsAndReviews} from './R&R/RatingsAndReviews.jsx';
import axios from 'axios';


export const App = () => {
  // Currently product selection is the only thing that rerenders everything
  const defaultProductID = 44388;
  const [selectedProductID, setSelectedProductID] = useState(defaultProductID);

  // Making all of the calls global to start then we can bring down into our
  // components if no one else needs it to be in global context.
  const [products, setProducts] = useState({});
  const [questions, setQuestions] = useState({});
  const [reviews, setReviews] = useState({});
  const [reviewMetaData, setReviewsMetaData] = useState({});
  const [cart, setCart] = useState({});
  // Not sure if we will have to use number of interactions
  // const [interactions, setInteractions] = useState({});

  useEffect(() => {
    // List of products Ezra's main info. Defaults to 1 page with 5 results.
    axios
        .get(`api/products`)
        .then((results) => {
          console.log('got Products: ', results);
          setProducts(results);
        });
    // List of items in cart Ezra's info.
    axios
        .get(`api/cart`)
        .then((results) => {
          console.log('got Cart items: ', results);
          setCart(results);
        });

    // List of questions Sixto's main info. Defaults to 1 page with 5 results.
    // This only provides the list of questions the answers must be queried
    // individually with /qa/questions/:question_id/answers.
    axios
        .get(`api/qa/questions?product_id=${defaultProductID}`)
        .then((results) => {
          console.log('got Questions: ', results);
          setQuestions(results);
        });

    // Ratings and reviews Matt's main info.
    axios
        .get(`api/reviews?product_id=${defaultProductID}`)
        .then((results) => {
          console.log('got reviews: ', results);
          setReviews(results);
        });
    axios
        .get(`api/reviews/meta?product_id=${defaultProductID}`)
        .then((results) => {
          console.log('got reviews Meta: ', results);
          setReviewsMetaData(results);
        });
  // curently renders everything when page loads or when Ezra updates ProductID.
  }, [selectedProductID]);

  // importing AppContext will give that component access to all pieces of state
  // and methods passed in below.
  return (
    !reviews.data || !reviewMetaData.data ? <div>loading...</div> :
    <AppContext.Provider value={{reviews, setReviews,
      reviewMetaData, setReviewsMetaData,
      products, setProducts,
      selectedProductID, setSelectedProductID,
      questions, setQuestions,
      cart, setCart}}>
      {// ezra's component
      // sixto's component
      }
      <ProductDetails />
      <RatingsAndReviews />
    </AppContext.Provider>
  );
};
