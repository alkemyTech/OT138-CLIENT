import React, { Fragment, useEffect, useState } from "react";
import axios from "axios";
import { Formik } from "formik";
import { FiEdit, FiSave, FiTrash2, FiXSquare } from "react-icons/fi";
import toast, { Toaster } from "react-hot-toast";
import {
  Container,
  Form,
  Input,
  Button,
  ButtonUpdate,
  ButtonDelete,
  MessageError,
  Table,
  ContainerModal,
  Modal,
  ButtomModal,
} from "../styles/EditForm";

function EditForm() {
  //DATA CALL
  useEffect(() => {
    axios("http://localhost:4000/api/slides")
      .then((response) => {
        SetData(response.data.slider);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  //CREATION OF STATES
  const [data, SetData] = useState([]);
  const [id, SetId] = useState();
  const [dataInitial, SetDataInitial] = useState(undefined);
  const [show, SetShow] = useState({ width: "0px", height: "0px;" });
  const [containModal, SetContainModal] = useState({
    width: "0px",
    height: "0px;",
  });

  //DELETE A SLIDER
  function DeleteSlider(id) {
    SetId(id);
    const confirmation = window.confirm("Deseas eliminar este Slider");
    if (confirmation) {
      axios
        .delete(`http://localhost:4000/api/slides/${id}`)
        .then((response) => {
          if (response.data.error) {
            toast.error(response.data.message);
          } else {
            toast.success(response.data.message);
            setTimeout(() => {
              window.location.reload();
            }, 1200);
          }
        })
        .catch((error) => {
          toast.error("An error occurred " + error);
        });
    }
  }

  //SHOW MODAL
  function ShowModal() {
    SetShow({ width: "450px", height: "350px;" });
    SetContainModal({ width: "100%;", height: "100vh;" });
  }

  //DO BEGIN JXS CODE
  return (
    <Fragment>
      <Toaster position="top-center" />
      <Container>
        {data.length ? (
          <Table>
            <thead>
              <tr>
                <th>ID</th>
                <th>TEXT</th>
                <th>UPDATE DATE</th>
                <th>ACTIONS</th>
              </tr>
            </thead>
            <tbody>
              {data.map((item) => {
                return (
                  <tr key={item.id}>
                    <td>{item.id}</td>
                    <td>{item.text}</td>
                    <td>{item.updatedAt}</td>
                    <td>
                      <ButtonUpdate
                        type="button"
                        onClick={() => {
                          SetId(item.id);
                          SetDataInitial({
                            ...dataInitial,
                            text: item.text,
                            url: item.imageURL,
                          });
                          ShowModal();
                        }}
                      >
                        <FiEdit />
                      </ButtonUpdate>
                      <ButtonDelete
                        type="button"
                        onClick={() => {
                          DeleteSlider(item.id);
                        }}
                      >
                        <FiTrash2 />
                      </ButtonDelete>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </Table>
        ) : (
          <Formik
            initialValues={{
              imageURL: "",
              text: "",
              url: "",
              order: "",
              organizationID: "",
            }}
            onSubmit={(values, { resetForm }) => {
              resetForm();
              axios
                .post("http://localhost:4000/api/slides", {
                  imageURL: values.url,
                  text: values.text,
                  order: values.order,
                  organizationID: values.organizationID,
                })
                .then((response) => {
                  if (response.data.error) {
                    toast.error(response.data.message);
                  } else {
                    toast.success(response.data.message);
                    setTimeout(() => {
                      window.location.reload();
                    }, 1200);
                  }
                })
                .catch(() => {
                  toast.error("Could not connect to server");
                });
            }}
            validate={(values) => {
              let errores = {};

              //VALIDATION TEXT
              if (values.text.length < 10) {
                errores.text = "The message is very short";
              } else if (!/^[a-zA-ZÀ-ÿ\s]{1,40}$/.test(values.text)) {
                errores.text =
                  "The message can only contain letters and spaces.";
              }

              //VALIDATE URL
              if (values.url.length < 20) {
                errores.url = "Url is too short";
              }

              //VALIDATE ORDER
              if (!values.order) {
                errores.order = "Specify an order";
              }

              //VALIDATE ORGANIZATION-ID
              if (!values.organizationID) {
                errores.organizationID = "there is no ID";
              }

              return errores;
            }}
          >
            {({
              values,
              handleSubmit,
              handleChange,
              handleBlur,
              errors,
              touched,
            }) => (
              <Fragment>
                <h1 className="mx-4">CREATE SLIDER</h1>
                <Form onSubmit={handleSubmit}>
                  <Input
                    name="text"
                    type="text"
                    placeholder="Slider text"
                    value={values.text}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  <MessageError>{touched.text && errors.text}</MessageError>
                  <Input
                    name="url"
                    type="text"
                    placeholder="New url"
                    value={values.url}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  <MessageError>{touched.url && errors.url}</MessageError>
                  <Input
                    name="order"
                    type="number"
                    placeholder="Order"
                    value={values.order}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  <MessageError>{touched.order && errors.order}</MessageError>
                  <Input
                    name="organizationID"
                    type="number"
                    placeholder="organizationID"
                    value={values.organizationID}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  <MessageError>
                    {touched.organizationID && errors.organizationID}
                  </MessageError>
                  <Button type="submit">Create</Button>
                </Form>
              </Fragment>
            )}
          </Formik>
        )}
      </Container>
      <ContainerModal width={containModal.width} height={containModal.height}>
        <Modal width={show.width} height={show.height}>
          {data.length && dataInitial && (
            <Formik
              initialValues={{ text: dataInitial.text, url: dataInitial.url }}
              onSubmit={(values) => {
                axios
                  .put(`http://localhost:4000/api/slides/${id}`, {
                    imageURL: values.url,
                    text: values.text,
                  })
                  .then((response) => {
                    if (response.data.error) {
                      toast.error(response.data.message);
                    } else {
                      toast.success(response.data.message);
                      setTimeout(() => {
                        window.location.reload();
                      }, 1200);
                    }
                  })
                  .catch((error) => {
                    console.log(error);
                  });
              }}
              validate={(values) => {
                let errores = {};

                //VALIDATION TEXT
                if (values.text.length < 10) {
                  errores.text = "The message is very short";
                }

                //VALIDATE URL
                if (values.url.length < 20) {
                  errores.url = "Url is too short";
                }
                return errores;
              }}
            >
              {({
                values,
                handleSubmit,
                handleChange,
                handleBlur,
                errors,
                touched,
              }) => (
                <Form onSubmit={handleSubmit}>
                  <Input
                    name="text"
                    type="text"
                    placeholder="Slider text"
                    value={values.text}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  <MessageError>{touched.text && errors.text}</MessageError>
                  <Input
                    name="url"
                    type="text"
                    placeholder="New url"
                    value={values.url}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  <MessageError>{touched.url && errors.url}</MessageError>
                  <Button type="submit">
                    <FiSave />
                    UPDATE
                  </Button>
                  <ButtomModal
                    onClick={() => {
                      SetDataInitial(undefined);
                      SetShow({ width: "0px", height: "0px;" });
                      SetContainModal({ width: "0px", height: "0px;" });
                    }}
                  >
                    <FiXSquare />
                    CLOSE
                  </ButtomModal>
                </Form>
              )}
            </Formik>
          )}
        </Modal>
      </ContainerModal>
    </Fragment>
  );
}

export default EditForm;
