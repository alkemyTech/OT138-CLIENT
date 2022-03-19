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

function FormTestimonial({ id, SetAnimation, data }) {
  //STATES
  const [inputs, SetInputs] = useState({ name: "", image: "", content: "" });
  const [ckeditor, SetCeditor] = useState(inputs.content);
  const [message, SetMessage] = useState({ name: "", image: "", content: "" });

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

  //CHANGE INPUTS VALUES
  function OnChangeData(e) {
    const { name, value } = e.target;
    SetInputs({ ...inputs, [name]: value });
  }

  //SEND DATA
  async function OnSubmitData(e) {
    e.preventDefault();
    if (!inputs.name) {
      SetMessage({ name: "Campo obligatorio", image: "", content: "" });
    } else if (!inputs.image) {
      SetMessage({ name: "", image: "Campo obligatorio", content: "" });
    } else if (!ckeditor) {
      SetMessage({ name: "", image: "", content: "Campo obligatorio" });
    } else {
      SetMessage("");
      if (!id) {
        inputs.content = ckeditor;
        const { successMessage, success, errorMessage } = await postTestimony(
          inputs
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
        inputs.content = ckeditor;
        const { successMessage, success, errorMessage } = await putTestimony(
          inputs,
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
    <form onSubmit={OnSubmitData}>
      <Toaster />
      <h1>Formulario de testimonio</h1>
      <Input
        type="text"
        name="name"
        placeholder="Nombre"
        value={inputs.name}
        onChange={OnChangeData}
      />
      <MessageError>{message.name}</MessageError>
      <Input
        type="text"
        name="image"
        placeholder="Imagen"
        value={inputs.image}
        onChange={OnChangeData}
      />
      <MessageError>{message.image}</MessageError>
      <Label>Contenido</Label>
      <CKEditor
        editor={ClassicEditor}
        data={inputs.content}
        onChange={(event, editor) => {
          const data = editor.getData();
          SetCeditor(data);
        }}
      />
      <MessageError>{message.content}</MessageError>
      <ButtonGroup>
        <Button style={saveButtonStyle} type="submit">
          {!id ? "Guardar" : "Actualizar"}{" "}
        </Button>
        {data === undefined && (
          <Button
            style={closeButtonStyle}
            type="button"
            onClick={() => {
              SetAnimation({ opacity: "0", index: "-1" });
            }}
          >
            Cerrar
          </Button>
        )}
      </ButtonGroup>
    </form>
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
