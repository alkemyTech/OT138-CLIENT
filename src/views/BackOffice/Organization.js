import React, { useEffect, useState } from "react";
import EntryEditor from "../../components/EntryEditor";
import toast, { Toaster } from "react-hot-toast";
import { Container, Content } from "../../components/Wrappers/Containers";
import {
  getPublicData,
  updatePublicData,
} from "../../services/requests/publicData";
import * as yup from "yup";
import Form from "../../components/Form";

function Organization() {
  const [data, setData] = useState({});
  const [state, setState] = useState("ready");

  const getOrganization = async () => {
    const { success, data: publicData, errorMessage } = await getPublicData();

    if (success) {
      setData({
        name: publicData.name,
        image: publicData.image,
      });
    } else {
      toast.error("Error al buscar datos de la organización: " + errorMessage);
    }
  };
  useEffect(() => {
    getOrganization();
  }, []);

  let organizationSchema = yup.object().shape({
    name: yup.string().required("Nombre es un campo obligatorio."),
    image: yup.string().required("URL de la imagen es un campo obligatorio."),
  });

  const saveOrganization = async (formData) => {
    setState("loading");

    try {
      console.log(formData);
      organizationSchema.validateSync(formData);

      const { success, errorMessage } = await updatePublicData(formData);

      if (success) {
        toast.success("Los datos fueron grabados correctamente.");
        getOrganization();
      } else {
        toast.error(errorMessage);
      }
    } catch (error) {
      console.log(error);
      toast.error("Error de validación");
    } finally {
      setState("ready");
    }
  };

  return (
    <Container>
      <Toaster />
      <Content>
        <Form style={{ maxWidth: "600px" }}>
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
        </Form>
      </Content>
    </Container>
  );
}

export default Organization;
