import React from "react";
import EntryEditor from "../../../components/EntryEditor";
import { createNewsEntry, updateEntry } from "../../../services/requests/news";
import toast from "react-hot-toast";

import * as yup from "yup";

let newsSchema = yup.object().shape({
  name: yup.string().required("Nombre es obligatorio"),
  content: yup.string().required("Contenido es obligatorio"),
  image: yup.mixed().required("Imagen es obligatorio"),
});

function NewsEditor({ data, onSuccess }) {
  const save = async (formData, image) => {
    if (data) {
      // If there is an existing ID, then the form has to update the existing data on new
      const {
        success,
        data: updatedEntry,
        errorMessage,
      } = await updateEntry(data.id, {
        name: formData.name,
        content: formData.content,
        categoryId: formData.categoryId,
        image: image,
      });
      if (success) {
        toast.success("Guardado con éxito");
        onSuccess(updatedEntry);
      } else {
        toast.error("Error al actualizar: " + errorMessage);
      }
    } else {
      // Else, the form has to create a new new
      const {
        success,
        data: createdEntry,
        errorMessage,
      } = await createNewsEntry({
        name: formData.name,
        content: formData.content,
        categoryId: formData.categoryId,
        image: image,
      });

      if (success) {
        toast.success("Entrada creada con éxito");
        onSuccess(createdEntry);
      } else {
        toast.error("Error al crear entrada: " + errorMessage);
      }
    }
  };

  return (
    <EntryEditor
      id={data?.id ?? null}
      state={"ready"}
      entryType={"Novededes"}
      get={() => {}}
      save={save}
      data={data ?? {}}
      yupSchema={newsSchema}
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
          name: "categoryId",
          title: "Categoría",
          type: "select",
          defaultValue: 1,
          options: categoriesOptions,
        },
      ]}
    />
  );
}

export default NewsEditor;

const categoriesOptions = [
  {
    value: 1,
    text: "General",
  },
  {
    value: 2,
    text: "Actualidad",
  },
];
