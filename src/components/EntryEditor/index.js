import React, { useState, useEffect } from "react";
import Loading from "../../components/Loading";
import { EditorContainer, EditorContent, EntryType, Message } from "./styles";
import { Input, Label, Button, TextArea, TextEditor, Select } from "../Inputs";
import { Content } from "../Wrappers/Containers";

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

function EntryEditor({ id, state, entryType, get, save, data, fields }) {
  const [formData, setFormData] = useState({});

  useEffect(() => {
    setFormData({
      ...data,
    });
  }, [data]);

  return (
    <>
      {state === "loading" && (
        <EditorContent>
          <Loading />
        </EditorContent>
      )}
      {state === "ready" && (
        <EditorContent>
          {id && (
            <span>
              <h1>Editar entrada</h1> <EntryType>{entryType}</EntryType>
            </span>
          )}
          {!id && (
            <span>
              <h1>Crear entrada</h1>
              <EntryType>{entryType}</EntryType>
            </span>
          )}
          {fields.map((field) => {
            return (
              <div key={`field-${field.name}`}>
                <Label>{field.title}</Label>
                {field.type === "text" && (
                  <Input
                    type="text"
                    value={formData[field.name] || ""}
                    name={field.name}
                    onChange={({ target: { name, value } }) => {
                      setFormData({
                        ...formData,
                        [name]: value,
                      });
                    }}
                  />
                )}
                {field.type === "textarea" && (
                  <TextArea
                    value={formData[field.name] || ""}
                    name={field.name}
                    onChange={({ target: { name, value } }) => {
                      setFormData({
                        ...formData,
                        [name]: value,
                      });
                    }}
                  />
                )}
                {field.type === "select" && (
                  <Select
                    value={formData[field.name] || ""}
                    name={field.name}
                    onChange={({ target: { name, value } }) => {
                      setFormData({
                        ...formData,
                        [name]: value,
                      });
                    }}
                  >
                    <option value={null}></option>
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
                    data={formData[field.name]}
                    onChange={(event, editor) => {
                      const data = editor.getData();
                      setFormData({
                        ...formData,
                        [field.name]: data,
                      });
                    }}
                  />
                )}
              </div>
            );
          })}
          <Button onClick={() => save(formData)}>
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
