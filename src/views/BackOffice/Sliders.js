import React, { useEffect, useState } from "react";
import { FiEdit, FiTrash2 } from "react-icons/fi";
import toast, { Toaster } from "react-hot-toast";
import { Container, Content } from "../../components/Wrappers/Containers";
import {
  Form,
  Input,
  ButtonGroup,
  Button,
  MessageError,
  ContainerModal,
} from "../../styles/EditForm";
import Table from "../../components/Table";
import {
  getSlides,
  deleteSlides,
  postSlides,
  putSlides,
} from "../../services/requests/slides";
import Header from "../../components/Header/BackOffice";
import { Avatar } from "../../components/Inputs/styles";
import {
  AddButton,
  HeaderButtons,
  SectionTitle,
} from "../../styles/BackOffice";
import { FaPlusSquare } from "react-icons/fa";

function Sliders() {
  //CREATION OF STATES
  const [data, SetData] = useState([]);
  const [id, SetId] = useState();
  const [dataUpdate, SetDataUpdate] = useState({ text: "", imageURL: "" });
  const [show, SetShow] = useState({ opacity: "0", index: "-1" });
  const [values, SetValues] = useState({
    text: "",
    imageURL: "",
    order: "",
    organizationID: "",
  });
  const [errors, SetErrors] = useState({
    text: "",
    imageURL: "",
    order: "",
    organizationID: "",
  });

  useEffect(() => {
    Obtener();
  }, []);

  //GET SLIDER
  async function Obtener() {
    const response = await getSlides();
    SetData(response.data);
  }

  //CREATE SLIDER
  async function Crear(e) {
    e.preventDefault();
    if (values.text.length < 10) {
      SetErrors({
        text: "El mensaje es muy corto",
        imageURL: "",
        order: "",
        organizationID: "",
      });
    } else if (!/^[a-zA-ZÀ-ÿ\s]{1,40}$/.test(values.text)) {
      SetErrors({
        text: "El mensaje solo puede contener letras y espacios.",
        imageURL: "",
        order: "",
        organizationID: "",
      });
    } else if (values.imageURL.length < 20) {
      SetErrors({
        text: "",
        imageURL: "La URL es demasiado corta",
        order: "",
        organizationID: "",
      });
    } else if (!values.order) {
      SetErrors({
        text: "",
        imageURL: "",
        order: "Especificar un pedido",
        organizationID: "",
      });
    } else if (!values.organizationID) {
      SetErrors({
        text: "",
        imageURL: "",
        order: "",
        organizationID: "No hay identificación",
      });
    } else {
      SetErrors({ text: "", imageURL: "", order: "", organizationID: "" });
      const { error, errorMessage, successMessage } = await postSlides(values);
      if (error) {
        toast.error(errorMessage);
      } else {
        toast.success(successMessage);
        SetValues({ text: "", imageURL: "", order: "", organizationID: "" });
        setTimeout(() => {
          window.location.reload();
        }, 1200);
      }
    }
  }

  //UPDATE SLIDER
  async function UpdateSlider(e) {
    e.preventDefault();
    if (dataUpdate.text.length < 10) {
      SetErrors({
        text: "The message is very short",
        imageURL: "",
        order: "",
        organizationID: "",
      });
    } else if (dataUpdate.imageURL.length < 20) {
      SetErrors({
        text: "",
        imageURL: "Url is too short",
        order: "",
        organizationID: "",
      });
    } else {
      SetErrors({ text: "", imageURL: "", order: "", organizationID: "" });
      const { error, errorMessage, successMessage } = await putSlides(
        dataUpdate.text,
        dataUpdate.imageURL,
        id
      );
      if (error) {
        toast.error(errorMessage);
      } else {
        toast.success(successMessage);
        SetValues({ text: "", imageURL: "", order: "", organizationID: "" });
        setTimeout(() => {
          window.location.reload();
        }, 1200);
      }
    }
  }

  //DELETE A SLIDER
  async function DeleteSlider(id) {
    SetId(id);
    const confirmation = window.confirm("Deseas eliminar este Slider");
    if (confirmation) {
      const { error, errorMessage, successMessage } = await deleteSlides(id);
      if (error) {
        toast.error(errorMessage);
      } else {
        toast.success(successMessage);
        setTimeout(() => {
          window.location.reload();
        }, 1200);
      }
    }
  }

  //SHOW MODAL
  function ShowModal() {
    SetShow({ opacity: "1", index: "1" });
  }

  //DO BEGIN JXS CODE
  return (
    <Container>
      <Toaster position="top-center" />
      <Header />
      <Content>
        {data.length ? (
          <>
            <SectionTitle>Listado de Diapositivas</SectionTitle>
            <HeaderButtons>
              <AddButton
                style={{ background: "green" }}
                onClick={() => {
                  ShowModal();
                  SetDataUpdate({ text: "", imageURL: "" });
                  SetId(undefined);
                }}
              >
                <FaPlusSquare /> <b>Crear</b>
              </AddButton>
            </HeaderButtons>
            <Table>
              <thead>
                <tr>
                  <th>Portada</th>
                  <th>Contenido</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {data.map((item) => {
                  return (
                    <tr key={item.id}>
                      <td>
                        <Avatar src={item.imageURL} />
                      </td>
                      <td>{item.text}</td>
                      <td>
                        <Button
                          type="button"
                          style={editButtonStyle}
                          onClick={() => {
                            ShowModal();
                            SetDataUpdate({
                              text: item.text,
                              imageURL: item.imageURL,
                            });
                            SetId(item.id);
                          }}
                        >
                          <FiEdit />
                        </Button>
                        <Button
                          type="button"
                          style={deleteButtonStyle}
                          onClick={() => {
                            DeleteSlider(item.id);
                          }}
                        >
                          <FiTrash2 />
                        </Button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </Table>
          </>
        ) : null}
      </Content>

      <ContainerModal opacity={show.opacity} index={show.index}>
        {id ? (
          <Form
            onSubmit={(e) => {
              UpdateSlider(e);
            }}
          >
            <h1>Formulario de slider</h1>
            <Input
              name="text"
              type="text"
              placeholder="Slider text"
              value={dataUpdate.text}
              onChange={(e) => {
                SetDataUpdate({ ...dataUpdate, text: e.target.value });
              }}
            />
            <MessageError>{errors.text}</MessageError>

            <Input
              name="url"
              type="text"
              placeholder="New url"
              value={dataUpdate.imageURL}
              onChange={(e) => {
                SetDataUpdate({ ...dataUpdate, imageURL: e.target.value });
              }}
            />
            <MessageError>{errors.imageURL}</MessageError>

            <ButtonGroup>
              <Button type="submit" style={saveButtonStyle}>
                Enviar
              </Button>
              <Button
                type="button"
                style={closeButtonStyle}
                onClick={() => {
                  SetShow({ opacity: "0", index: "-1" });
                }}
              >
                Cerrar
              </Button>
            </ButtonGroup>
          </Form>
        ) : (
          <Form
            onSubmit={(e) => {
              Crear(e);
            }}
          >
            <h1>Formulario de slider</h1>
            <Input
              name="text"
              type="text"
              placeholder="Texto de slider"
              value={values.text}
              onChange={(e) => {
                SetValues({ ...values, text: e.target.value });
              }}
            />
            <MessageError>{errors.text}</MessageError>
            <Input
              name="url"
              type="text"
              placeholder="Url de la imagen"
              value={values.imageURL}
              onChange={(e) => {
                SetValues({ ...values, imageURL: e.target.value });
              }}
            />
            <MessageError>{errors.imageURL}</MessageError>
            <Input
              name="order"
              type="number"
              placeholder="Order"
              value={values.order}
              onChange={(e) => {
                SetValues({ ...values, order: e.target.value });
              }}
            />
            <MessageError>{errors.order}</MessageError>
            <Input
              name="organizationID"
              type="number"
              placeholder="ID de organización"
              value={values.organizationID}
              onChange={(e) => {
                SetValues({ ...values, organizationID: e.target.value });
              }}
            />
            <MessageError>{errors.organizationID}</MessageError>
            <Button type="submit" style={saveButtonStyle}>
              Guardar
            </Button>
            <Button
              type="button"
              style={closeButtonStyle}
              onClick={() => {
                SetShow({ opacity: "0", index: "-1" });
              }}
            >
              Cerrar
            </Button>
          </Form>
        )}
      </ContainerModal>
    </Container>
  );
}

const editButtonStyle = {
  width: "40px",
  height: "40px",
  background: "orange",
};

const deleteButtonStyle = {
  width: "40px",
  height: "40px",
  background: "red",
};

const saveButtonStyle = {
  width: "50%",
  height: "40px",
  background: "#009600",
};

const closeButtonStyle = {
  width: "50%",
  height: "40px",
  background: "#6e6e6e",
};

export default Sliders;
