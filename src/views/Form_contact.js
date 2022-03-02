import React, { useEffect, useState } from "react";
import styled from "@emotion/styled";
import { Formik } from "formik";
import { createContact } from "../services/requests/contacts";
import Alert from "../components/Alert";

const Container = styled.section`
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  background-color: #eeeeee;
  padding: 20px;
`;

const ContainColumn = styled.div`
  display: flex;
  width: 60%;
  height: 450px;
  margin-top: 100px;

  @media (max-width: 1298px) {
    flex-direction: column;
    margin-top: 0px;
  }

  @media (max-width: 800px) {
    width: 100%;
  }
`;

const Colum = styled.div`
  padding: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  background-image: url("https://images.unsplash.com/photo-1509099836639-18ba1795216d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1031&q=80");
  background-size: cover;
  border-radius: 10px 0px 0px 10px;
  width: 50%;
  h1 {
    color: #fff;
    font-size: 50px;
  }

  @media (max-width: 1298px) {
    width: 100%;
    border-radius: 10px 10px 0px 0px;
  }
`;

const Form = styled.form`
  padding: 30px;
  width: 50%;
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

const Textarea = styled.input`
  border: none;
  display: block;
  padding: 40px;
  margin-top: 20px;
  width: 100%;
  outline: none;
  background-color: #e6e6e7;
  border-radius: 5px;
  font-size: 18px;
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

const MessageError = styled.span`
  color: #da1212;
  font-size: 12px;
  margin-left: 5px;
  font-family: "Open Sans", sans-serif;
  font-weight: bold;
  display: block;
`;

function FormContacto() {
  const [alert, setAlert] = useState({});
  const submitForm = async (values, { resetForm }) => {
    resetForm();
    console.log(values);
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
  return (
    <Container>
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
          validate={(values) => {
            let errores = {};

            //VALIDATION NAME
            if (!values.name || values.name.length < 4) {
              errores.name = "Please enter a name";
            } else if (!/^[a-zA-ZÀ-ÿ\s]{1,40}$/.test(values.name)) {
              errores.name = "The name can only contain letters and spaces";
            }

            //VALIDATION EMAIL
            if (
              !/^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/.test(
                values.email
              )
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
          }}>
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
  );
}

export default FormContacto;
