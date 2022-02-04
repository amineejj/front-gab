import React,{useState} from "react";
import axios from "axios";
import "./index.css";
import FormGAB from './FormGAB';
import Info from './Info';

export default function App() {
  const[val,setVal]=useState({
    show:true,
    transfert:{}
  });

const handleCallback = (childData) =>{
  console.log("je suis la");
  setVal({...val,show:false,transfert:childData});
  console.log(val);
}
const handleCallbackInfo = (childData) =>{
  console.log("je suis la");
  setVal({...val,show:true,transfert:{}});
  console.log(val);
}
  return (
    <>
    
    {val.show &&  <FormGAB show={val.show} parentCallback={handleCallback} />}
    
    {!val.show && <Info show={!val.show} transfert={val.transfert} parentCallback={handleCallbackInfo} />}
    
    </>
  );
}
