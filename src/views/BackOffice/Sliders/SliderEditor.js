import React, { Fragment, useEffect, useState } from 'react';
import {Input,Label} from "../../../components/Inputs";
import {toast} from 'react-hot-toast';
import {Button} from "../../../components/Inputs"
import {postSlides,putSlides} from "../../../services/requests/slides";
import {EntryType} from "../../../components/EntryEditor/styles"


function SliderEditor({data,onSuccess }) {


const [inputs,SetInputs] = useState({text:"",imageURL:"",order:"",organizationID:""});


  useEffect(()=>{
    if(data){
    Updated();
    }else{
    SetInputs({text:"",imageURL:"",order:"",organizationID:""})
    }},[data]);




    async function Updated(){
    SetInputs({text:data.text,imageURL:data.imageURL,order:data.order,organizationID:data.organizationID})
    }






    //SEND FORM
    async function submitForm(){
    if(data){
  
    const {success} = await putSlides(data.id,inputs.text,inputs.imageURL,inputs.order,inputs.organizationID);
    if(success){
    toast.success("Actualizado con éxito");
    onSuccess()
    }else{
    toast.error("Error al actualizar");
    }
    }else{  
    const {success,errorMessage} = await postSlides(inputs);
    if(success){
    toast.success("Slider creado con éxito");
    onSuccess()
    }else{
    toast.error(errorMessage);
    }}
    };





    return (
      
        <Fragment>
        <div>
        <h1 className="activities__title">{data ? "Actualizar Slider" : "Crear Slider"}</h1>
        <EntryType>Sliders</EntryType>
        </div>
        <Label>Texto de slider</Label>
        <Input type="text" name="text" value={inputs.text} onChange={(e)=>{SetInputs({...inputs,text:e.target.value})}} />
        <Label>Url de imagen</Label>
        <Input type="text" name="imageURL" value={inputs.imageURL} onChange={(e)=>{SetInputs({...inputs,imageURL:e.target.value})}}/>
        <Label>Order</Label>
        <Input type="number" name="order" value={inputs.order} onChange={(e)=>{SetInputs({...inputs,order:e.target.value})}}/>
        <Label>OrganizationID</Label>
        <Input type="number" name="organizationID" value={inputs.organizationID} onChange={(e)=>{SetInputs({...inputs,organizationID:e.target.value})}}/>
        <Button onClick={()=>{submitForm()}}><b>GUARDAR</b></Button>
        </Fragment>

    )
}


export default SliderEditor