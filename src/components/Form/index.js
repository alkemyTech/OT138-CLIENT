import React, { useEffect, useState } from "react";
import {
  Button,
  ButtonGroup,
  Input,
  Label,
  TextArea,
} from "../../components/Inputs";
import { FormStyle, CancelButton, SubmitButton } from "./styles";

export default function Form({
  fields = [],
  instance,
  onSubmit,
  onCancel,
}) {
  const [fieldsData, setFieldsData] = useState({});

  useEffect(() => {
    if (instance) {
      const dataCopy = {};

      fields.forEach((field) => {
        dataCopy[field.name] = instance[field.name] ?? "";
      });

      setFieldsData(dataCopy);
    }
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
