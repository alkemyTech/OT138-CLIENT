import React, { useState } from "react";
import EntryEditor from "../../../components/EntryEditor";
import {
  createMember,
  updateMember,
} from "../../../services/requests/members";
import toast, { Toaster } from "react-hot-toast";
import * as yup from "yup";

let memberSchema = yup.object().shape({
  name: yup.string().required("Nombre es obligatorio"),
  area: yup.string().required("Área es obligatorio"),
  image: yup.mixed().required("Imagen es obligatorio"),
});

function MemberEditor({ data, onSuccess }) {

  const [state, setState] = useState("ready");

  const saveMember = async (formData, image) => {
    if (data) {
      // If there is preexisting data, then the form has to update the existing data on member
      updateMember(data.id, {
        name: formData.name,
        area: formData.area,
        image: image,
      })
        .then((response) => {
          if (response.data.error) {
            toast.error("Error al intentar guardar");
          } else {
            toast.success("Guardado con éxito");
            onSuccess(response.data.data);
          }
        })
        .catch((err) => {
          toast.error("Error al intentar guardar");
        });
    } else {
      // Else, the form has to create a new member
      createMember({
        name: formData.name,
        area: formData.area,
        image: image,
      })
        .then((response) => {
          if (response.data.error) {
            toast.error("Error al intentar crear la entrada");
          } else {
            toast.success("Entrada creada con éxito");
            onSuccess(response.data.data);
          }
        })
        .catch((err) => {
          toast.error("Error al intentar crear la entrada");
          console.log(err);
        });
    }
  };

  return (
    <>
      <Toaster />
      <EntryEditor
        state={state}
        entryType={"Miembros"}
        getEntry={null}
        save={saveMember}
        data={data ?? {}}
        yupSchema={memberSchema}
        fields={[
          {
            name: "name",
            title: "Nombre",
            type: "text",
          },
          {
            name: "area",
            title: "Área",
            type: "text",
          },
          {
            name: "image",
            title: "Archivo de imagen",
            type: "dropzone",
          },
        ]}
      />
    </>
  );
}

export default MemberEditor;
