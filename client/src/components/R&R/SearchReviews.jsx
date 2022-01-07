import React, {useContext} from 'react';
import {AppContext} from '../AppContext.jsx';
import {ReviewContext} from './ReviewContext.jsx';
import axios from 'axios';

export const SearchReviews = () => {
  const {reviews, setReviews, selectedProductID} = useContext(AppContext);
  const {searchTerm, setSearchTerm, setSortedBy} = useContext(ReviewContext);

  const sortReviews = (type) => {
    console.log('CHANGING SORT:', type, reviews.data.results);
    if (type === 'Most Helpful') {
      axios
          .get(`api/reviews?product_id=${selectedProductID}&count=300&sort=helpful`)
          .then((results) => {
            console.log('got reviews: ', results);
            setReviews(results);});
      // reviews.data.results.sort((review, nextReview) =>
      // (review.helpfulness > nextReview.helpfulness) ? -1 : 1);
    } else if (type === 'Relevant') {
      axios
      .get(`api/reviews?product_id=${selectedProductID}&count=300&sort=relevant`)
      .then((results) => {
        console.log('got reviews: ', results);
        setReviews(results);});
      // reviews.data.results.sort((review, nextReview) =>
      // (review.helpfulness || nextReview.helpfulness) ? (review.helpfulness/(new Date().getTime() -new Date(review.date).getTime()) > nextReview.helpfulness/(new Date().getTime() - new Date(nextReview.date).getTime())) ? -1 : 1
      // :(new Date(review.date) > new Date(nextReview.date)) ? -1 : 1);
    } else if (type === 'Newest') {
      axios
      .get(`api/reviews?product_id=${selectedProductID}&count=300&sort=newest`)
      .then((results) => {
        console.log('got reviews: ', results);
        setReviews(results);});
      // reviews.data.results.sort((review, nextReview) =>
      // (new Date(review.date) > new Date(nextReview.date)) ? -1 : 1);
    } else if (type === 'Search') {
      reviews.data.results.sort((review, nextReview) =>
      (review.body.includes(searchTerm) &&nextReview.body.includes(searchTerm))?
      (review.helpfulness || nextReview.helpfulness) ? (review.helpfulness/(new Date().getTime() -new Date(review.date).getTime()) > nextReview.helpfulness/(new Date().getTime() - new Date(nextReview.date).getTime())) ? -1 : 1
      :(new Date(review.date) > new Date(nextReview.date)) ? -1 : 1 :




      (review.body.includes(searchTerm) >nextReview.body.includes(searchTerm) ) ? -1 : 1);
    } else {
      console.log('WHAT KIND OF SORT?', type);
    }
    console.log('after--', reviews.data.results);
    setSortedBy(type);
  };


  return (
    <span style={{display: 'flex', justifyContent: 'space-between',paddingBottom:'1em'}}><span>
      <span></span>
      <input id="QA_SearchBar" style = {{width: '25em', borderRight: '1px solid cadetblue'}}
        placeholder="Search for questions here"value = {searchTerm} onChange = {(e)=> {setSearchTerm(e.target.value);searchTerm.length>=3?sortReviews('Search'):null}}></input>
    </span>
    <span>{reviews.data.results.length} reviews, sorted by <select onChange= {(e) => {sortReviews(e.target.value)}}>
      <option >Relevant</option>
      <option >Most Helpful</option>
      <option >Newest</option>
    </select>
    </span>
    </span>
  );
};



// const helpfulSort = (review, nextreview) =>
//    (review.helpfulness > nextReview.helpfulness);
//  const dateSort = (review, nextreview) =>
//    (new Date(review.date) > new Date(nextReview.date));
//  const searchChange = (e) =>{
//    setSearchTerm(e.target.value);
//      searchTerm.length>=3?sortReviews('Search'):null;
//  };

//  const sortReviews = (type) => {
//    console.log('CHANGING SORT:', type, reviews.data.results);
//    if (type === 'Most Helpful') {
//      reviews.data.results.sort((review, nextReview) =>
//      helpfulSort(review, nextReview)? -1 : 1);
//    } else if (type === 'Relevant') {
//      reviews.data.results.sort((review, nextReview) =>
//      (review.helpfulness || nextReview.helpfulness) ?
//       (review.helpfulness/
//        (new Date().getTime() -new Date(review.date).getTime()) >
//       nextReview.helpfulness/
//       (new Date().getTime() - new Date(nextReview.date).getTime())) ? -1 : 1 :
//        dateSort(review, nextreview) ? -1 : 1);
//    } else if (type === 'Newest') {
//      reviews.data.results.sort((review, nextReview) =>
//       dateSort(review, nextreview) ? -1 : 1);
//    } else if (type === 'Search') {
//      reviews.data.results.sort((review, nextReview) =>
//      (review.body.includes(searchTerm) &&nextReview.body.includes(searchTerm))?
//      (review.helpfulness || nextReview.helpfulness) ?
//       (review.helpfulness/(new Date().getTime() -
//       new Date(review.date).getTime()) >
//        nextReview.helpfulness/(new Date().getTime() -
//         new Date(nextReview.date).getTime())) ? -1 : 1 :
//         dateSort(review, nextreview) ? -1 : 1 :
//      (review.body.includes(searchTerm) >
//        nextReview.body.includes(searchTerm) ) ? -1 : 1);
//    } else {
//      console.log('WHAT KIND OF SORT?', type);
//    }
//    console.log('after--', reviews.data.results);
//    setSortedBy(type);
//  };


//  return (
//    <span style={{display: 'flex', justifyContent: 'space-between'}}><span>
//      <span>search</span>
//      <input value = {searchTerm} onChange = {(e)=>searchChange(e)}></input>
//    </span>
//    <span>{reviews.data.results.length} reviews, sorted by <select
//      onChange= {(e) => sortReviews(e.target.value)}>
//      <option >Relevant</option>
//      <option >Most Helpful</option>
//      <option >Newest</option>
//    </select>
//    </span>
//    </span>
//  );
// };
