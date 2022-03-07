import React, { useEffect, useState } from "react";
import { ButtonGroup, Input, Label } from "../../components/Inputs";
import { FormStyle, CancelButton, SubmitButton, InputFeedback } from "./styles";

/**
 * Generic form component. Renders an update form or a create form depending on the value of the instance prop.
 * @param {*} props Properties:
 *      - fields: (required) Array of objects containing the form inputs with the format: {name, type, placeholder}.
 *             Example: [{name: 'description', type: 'text', placeholder: 'Enter description'}, ...]
 *      - instance: (optional). Object containing the data of the instance. If defined, inputs will be filled with the
 *          data of the instance object, accessed by the 'name' propery in the fields array.
 *      - onSubmit: (required) Callback function to be executed after clicking the submit button
 *      - onCancel: (required) Callback function to be executed after clicking the cancel button
 *      - errors: (optional) Object containing errors to be displayed under the inputs. It should contain a key-value pair in the form:
 *        { fieldName: errorText }
 */
export default function Form({
  fields = [],
  instance,
  onSubmit,
  onCancel,
  errors,
}) {
  const [fieldsData, setFieldsData] = useState({});

  useEffect(() => {
    const dataCopy = {};

    fields.forEach((field) => {
      dataCopy[field.name] = instance && instance[field.name];
    });

    setFieldsData(dataCopy);
  }, [instance]);

  function handleSubmit(event) {
    event.preventDefault();
    onSubmit(fieldsData);
  }

  function updateField(event) {
    event.persist();
    setFieldsData((state) => {
      return {
        ...state,
        [event.target.name]: event.target.value,
      };
    });
  }

  return (
    <FormStyle>
      {fields.map((field, index) => {
        return (
          <div key={index}>
            {field.label && <Label>{field.label}</Label>}
            <Input
              type={field.type}
              name={field.name}
              placeholder={field.placeholder}
              value={fieldsData[field.name] ?? ""}
              onChange={(event) => updateField(event)}
            />
            <InputFeedback type="error">
              {errors && errors[field.name]}
            </InputFeedback>
          </div>
        );
      })}
      <ButtonGroup align="center" gap="5px">
        <SubmitButton type="submit" onClick={handleSubmit}>
          {instance ? "Actualizar" : "Envíar"}
        </SubmitButton>
        <CancelButton type="button" onClick={onCancel}>
          Cerrar
        </CancelButton>
      </ButtonGroup>
    </FormStyle>
  );
}
