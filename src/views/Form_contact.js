import React, { Fragment, useState } from "react";
import { Formik } from "formik";
import Header from "../components/Header/Landing";
import {
  Container,
  ContainColumn,
  Colum,
  Form,
  Input,
  Textarea,
  Button,
  MessageError,
} from "../styles/FormContact";
import { createContact } from "../services/requests/contacts";
import Alert from "../components/Alert";

function FormContacto() {
  const [alert, setAlert] = useState({});
  const submitForm = async (values, { resetForm }) => {
    resetForm();
    try {
      const response = await createContact(values);
      if (!response.error) {
        setAlert({
          type: "success",
          show: true,
          title: "Contacto enviado correctamente.",
          description: "",
        });
      } else {
        setAlert({
          type: "error",
          show: true,
          title: "Error al intentar enviar el contacto.",
          description: response.message,
        });
      }
    } catch (error) {
      setAlert({
        type: "error",
        show: true,
        title: "Error al intentar enviar el contacto.",
        description: error.message,
      });
    }
  };

  const dataValidation = (values) => {
    let errores = {};

    //VALIDATION NAME
    if (!values.name || values.name.length < 4) {
      errores.name = "Ingrese un nombre.";
    } else if (!/^[a-zA-ZÀ-ÿ\s]{1,40}$/.test(values.name)) {
      errores.name = "El nombres solo puede contener letras y espacios.";
    }

    //VALIDATION EMAIL
    if (
      !/^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/.test(values.email)
    ) {
      errores.email = "Ingrese un email válido.";
    }

    //VALIDATION Phone
    if (!values.phone) {
      errores.phone = "Ingrese un numero de teléfono.";
    }
    //VALIDATION MESSAGE
    if (values.message.length < 30) {
      errores.message = "El mensaje debe contener más de 30 caracteres.";
    }

    return errores;
  };
  return (
    <Fragment>
      <Header />
      <Container>
        <Alert
          show={alert.show}
          title={alert.title}
          description={alert.description}
          type={alert.type}
        />

        <ContainColumn>
          <Colum>
            <h1>Es hora de poner su negocio en línea.</h1>
          </Colum>
          <Formik
            initialValues={{
              name: "",
              email: "",
              message: "",
              phone: "",
            }}
            onSubmit={submitForm}
            validate={dataValidation}
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
                  name="name"
                  type="text"
                  placeholder="Nombre y Apellido"
                  value={values.name}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                <MessageError>{touched.name && errors.name}</MessageError>
                <Input
                  name="email"
                  type="email"
                  placeholder="Email"
                  value={values.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                <MessageError>{touched.email && errors.email}</MessageError>
                <Input
                  name="phone"
                  type="phone"
                  placeholder="Teléfono"
                  value={values.phone}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                <MessageError>{touched.phone && errors.phone}</MessageError>
                <Textarea
                  name="message"
                  placeholder="Mensaje"
                  value={values.message}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                <MessageError>{touched.message && errors.message}</MessageError>
                <Button type="submit">Enviar</Button>
              </Form>
            )}
          </Formik>
        </ContainColumn>
      </Container>
    </Fragment>
  );
}

export default FormContacto;
