import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Header from "../../../components/Header/BackOffice";
import { Footer } from "../../../components/Footer";
import EntryEditor from "../../../components/EntryEditor";
import {
  createActivity,
  getActivitiesById,
  updateActivity,
} from "../../../services/requests/activities";
import toast, { Toaster } from "react-hot-toast";
import { Container, Content } from "../../../components/Wrappers/Containers";

function ActivityEditor({data, onSuccess}) {

  //const [data, setData] = useState({});
  const [state, setState] = useState("ready");

  /*useEffect(() => {
    if (id) {
      getActivity();
    }
  }, [id]);

  const getActivity = async () => {
    setState("loading");
    getActivitiesById(id).then((response) => {
      if (!response.data.error) {
        setData(response.data.result);
      } else {
        toast.error("No se pudo cargar los datos");
      }
      setState("ready");
    });
  };*/

  const saveActivity = async (formData, image) => {
    if (data) {
      // If there is an existing ID, then the form has to update the existing data on activity
      updateActivity(data.id, {
        name: formData.name,
        content: formData.content,
        image: image
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
        image: image
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
        data={data?? {}}
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
        ]}
      />
    </>
  );
}

export default ActivityEditor;
