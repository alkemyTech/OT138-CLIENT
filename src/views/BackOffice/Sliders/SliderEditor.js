import React, { Fragment, useEffect, useState } from 'react';
import { Input, Label } from "../../../components/Inputs";
import { toast } from 'react-hot-toast';
import { Button } from "../../../components/Inputs"
import { postSlides, putSlides } from "../../../services/requests/slides";
import { EntryType } from "../../../components/EntryEditor/styles";
import Dropzone from "../../../components/Dropzone";

function SliderEditor({data,onSuccess }) {
  
  const [inputs,setInputs] = useState({text:"",order:"",organizationID:""});
  const [profileImageToSend, setProfileImageToSend] = useState([]);
  const [profileImage, setProfileImage] = useState('/upload.png');
  const [profileImagePreview, setProfileImagePreview] = useState('/upload.png')

  useEffect(()=>{
    if(data){
      Updated();
    } else{
      setInputs({text:"",order:"",organizationID:""})
    }
  },[data]);

  async function Updated(){
    setInputs({text:data.text,image:data.imageURL,order:data.order,organizationID:data.organizationID});
    setProfileImage(data.imageURL);
  }

  //SEND FORM
  async function submitForm(){
    if(data){
      const {success, errorMessage} = await putSlides({
        id: data.id, 
        text: inputs.text, 
        image: profileImage, 
        order: inputs.order, 
        organizationID: 
        inputs.organizationID
      });
      if(success){
        toast.success("Actualizado con éxito");
        onSuccess();
      }else{
        toast.error("Error al actualizar");
      }
    } else{  
      const {success,errorMessage} = await postSlides({
        text: inputs.text,
        image: profileImage,
        order: inputs.order,
        organizationID: inputs.organizationID
      });
      if(success){
        toast.success("Slider creado con éxito");
        onSuccess();
      } else{
        toast.error(errorMessage);
      }}
    };


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
  
    const onSubmitFile = (files, allFiles) => {
      allFiles.forEach((f) => f.remove());
    };

    return (
        <Fragment>
          <div>
            <h1 className="activities__title">{data ? "Actualizar Slider" : "Crear Slider"}</h1>
            <EntryType>Sliders</EntryType>
          </div>
          <Label>Texto de slider</Label>
          <Input type="text" name="text" value={inputs.text} onChange={(e)=>{setInputs({...inputs,text:e.target.value})}} />
          <Label>Archivo de imagen</Label>
          <Dropzone
            defaultImage={profileImage}
            onChangeStatus={onChangeStatus}
            onSubmit={onSubmitFile}
          />
          <Label>Order</Label>
          <Input type="number" name="order" value={inputs.order} onChange={(e)=>{setInputs({...inputs,order:e.target.value})}}/>
          <Label>OrganizationID</Label>
          <Input type="number" name="organizationID" value={inputs.organizationID} onChange={(e)=>{setInputs({...inputs,organizationID:e.target.value})}}/>
          <Button onClick={()=>{submitForm()}}><b>GUARDAR</b></Button>
        </Fragment>
    )
}


export default SliderEditor