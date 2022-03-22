import React, { useEffect, useState } from "react";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import {
  Form,
  Input,
  Label,
  Button,
  MessageError,
  ButtonGroup,
} from "../../styles/FormTestimonial";
import {
  postTestimony,
  putTestimony,
  getOneTestimony,
} from "../../services/requests/form_testimonial";
import { toast, Toaster } from "react-hot-toast";
import Dropzone from "../../components/Dropzone";
import EntryEditor from "../../components/EntryEditor";

function FormTestimonial({ id, SetAnimation, data }) {
  //STATES
  const [inputs, SetInputs] = useState({ name: "", image: "", content: "" });
  const [ckeditor, SetCeditor] = useState(inputs.content);

  useEffect(() => {
    if (id) {
      Obtener();
    } else {
      SetInputs({ name: "", image: "", content: "" });
    }
  }, [id]);

  //GET TESTIMONIAL WITH ID
  async function Obtener() {
    const datos = await getOneTestimony(id);
    SetInputs({
      name: datos.data.name,
      image: datos.data.image,
      content: datos.data.content,
    });
  }

  //SEND DATA
  async function OnSubmitData(formData, img) {
    formData.image = img;
    console.log(formData);
    if (!formData.name) {
      toast.error("Nombre es Obligatorio")
    } else if (!(formData.image instanceof File)) {
      toast.error("Imagen es Obligatorio")
    } else if (!formData.content) {
      toast.error("Contenido es Obligatorio")
    } else {
      if (!id) {
        const { successMessage, success, errorMessage } = await postTestimony(
          formData
        );
        if (success) {
          toast.success(successMessage);
          SetInputs({ name: "", image: "", content: "" });
          setTimeout(() => {
            window.location.reload();
          }, 1200);
        } else {
          toast.error(errorMessage);
        }
      } else {
        formData.content = ckeditor;
        const { successMessage, success, errorMessage } = await putTestimony(
          formData,
          id
        );
        if (success) {
          toast.success(successMessage);
          SetInputs({ name: "", image: "", content: "" });
          setTimeout(() => {
            window.location.reload();
          }, 1200);
        } else {
          toast.error(errorMessage);
        }
      }
    }
  }

  return (
    <>
    <Toaster/>
    <EntryEditor
     id={id}
     state={"ready"}
     entryType={"Testimonio"}
     getEntry={Obtener}
     save={OnSubmitData}
     data={inputs}
     fields={[
       {
         name: "name",
         title: "Nombre",
         type: "text",
       },
       {
         name: "image",
         title: "Imagen",
         type: "dropzone",
       },
       {
        name: "content",
        title: "Contenido",
        type: "content",
      },
     ]}
    />
    </>
  );
}

const saveButtonStyle = {
  width: "50%",
  height: "40px",
  background: "#009600",
};

const closeButtonStyle = {
  width: "50%",
  height: "40px",
  background: "#6e6e6e",
};

export default FormTestimonial;
