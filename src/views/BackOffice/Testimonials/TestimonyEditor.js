import React, { Fragment, useEffect, useState } from 'react';
import {Input,Label} from "../../../components/Inputs";
import {toast} from 'react-hot-toast';
import {Button} from "../../../components/Inputs"
import {putTestimonies,postTestimonies} from "../../../services/requests/testimonials";
import {EntryType} from "../../../components/EntryEditor/styles"


function TestimonyEditor({data,onSuccess }) {


const [inputs,SetInputs] = useState({name:"",image:"",content:""});


  useEffect(()=>{
    if(data){
    Updated();
    }else{
    SetInputs({name:"",image:"",content:""})
    }},[data]);




    async function Updated(){
    SetInputs({name:data.name,image:data.image,content:data.content})
    }






    //SEND FORM
    async function submitForm(){
    if(data){
    const {success} = await putTestimonies(data.id,inputs.name,inputs.image,inputs.content);
    if(success){
    toast.success("Actualizado con éxito");
    onSuccess()
    }else{
    toast.error("Error al actualizar");
    }
    }else{  
    const {success} = await postTestimonies(inputs);
    if(success){
    toast.success("Slider creado con éxito");
    onSuccess()
    }else{
    toast.error("Error al crear testimonio");
    }}
    };





    return (
      
        <Fragment>
        <div>
        <h1 className="activities__title">{data ? "Actualizar Testomonio" : "Crear Testomonio"}</h1>
        <EntryType>Testimonios</EntryType>
        </div>
        <Label>Nombre</Label>
        <Input type="text" name="name" value={inputs.name} onChange={(e)=>{SetInputs({...inputs,name:e.target.value})}} />
        <Label>Url de imagen</Label>
        <Input type="text" name="image" value={inputs.image} onChange={(e)=>{SetInputs({...inputs,image:e.target.value})}}/>
        <Label>Contenido</Label>
        <Input type="text" name="content" value={inputs.content} onChange={(e)=>{SetInputs({...inputs,content:e.target.value})}}/>
        <Button onClick={()=>{submitForm()}}><b>GUARDAR</b></Button>
        </Fragment>

    )
}


export default TestimonyEditor