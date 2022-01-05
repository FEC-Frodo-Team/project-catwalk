import React, {useContext} from 'react';
import {AppContext} from '../AppContext.jsx';


export const Characteristics = (props) => {
  const {reviewMetaData} = useContext(AppContext);

  return (
    !reviewMetaData.data ? <p>no character</p> :
      Object.keys(reviewMetaData.data.characteristics).map((key) => {
        return <div style = {{ width: "90%"}}>
              <div style = {{ textAlign: "center"}}>{key}</div>
              <span style = {{position:'absolute',  left:`${reviewMetaData.data.characteristics[key].value*4.8+15}%`}}>⤊</span>
              <span style = {{ color: "Lightgray", display: "inline-block", backgroundColor:"LightGray", width: `${31}%`, maxHeight: "10px"}}>.</span>
              <span style = {{ color: "white", display: "inline-block", backgroundColor:"white", width: `${1}%`, maxHeight: "10px"}}>.</span>
              <span style = {{ color: "Lightgray", display: "inline-block", backgroundColor:"LightGray", width: `${31}%`, maxHeight: "10px"}}>.</span>
              <span style = {{ color: "white", display: "inline-block", backgroundColor:"white", width: `${1}%`, maxHeight: "10px"}}>.</span>
              <span style = {{ color: "Lightgray", display: "inline-block", backgroundColor:"LightGray", width: `${31}%`, maxHeight: "10px"}}>.</span>
        </div>;
      })
  );
};
