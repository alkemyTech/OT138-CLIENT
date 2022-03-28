import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Footer } from "../../../components/Footer";
import EntryEditor from "../../../components/EntryEditor";
import {
  createActivity,
  getActivitiesById,
  updateActivity,
} from "../../../services/requests/activities";
import toast, { Toaster } from "react-hot-toast";
import { Container, Content } from "../../../components/Wrappers/Containers";
import * as yup from "yup";

let activitySchema = yup.object().shape({
  name: yup.string().required("Nombre es obligatorio"),
  content: yup.string().required("Contenido es obligatorio"),
  image: yup.mixed().required("Imagen es obligatorio"),
});

function ActivityEditor({ data, onSuccess }) {
  const [state, setState] = useState("ready");

  const saveActivity = async (formData, image) => {
    if (data) {
      // If there is an existing ID, then the form has to update the existing data on activity
      updateActivity(data.id, {
        name: formData.name,
        content: formData.content,
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
      // Else, the form has to create a new activity
      createActivity({
        name: formData.name,
        content: formData.content,
        send: formData.send !== "" ? formData.send : false,
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
        entryType={"Actividades"}
        getEntry={getActivitiesById}
        save={saveActivity}
        data={data ?? {}}
        yupSchema={activitySchema}
        fields={[
          {
            name: "name",
            title: "Nombre",
            type: "text",
          },
          {
            name: "image",
            title: "Archivo de imagen",
            type: "dropzone",
          },
          {
            name: "content",
            title: "Contenido",
            type: "content",
          },
          {
            name: "send",
            title: "Notificar Usuarios",
            type: "checkbox",
            defaultValue: false,
            onlyCreate: true,
          },
        ]}
      />
    </>
  );
}

export default ActivityEditor;
