import React, { useEffect, useState } from "react";
import { Button, Input, Label } from "../../components/Inputs";

export default function Form({ fields = [], data = {}, onSubmit, onCancel }) {
  const [fieldsData, setFieldsData] = useState({});

  useEffect(() => {
    if (data) {
      const dataCopy = {};

      fields.forEach((field) => {
        dataCopy[field.name] = data[field.name] ?? "";
      });

      setFieldsData(dataCopy);
    }
  }, [data]);

  function handleSubmit(event) {
    event.preventDefault();
    onSubmit();
  }

  function updateField(event) {
    setFieldsData((state) => {
      return {
        ...state,
        [event.target.name]: event.target.value,
      };
    });
  }

  return (
    <form>
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
      <Button type="submit" onClick={handleSubmit}>
        {data ? "Actualizar" : "Envíar"}
      </Button>
      <Button type="button" onClick={onCancel}>
        Cerrar
      </Button>
    </form>
  );
}
