import React, { Fragment, useEffect, useState } from "react";
import { Input, Label } from "../../../components/Inputs";
import { toast } from "react-hot-toast";
import { Button } from "../../../components/Inputs";
import { postSlides, putSlides } from "../../../services/requests/slides";
import { EntryType } from "../../../components/EntryEditor/styles";
import Dropzone from "../../../components/Dropzone";
import EntryEditor from "../../../components/EntryEditor";
import * as yup from "yup";

let sliderSchema = yup.object().shape({
  text: yup
    .string()
    .max(255, "El texto no debe superar los 255 caracteres")
    .required("Texto es obligatorio"),
  order: yup
    .number("Orden es obligatorio")
    .typeError("Orden es obligatorio")
    .positive("Orden debe ser positivo")
    .integer("Orden debe ser entero")
    .required("Orden es obligatorio"),
  image: yup.mixed().required("Imagen es obligatorio"),
});

function SliderEditor({ data, onSuccess }) {
  const [inputs, setInputs] = useState({
    text: "",
    order: "",
    organizationID: "",
  });
  const [profileImageToSend, setProfileImageToSend] = useState([]);
  const [profileImage, setProfileImage] = useState("/upload.png");
  const [profileImagePreview, setProfileImagePreview] = useState("/upload.png");

  useEffect(() => {
    console.log("data", data);
    if (data) {
      data.image = data.imageURL;
      Updated();
    } else {
      setInputs({ text: "", order: "", organizationID: "" });
    }
  }, [data]);

  async function Updated() {
    setInputs({
      text: data.text,
      image: data.imageURL,
      order: data.order,
      organizationID: data.organizationID,
    });
    setProfileImage(data.imageURL);
  }

  //SEND FORM
  async function submitForm(formData) {
    if (data) {
      const { success, errorMessage } = await putSlides({
        id: data.id,
        text: formData.text,
        image: formData.image,
        order: formData.order,
        organizationID: 1,
      });
      if (success) {
        toast.success("Actualizado con éxito");
        onSuccess();
      } else {
        toast.error("Error al actualizar");
      }
    } else {
      const { success, errorMessage } = await postSlides({
        text: formData.text,
        image: formData.image,
        order: formData.order,
        organizationID: 1,
      });
      if (success) {
        toast.success("Slider creado con éxito");
        onSuccess();
      } else {
        toast.error(errorMessage);
      }
    }
  }

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
      <EntryEditor
        state="ready"
        entryType={"Slider"}
        getEntry={() => inputs}
        save={submitForm}
        data={data ?? {}}
        yupSchema={sliderSchema}
        fields={[
          {
            name: "text",
            title: "Texto",
            type: "text",
          },
          {
            name: "image",
            title: "Imagen",
            type: "dropzone",
          },
          {
            name: "order",
            title: "Orden",
            type: "number",
          },
        ]}
      />
    </Fragment>
  );
}

export default SliderEditor;
