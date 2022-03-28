import React, { useState, useEffect } from "react";
import EntryEditor from "../../../components/EntryEditor";
import { Footer } from "../../../components/Footer";
import {
  getProfileByAdmin,
  updateProfileByAdmin,
} from "../../../services/requests/profile";
import { Container, Content } from "../../../components/Wrappers/Containers";
import toast from "react-hot-toast";
import * as yup from "yup";

let userSchema = yup.object().shape({
  firstName: yup
    .string()
    .max(255, "El nombre no debe superar los 255 caracteres")
    .required("Nombre es obligatorio"),
  lastName: yup
    .string()
    .max(255, "El apellido no debe superar los 255 caracteres")
    .required("Apellido es obligatorio"),
  roleId: yup.number().integer().positive().required("Rol es obligatorio"),
});

function UserEditor({ data, onSuccess }) {
  const saveData = (formData, _) => {
    updateProfileByAdmin({ ...formData, id: data.id })
      .then((response) => {
        if (!response.data.error) {
          toast.success("Los datos fueron guardados con éxito");
          onSuccess(response.data.result);
        } else {
          toast.error("Error al guardar");
        }
      })
      .catch((err) => {
        toast.error("Error al guardar");
      });
  };

  return (
    <EntryEditor
      id={data?.id ?? null}
      state={"ready"}
      entryType={"Usuarios"}
      get={() => {}}
      save={saveData}
      data={data ?? {}}
      yupSchema={userSchema}
      fields={[
        {
          name: "firstName",
          title: "Nombre",
          type: "text",
        },
        {
          name: "lastName",
          title: "Apellido",
          type: "text",
        },
        {
          name: "roleId",
          title: "Rol",
          type: "select",
          defaultValue: data?.roleId || 2,
          options: [
            {
              value: 2,
              text: `Estándar`,
            },
            {
              value: 1,
              text: `Administrador`,
            },
          ],
        },
      ]}
    />
  );
}

export default UserEditor;
