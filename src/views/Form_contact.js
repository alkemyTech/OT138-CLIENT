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
          title: "Created contact correctly",
          description: "",
        });
      } else {
        setAlert({
          type: "error",
          show: true,
          title: "Error creating contact",
          description: response.message,
        });
      }
    } catch (error) {
      setAlert({
        type: "error",
        show: true,
        title: "Error creating contact",
        description: error.message,
      });
    }
  };

  const dataValidation = (values) => {
    let errores = {};

    //VALIDATION NAME
    if (!values.name || values.name.length < 4) {
      errores.name = "Please enter a name";
    } else if (!/^[a-zA-ZÀ-ÿ\s]{1,40}$/.test(values.name)) {
      errores.name = "The name can only contain letters and spaces";
    }

    //VALIDATION EMAIL
    if (
      !/^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/.test(values.email)
    ) {
      errores.email = "Enter a valid email";
    }

    //VALIDATION Phone
    if (!values.phone) {
      errores.phone = "Please enter a phone number";
    }
    //VALIDATION MESSAGE
    if (values.message.length < 30) {
      errores.message = "The message is very short";
    }

    return errores;
  };
  return (
    <Fragment>
      <Container>
        <Header />
        <Alert
          show={alert.show}
          title={alert.title}
          description={alert.description}
          type={alert.type}
        />

        <ContainColumn>
          <Colum>
            <h1>It's time to bring your business online.</h1>
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
                  placeholder="Full name"
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
                  placeholder="Phone"
                  value={values.phone}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                <MessageError>{touched.phone && errors.phone}</MessageError>
                <Textarea
                  name="message"
                  placeholder="Message"
                  value={values.message}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                <MessageError>{touched.message && errors.message}</MessageError>
                <Button type="submit">Send form</Button>
              </Form>
            )}
          </Formik>
        </ContainColumn>
      </Container>
    </Fragment>
  );
}

export default FormContacto;
