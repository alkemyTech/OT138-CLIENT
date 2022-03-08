import React, { useEffect, useState } from "react";
import EntryEditor from "../../components/EntryEditor";
import toast, { Toaster } from "react-hot-toast";
import { Container, Content } from "../../components/Wrappers/Containers";
import { getPublicData } from "../../services/requests/publicData";
function Organization() {
  const [data, setData] = useState({});
  // const [state, setState] = useState("ready");

  const getOrganization = async () => {
    const response = await getPublicData();
    console.log(response);
    if (response.success) {
      setData({
        name: response.data.result.name,
        image: response.data.result.image,
      });
    } else {
      toast("Error al buscar datos de la organización");
    }
  };
  useEffect(() => {
    getOrganization();
  }, []);

  const saveOrganization = async (formData) => {
    console.log(formData);
    toast("Save Data");
    // aca tiene que ir el request para editar los datos
  };

  return (
    <Container>
      <Toaster />
      <Content>
        <EntryEditor
          id={1}
          state={"ready"}
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
