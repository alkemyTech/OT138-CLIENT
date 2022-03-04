import React, { Fragment, useEffect, useState } from "react";
import styled from "@emotion/styled";

import axios from "axios";
import { Formik } from "formik";
import { FiEdit, FiSave, FiTrash2, FiArrowRightCircle } from "react-icons/fi";
import toast, { Toaster } from "react-hot-toast";

const Container = styled.div`
  width: 900px;
  height: auto;
  margin: auto;
  @media (max-width: 1000px) {
    width: 100%;
  }

  @media (max-width: 600px) {
    table {
      width: 100%;
    }

    table td[data-titulo] {
      text-align: left;
    }

    table td[data-titulo]::before {
      content: attr(data-titulo);
      margin-right: 5px;
      color: #69dadb;
      font-weight: bold;
    }

    table tr {
      display: flex;
      flex-direction: column;
      border: 2px solid #1f1d36;
      border-radius: 5px;
      padding: 1em;
      margin: 10px;
      margin-bottom: 1em;
      background-color: #191a19;
      color: #fff;
    }

    table td {
      border: none;
      background: none !important;
    }

    table thead {
      display: none;
    }
  }
`;

const Form = styled.form`
  padding: 30px;
  width: 100%;
  border-radius: 0px 10px 10px 0px;
  background-color: #fff;
  @media (max-width: 1298px) {
    width: 100%;
    border-radius: 0px 0px 10px 10px;
  }
`;

const Input = styled.input`
  border: none;
  display: block;
  width: 100%;
  padding: 15px;
  margin-top: 20px;
  outline: none;
  border-radius: 5px;
  background-color: #e6e6e7;
  font-size: 15px;
`;

const Button = styled.button`
  border: none;
  background-color: #116530;
  color: #fff;
  padding: 10px 20px;
  font-size: 15px;
  border-radius: 5px;
  margin-top: 20px;
  cursor: pointer;
  font-family: "Open Sans", sans-serif;
  transition: 500ms ease;
  &:hover {
    background-color: #357c3c;
  }
`;

const ButtonUpdate = styled.button`
  border: none;
  padding: 5px 10px;
  background: #357c3c;
  border-radius: 10px;
  color: #fff;
  margin: 5px;
`;

const ButtonDelete = styled.button`
  border: none;
  padding: 5px 10px;
  background: #ff1700;
  border-radius: 10px;
  color: #fff;
  margin: 5px;
`;

const MessageError = styled.span`
  color: #da1212;
  font-size: 12px;
  margin-left: 5px;
  font-family: "Open Sans", sans-serif;
  font-weight: bold;
  display: block;
`;

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

  //DO BEGIN JXS CODE
  return (
    <Fragment>
      <Toaster position="top-center" />
      <Container>
        {data.length ? (
          <table className="table table-dark table-striped">
            <thead>
              <tr className="text-center">
                <th scope="col">ID</th>
                <th scope="col">TEXT</th>
                <th scope="col">UPDATE DATE</th>
                <th scope="col">ACTIONS</th>
              </tr>
            </thead>
            <tbody>
              {data.map((item) => {
                return (
                  <tr key={item.id} className="text-center">
                    <td>{item.id}</td>
                    <td>{item.text}</td>
                    <td>{item.updatedAt}</td>
                    <td>
                      <ButtonUpdate
                        type="button"
                        data-bs-toggle="modal"
                        data-bs-target="#exampleModal"
                        onClick={() => {
                          SetId(item.id);
                          SetDataInitial({
                            ...dataInitial,
                            text: item.text,
                            url: item.imageURL,
                          });
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
          </table>
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

        <div
          className="modal fade"
          id="exampleModal"
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLabel">
                  UPDATE SLIDER
                </h5>
              </div>
              <div className="modal-body">
                {data.length && dataInitial && (
                  <Formik
                    initialValues={{
                      text: dataInitial.text,
                      url: dataInitial.url,
                    }}
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
                        <MessageError>
                          {touched.text && errors.text}
                        </MessageError>
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
                          <FiSave /> Update
                        </Button>
                      </Form>
                    )}
                  </Formik>
                )}
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-bs-dismiss="modal"
                  onClick={() => {
                    SetDataInitial(undefined);
                  }}
                >
                  <FiArrowRightCircle />
                </button>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </Fragment>
  );
}

export default EditForm;
