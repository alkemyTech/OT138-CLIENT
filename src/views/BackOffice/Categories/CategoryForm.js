import React, { useEffect, useState } from "react";
import {
  updateCategory,
  createCategory,
} from "../../../services/requests/categories";
import Form from "../../../components/Form";
import toast from "react-hot-toast";
import {
  SubmitButton,
  CancelButton,
  InputFeedback,
} from "../../../components/Form/styles";
import { useFormik } from "formik";
import { Input, ButtonGroup, Label } from "../../../components/Inputs";
import * as Yup from "yup";
import EntryEditor from "../../../components/EntryEditor";

/**
 * Form component to create or update a category.
 * @param {*} props Receives:
 *      - instance: (optional) existing category. If null, the component will render a form to create a category
 *      - onCancel: (required) Callback function to run after clicking the cancel button
 *      - onSuccess: (optional) Callback function to run after a successful update or create.
 *          Sends the new or updated instance as the first argument of the function.
 */
export default function CategotyForm({ instance, onCancel, onSuccess }) {
  const [backendValidationErrors, setBackendValidationErrors] = useState({});

  async function submit(values) {
    try {
      const result = await validationSchema.validate(values);
      console.log("result", result);
      if (instance !== null) {
        const { success, data, errorMessage, errorFields } =
          await updateCategory(instance.id, values);
        if (success) {
          if (onSuccess) onSuccess(data);
        } else {
          toast.error("Error al actualizar categoría: " + errorMessage);
          setBackendValidationErrors(errorFields);
        }
      } else {
        const { success, data, errorMessage, errorFields } =
          await createCategory(values);
        if (success) {
          if (onSuccess) onSuccess(data);
        } else {
          toast.error("Error al crear categoría: " + errorMessage);
          setBackendValidationErrors(errorFields);
        }
      }
    } catch (error) {
      if (error instanceof Yup.ValidationError) {
        toast.error(error.message);
        console.log(error)
      } else {
        throw error;
      }
    }
  }
  const validationSchema = Yup.object().shape({
    name: Yup.string()
      .max(255, "El nombre no debe superar los 255 caracteres")
      .required("Campo nombre es obligatorio"),
    description: Yup.string()
      .max(255, "La descripción no debe superar los 255 caracteres")
      .required("Campo descripción es obligatorio"),
  });

  return (
    <EntryEditor
      state={"ready"}
      entryType={"Categorías"}
      save={submit}
      data={instance ?? {}}
      fields={[
        {
          name: "name",
          title: "Nombre",
          type: "text",
        },
        {
          name: "description",
          title: "Descripción",
          type: "text",
        },
      ]}
    />
  );
}
