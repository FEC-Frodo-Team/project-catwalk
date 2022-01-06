import React, {useContext} from 'react';
import {AppContext} from '../AppContext.jsx';


export const Characteristics = (props) => {
  const {reviewMetaData} = useContext(AppContext);

  return (
    !reviewMetaData.data ? <p>no character</p> :
      Object.keys(reviewMetaData.data.characteristics).map((key) => {
        return <div style = {{position:'relative'}}>
              <div style = {{ textAlign: "center", width: `${76.5}%`}}>{key}</div>
              <span style = {{ color: "Lightgray", display: "inline-block", backgroundColor:"LightGray", width: `${24.5}%`, maxHeight: "10px"}}>.</span>
              <span style = {{ color: "white", display: "inline-block", backgroundColor:"white", width: `${1}%`, maxHeight: "10px"}}>.</span>
              <span style = {{ color: "Lightgray", display: "inline-block", backgroundColor:"LightGray", width: `${24.5}%`, maxHeight: "10px"}}>.</span>
              <span style = {{position:'absolute',  left:`${reviewMetaData.data.characteristics[key].value*13.4}%`}}>⤊</span>
              <span style = {{ color: "white", display: "inline-block", backgroundColor:"white", width: `${1}%`, maxHeight: "10px"}}>.</span>
              <span style = {{ color: "Lightgray", display: "inline-block", backgroundColor:"LightGray", width: `${24.5}%`, maxHeight: "10px"}}>.</span>

        </div>;
      })
  );
};
