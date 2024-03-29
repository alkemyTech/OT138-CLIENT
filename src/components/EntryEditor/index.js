import React, { useState, useEffect } from "react";
import Loading from "../../components/Loading";
import { EditorContent, EntryType, Message, ValidationMessage } from "./styles";
import { Input, Label, Button, TextArea, TextEditor, Select } from "../Inputs";
import Dropzone from "../../components/Dropzone";
import toast from "react-hot-toast";
import { ValidationError } from "yup";
/**
 *
 * @param {integer} [id] The entry id. If not provided, the function assumes that it will create a new entry
 * @param {string} state The loading state. Must be "loading", "ready" or "error"
 * @param {string} entryType The entry type ('Actividades', 'Novedades', etc.). Must start with uppercase.
 * @param {requestCallback} get The callback function used to get the data. Used when the user need to retry the load
 * @param {requestCallback} save The callback function to save (no matter if it is to create or update)
 * @param {object} data The data getted from the server
 * @param {Object[]} fields The form structure (list of inputs) and needed input values
 * @param {string} fields[].type Input type ('text', 'textarea', 'select' orr 'content' -type 'select' must include a 'options' array with value and text for each item )
 * @param {string} fields[].name Input name (must match with the serverside required field name)
 * @param {string} fields[].tittle Translated field name, which will be displayed
 * @returns {component} EntryEditor, a React component that renders a form for loading, creating and/or updating entries
 */

function EntryEditor({
  id,
  state,
  entryType,
  get,
  save,
  data,
  fields,
  yupSchema,
}) {
  const [fieldsWithData, setFieldsWithData] = useState([]);
  const [checked, setChecked] = useState(false);
  const [sendImage, setSendImage] = useState();
  const [displayImage, setDisplayImage] = useState("/upload.png");
  const [validationErrors, setValidationErrors] = useState({});
  const [touchedField, setTouchedField] = useState({});

  useEffect(() => {
    setFieldsWithData(
      fields.map((field) => {
        return {
          ...field,
          value: data[field.name]
            ? data[field.name]
            : field?.defaultValue
            ? field?.defaultValue
            : "",
        };
      })
    );
    if (data.image) {
      setDisplayImage(data.image);
      setSendImage(data.image);
    }
  }, [data, fields]);

  // validate date on every change
  useEffect(() => {
    //only validate if yupSchema is present
    if (yupSchema) {
      const formData = {};
      fieldsWithData.forEach((field) => {
        formData[field.name] = field.value;
      });
      let valErrors = {};
      try {
        yupSchema.validateSync(formData, { abortEarly: false });
      } catch (error) {
        error.inner.forEach((elem) => {
          valErrors[elem.path] = elem.message;
        });
      }
      setValidationErrors(valErrors);
    }
  }, [fieldsWithData]);

  const updateField = (fieldName, fieldValue) => {
    let newTouchedField = touchedField;
    newTouchedField[fieldName] = true;
    setTouchedField(newTouchedField);
    setFieldsWithData((state) => {
      const newState = [...state];
      const index = state.findIndex((field) => field.name === fieldName);
      if (index >= 0) {
        newState[index].value = fieldValue;
      }
      return newState;
    });
  };

  const onSave = () => {
    const formData = {};
    fieldsWithData.forEach((field) => {
      formData[field.name] = field.value;
    });
    // put dropzone data in form data also.
    const dropzones = fieldsWithData.filter((val) => {
      return val.type === "dropzone";
    });
    if (dropzones.length > 0) {
      formData[dropzones[0].name] = sendImage;
    }
    try {
      if (yupSchema)
        yupSchema.validateSync(formData, {
          abortEarly: false,
        });
      save(formData, sendImage); // sendImage not longer necessary but maintained for compatibility
    } catch (error) {
      if (error instanceof ValidationError) {
        toast.error(error.errors.join("\n"));
      } else {
        throw error;
      }
    }
  };

  const onChangeStatus = ({ meta, file, remove }, status) => {
    if (status === "done") {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = async (event) => {
        setSendImage(file);
        setDisplayImage(file);
      };
    }
    if (status === "removed") {
      setSendImage(null);
    }
  };

  const onSubmitFile = (files, allFiles) => {
    allFiles.forEach((f) => f.remove());
  };

  return (
    <>
      {state === "loading" && (
        <EditorContent>
          <Loading />
        </EditorContent>
      )}
      {state === "ready" && (
        <EditorContent>
          {Object.keys(data).length !== 0 && (
            <span>
              <h1>Editar entrada</h1> <EntryType>{entryType}</EntryType>
            </span>
          )}
          {Object.keys(data).length === 0 && (
            <span>
              <h1>Crear entrada</h1>
              <EntryType>{entryType}</EntryType>
            </span>
          )}
          {fieldsWithData.map((field) => {
            return (
              <div key={`field-${field.name}`}>
                {(field.type !== "checkbox" ||
                  Object.keys(data).length === 0) && (
                  <Label>{field.title}</Label>
                )}

                {field.type === "text" && (
                  <Input
                    type="text"
                    value={field.value}
                    name={field.name}
                    onChange={({ target: { name, value } }) =>
                      updateField(name, value)
                    }
                  />
                )}
                {field.type === "number" && (
                  <Input
                    type="number"
                    value={field.value}
                    name={field.name}
                    onChange={({ target: { name, value } }) =>
                      updateField(name, value)
                    }
                  />
                )}
                {field.type === "textarea" && (
                  <TextArea
                    value={field.value}
                    name={field.name}
                    onChange={({ target: { name, value } }) =>
                      updateField(name, value)
                    }
                  />
                )}
                {field.type === "select" && (
                  <Select
                    value={field.value}
                    name={field.name}
                    defaultValue={field.defaultValue}
                    onChange={({ target: { name, value } }) =>
                      updateField(name, value)
                    }
                  >
                    {field.options.map((option, index) => {
                      return (
                        <option value={option.value} key={`option-${index}`}>
                          {option.text}
                        </option>
                      );
                    })}
                  </Select>
                )}
                {field.type === "content" && (
                  <TextEditor
                    name={field.name}
                    data={field.value}
                    onChange={(event, editor) => {
                      const data = editor.getData();
                      updateField(field.name, data);
                    }}
                  />
                )}
                {field.type === "dropzone" && (
                  <Dropzone
                    defaultImage={field.value}
                    onChangeStatus={onChangeStatus}
                    onSubmit={onSubmitFile}
                  />
                )}
                {Object.keys(data).length === 0 && field.type === "checkbox" && (
                  <label>
                    <input
                      type="checkbox"
                      id="cbox1"
                      value={checked}
                      defaultValue={field.defaultValue}
                      onChange={(e) => {
                        updateField(field.name, !checked);
                        setChecked(!checked);
                      }}
                    />
                  </label>
                )}
                <ValidationMessage>
                  {touchedField[field.name] && validationErrors[field.name]}
                </ValidationMessage>
              </div>
            );
          })}
          <Button
            style={{ margin: "1rem 0 0 0" }}
            onClick={(event) => {
              event.preventDefault();
              onSave();
            }}
          >
            <b>GUARDAR</b>
          </Button>
        </EditorContent>
      )}
      {state === "load_error" && (
        <EditorContent>
          <Message alert>
            <span>Error al cargar los datos</span>
            <Button onClick={get} children={"Cargar de nuevo"} />
          </Message>
        </EditorContent>
      )}
    </>
  );
}

export default EntryEditor;
