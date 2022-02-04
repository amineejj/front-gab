import React,{useState,useEffect} from "react";
import axios from "axios";
import "./index.css";
import Swal from 'sweetalert2'
export default function Info(props) {

  const[values,setValues]=useState({
        transfert:props.transfert,
        client:{}
  });
  const[submitted,setSubmitted]=useState(false);

  const handleSubmit =(event)=>{
    event.preventDefault();
    setSubmitted(true);
    processPaiment(values.transfert);

  }

function processPaiment(transf){
transf.status="PAYE"

 axios.put("https://transfert-servicee.herokuapp.com/transfert/transfertN/"+transf.codeT, transf).then(response=>{ 
    Swal.fire(
        'Printing Money...',
        'coming soon...',
        'success'
      )
      props.parentCallback();
 console.log("done");
})
}
useEffect(async()=>{

                    await axios.get("https://client-servicee.herokuapp.com/clients/cin/"+props.transfert.clientDonneur)
                    .then(res=>{
                        console.log(res.data);
                        setValues({...values,client:res.data})

                    })
                    .catch(err=>{
                      console.log(err);
                    })
    
  },[])


if(!props.show){
  return 0;
}
  return (
      
<div>
  
    <div class="form-container">   
    <div class="title">GAB</div>
      <form class="register-form" onSubmit={handleSubmit}>
       
        <div class="infoTrans">
          <div class="success-message">Transfert trouvé</div>
          <div class="row">
            <div class="column left">Ref Agent</div>
            <div class="column right">: {props.transfert.refAgent}</div>
          </div>
          <div class="row">
            <div class="column left">Nom Sender</div>
            <div class="column right">: {values.client.nom}</div>
          </div>
          <div class="row">
            <div class="column left">Prénom Sender</div>
            <div class="column right">: {values.client.prenom}</div>
          </div>
          <div class="row">
            <div class="column left">Date d'envoi</div>
            <div class="column right">: {props.transfert.dateCreation}</div>
          </div>
          <div class="row">
            <div class="column left">Montant</div>
            <div class="column right">: {props.transfert.montant}&nbsp;MAD</div>
          </div>
          
        </div>
        <button class="form-field" type="submit">
          submit
        </button>
      </form>
    </div>
   
    </div>
  );
}
