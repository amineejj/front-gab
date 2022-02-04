import React,{useState} from "react";
import axios from "axios";
import "./index.css";
import Swal from 'sweetalert2'
export default function FormGAB(props) {

  const[values,setValues]=useState({
    refTransfert:"",
    codePin:"",
    showInfo:false
  });
  const[submitted,setSubmitted]=useState(false);
  const handleRefTransfertChange = (event)=>{
    
    setValues({...values,refTransfert:event.target.value})
  }
  const handleCodePinChange = (event)=>{
    setValues({...values,codePin:event.target.value})
  }
  const handleSubmit =(event)=>{
    event.preventDefault();
   // setSubmitted(true);
    if(values.codePin==="" || values.refTransfert===""){
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Remplissez tous les champs',
        footer: '<a href="">call an agent</a>'
      })
    }else{
      getTransfert();
    }
 

  }
  const onTrigger = (event) => {
    console.log("trigger");
    console.log(event);
    event.show=false;
    props.parentCallback(event);
    //event.preventDefault();
}

   function  getTransfert() {
    // GET request using fetch with error handling
    axios.get('https://transfert-servicee.herokuapp.com/transfert/transfertN/ref/'+values.refTransfert).then((response)=>{
      
    console.log(response.data)
    if(response.data.status==="PAYE"){
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'paimenet deja traité',
        footer: '<a href="">call an agent</a>'
      })
    }
    else if(response.data.pin===values.codePin){
     
      Swal.fire(
        'Transfert Trouvé',
        'success'
      )
      onTrigger(response.data);
    }
    else{
    console.log("code pin incorect")
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: 'code pin incorect',
      footer: '<a href="">call an agent</a>'
    })
  }
  
  }).catch(error=>{
      //we can update state to an error to show meaningful message on screen
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'reference transfert inexistante',
        footer: '<a href="">call an agent</a>'
      })
      console.log("ref inexistant")
      console.log(error)
   });
    
}

if(!props.show){
  return 0;
}
  return (
<div>
  

    <div class="form-container">   
    <div class="title">GAB</div>
      <form class="register-form" onSubmit={handleSubmit}>
        {/* Uncomment the next line to show the success message */}
       
        <input
        onChange={handleRefTransfertChange}
          value={values.refTransfert}
          class="form-field"
          type="text"
          placeholder="Ref Transfert"
          name="refTransfert"
        />
        {/* Uncomment the next line to show the error message */}
        {submitted && !values.refTransfert && <span class="error">Please enter a ref Transfer</span> }
        <input
        onChange={handleCodePinChange}
          value={values.codePin}
          class="form-field"
          type="text"
          placeholder="Code Pin"
          name="codePin"
        />
        {/* Uncomment the next line to show the error message */}
        {submitted && !values.codePin &&  <span class="error">Please enter a code pin</span> }

        <button class="form-field" type="submit">
          Chercher
        </button>
       
      </form>
    </div>
   
    </div>
  );
}
