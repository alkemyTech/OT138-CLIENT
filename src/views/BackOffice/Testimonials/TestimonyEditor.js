import React, { Fragment, useEffect, useState } from 'react';
import {Input,Label} from "../../../components/Inputs";
import {toast} from 'react-hot-toast';
import {Button,TextEditor} from "../../../components/Inputs"
import {putTestimonies,postTestimonies} from "../../../services/requests/testimonials";
import {EntryType} from "../../../components/EntryEditor/styles";
import Dropzone from '../../../components/Dropzone';


function TestimonyEditor({data,onSuccess }) {


const [inputs,SetInputs] = useState({name:"",content:""});
const [profileImageToSend, setProfileImageToSend] = useState([]);
const [profileImage, setProfileImage] = useState('/upload.png');
const [profileImagePreview, setProfileImagePreview] = useState('/upload.png')


  useEffect(()=>{
    if(data){
    Updated();
    }else{
    SetInputs({name:"",content:""})
    }},[data]);




    //UPDATE TETIMONY
    async function Updated(){
    SetInputs({name:data.name,content:data.content});
    setProfileImage(data.image)
    }






    //SEND FORM
    async function submitForm(){
    if(data){
    const {success} = await putTestimonies({
    id: data.id, 
    name: inputs.name, 
    image: profileImage, 
    content: inputs.content
    });
    if(success){
    toast.success("Actualizado con éxito");
    onSuccess();
    }else{
    toast.error("Error al actualizar");
    }
    } else{  
    const {success,errorMessage} = await postTestimonies({
    name: inputs.name, 
    image: profileImage, 
    content: inputs.content
    });
    if(success){
    toast.success("Testimonio creado con éxito");
    onSuccess();
    } else{
    toast.error(errorMessage);
    }}
    };




    //ONCHANGE IMAGE
    const onChangeStatus = ({ meta, file, remove }, status) => {
    if (status === "done") {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = async (event) => {
    setProfileImageToSend(event?.target?.result);
    setProfileImage(file);
    setProfileImagePreview(meta);
    };
    }
    if (status === "removed") {
    setProfileImageToSend(null);
    setProfileImage("/upload.png");
    setProfileImagePreview("/upload.png");
    }
    };


    //ONSUBMIT IMAGE
    const onSubmitFile = (files, allFiles) => {
    allFiles.forEach((f) => f.remove());
    };

  


    return (
      
        <Fragment>
        <div>
        <h1 className="activities__title">{data ? "Actualizar Testomonio" : "Crear Testomonio"}</h1>
        <EntryType>Testimonios</EntryType>
        </div>
        <Label>Nombre</Label>
        <Input type="text" name="name" value={inputs.name} onChange={(e)=>{SetInputs({...inputs,name:e.target.value})}} />
        <Label>Archivo de imagen</Label>
        <Dropzone
        defaultImage={profileImage}
        onChangeStatus={onChangeStatus}
        onSubmit={onSubmitFile}/>
        <Label>Contenido</Label>
        <TextEditor name="content" data={inputs.content} onChange={(e,editor) => {const data = editor.getData(); inputs.content = data}}/>
        <Button onClick={()=>{submitForm()}}><b>GUARDAR</b></Button>
        </Fragment>

    )
}


export default TestimonyEditor