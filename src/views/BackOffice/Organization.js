import React, { useEffect, useState } from "react";
import EntryEditor from "../../components/EntryEditor";
import toast, { Toaster } from "react-hot-toast";
import { Container, Content } from "../../components/Wrappers/Containers";
import {
  getPublicData,
  updatePublicData,
} from "../../services/requests/publicData";
import * as yup from "yup";
function Organization() {
  const [data, setData] = useState({});
  const [state, setState] = useState("ready");

  const getOrganization = async () => {
    const response = await getPublicData();
    if (response.success) {
      setData({
        name: response.data.result.name,
        image: response.data.result.image,
      });
    } else {
      toast.error("Error al buscar datos de la organización");
    }
  };
  useEffect(() => {
    getOrganization();
  }, []);

  let organizationSchema = yup.object().shape({
    name: yup.string().required("Nombre es un campo obligatorio."),
    image: yup
      .string()
      .url("URL de la imagen no es valido.")
      .required("URL de la imagen es un campo obligatorio."),
  });
  const saveOrganization = async (formData) => {
    setState("loading");
    try {
      organizationSchema.validateSync(formData);
      const res = await updatePublicData(formData);
      if (res.error === false) {
        toast.success("Los datos fueron grabados correctamente.");
        setState("ready");
      } else {
        toast.error("Sucedió un error al grabar los datos.");
        setState("ready");
      }
    } catch (error) {
      if (error instanceof yup.ValidationError) {
        toast.error(error.message);
      } else {
        toast.error("Sucedió un error inesperado.");
        console.log(error);
      }
      setState("ready");
    }
  };

  return (
    <Container>
      <Toaster />
      <Content>
        <EntryEditor
          id={1}
          state={state}
          entryType={"Organización"}
          getEntry={getOrganization}
          save={saveOrganization}
          data={data}
          fields={[
            {
              name: "name",
              title: "Nombre",
              type: "text",
            },
            {
              name: "image",
              title: "Url de imagen",
              type: "text",
            },
          ]}
        />
      </Content>
    </Container>
  );
}

export default Organization;
