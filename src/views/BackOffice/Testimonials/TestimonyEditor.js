import React, { Fragment, useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import {
  putTestimonies,
  postTestimonies,
} from "../../../services/requests/testimonials";
import EntryEditor from "../../../components/EntryEditor";
import * as yup from "yup";

let testimonySchema = yup.object().shape({
  name: yup.string().required("Nombre es obligatorio"),
  id: yup.number().positive().integer(),
  content: yup.string().required("Contenido es obligatorio"),
  image: yup.mixed().required("Imagen es obligatorio"),
});

function TestimonyEditor({ data, onSuccess }) {
  //SEND FORM
  async function submitForm(values, image) {
    try {
      testimonySchema.validateSync(values);
      if (data?.id) {
        const { success } = await putTestimonies({
          id: data.id,
          name: values.name,
          image: values.image,
          content: values.content,
        });
        if (success) {
          toast.success("Actualizado con éxito");
          onSuccess();
        } else {
          toast.error("Error al actualizar");
        }
      } else {
        const { success, errorMessage } = await postTestimonies({
          name: values.name,
          image: values.image,
          content: values.content,
        });
        if (success) {
          toast.success("Testimonio creado con éxito");
          onSuccess();
        } else {
          toast.error(errorMessage);
        }
      }
    } catch (error) {
      if (error instanceof yup.ValidationError) {
        toast.error(error.message);
      } else {
        toast.error("Sucedió un error inesperado");
      }
    }
  }

  return (
    <Fragment>
      <EntryEditor
        state={"ready"}
        entryType={"Testimonios"}
        getEntry={() => data}
        save={submitForm}
        data={data ?? {}}
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
    </Fragment>
  );
}

export default TestimonyEditor;
