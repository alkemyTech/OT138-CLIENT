import React from "react";
import { Formik } from "formik";
import {
  ContainColumn,
  Image,
  Form,
  MessageError,
} from "../styles/FormContact";
import { Footer } from "../components/Footer";
import { Button } from "../components/Inputs";
import { createContact } from "../services/requests/contacts";
import { Container, Content } from "../components/Wrappers/Containers";
import { Toaster, toast } from "react-hot-toast";
import { Input, TextArea } from "../components/Inputs";
import { SendridContact } from "../services/requests/sendGrid";

function FormContacto() {

  const submitForm = async (values, { resetForm }) => {
    resetForm();
    try {
      const response = await createContact(values);
      await SendridContact(values);
      if (!response.error) {
        toast.success("El mensaje fue enviado con éxito.");
      } else {
        toast.error("Error al enviar el mensaje.");
      }




    } catch (error) {
      toast.error("Error al intentar enviar el mensaje.");
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
    if (values.message.length < 3) {
      errores.message = "El mensaje debe contener más de 3 caracteres.";
    }

    return errores;
  };
  return (
    <Container>
      <Toaster />
      <Content>
        <ContainColumn>
          <Image
            src={
              "https://images.unsplash.com/photo-1509099836639-18ba1795216d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1031&q=80"
            }
          />
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
                <h1>Déjanos un mensaje</h1>
                <Input
                  name="name"
                  type="text"
                  placeholder="Nombre Completo"
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
                <TextArea
                  name="message"
                  placeholder="Mensaje"
                  value={values.message}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                <MessageError>{touched.message && errors.message}</MessageError>
                <Button
                  type="submit"
                  style={{
                    background: "#116530",
                  }}
                >
                  <b>Enviar</b>
                </Button>
              </Form>
            )}
          </Formik>
        </ContainColumn>
      </Content>
      <Footer />
    </Container>
  );
}

export default FormContacto;
