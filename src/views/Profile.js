import React, { useState, useEffect } from "react";
import Header from "../components/Header/Landing";
import {
  ProfileContent,
  Message,
  Image,
  ActionsBar,
  Form,
} from "../styles/Profile";

import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { getProfileData } from "../actions/authActions";
import Loading from "../components/Loading";
import { Container } from "../components/Wrappers/Containers";
import { Input, Button } from "../components/Inputs";
import { Label } from "../styles/Login";

function Profile(props) {
  const [editing, setEditing] = useState(false);
  const [saving, setSaving] = useState(false);
  const [dataState, setDataState] = useState("loading");
  const [name, setName] = useState(null);
  const [lastname, setLastName] = useState(null);
  const [email, setEmail] = useState(null);

  const [profileData, setProfileData] = useState({
    image: "",
    firstName: "",
    lastName: "",
    email: "",
  });

  function switchMode() {
    editing ? setEditing(false) : setEditing(true);
  }

  useEffect(() => {
    getProfileData();
  }, []);

  const getProfileData = async () => {
    let data = await props.getProfileData();
    if (data.payload.success) {
      let { image, firstName, lastName, email } = data.payload.user;
      setName(firstName);
      setLastName(lastName);
      setEmail(email);
      setProfileData({
        image: image,
        firstName: firstName,
        lastName: lastName,
        email: email,
      });
      setDataState("loaded");
    } else {
      setDataState("error");
    }
  };

  async function save() {
    setSaving(true);
    // saving login
    setTimeout(() => {
      // this emulate the saving lapse - delete after implement the actual saving
      setSaving(false);
      switchMode();
    }, 2000);
  }

  return (
    <Container>
      <Header />
      {dataState === "loading" && <Loading />}
      {dataState === "loaded" && (
        <ProfileContent>
          <Form onSubmit={(e) => e.preventDefault()}>
            <Image>
              <img src={profileData?.image ? profileData?.image : ""} />
            </Image>
            <h2>Mis Datos Personales</h2>
            <Label>Nombres</Label>
            <Input
              type="text"
              name="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              disabled={!editing}
            ></Input>
            <Label>Apellidos</Label>
            <Input
              type="text"
              name="lastname"
              value={lastname}
              onChange={(e) => setLastName(e.target.value)}
              disabled={!editing}
            ></Input>
            <Label>Email</Label>
            <Input
              type="text"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={!editing}
            ></Input>
            <ActionsBar>
              {editing ? (
                <Button
                  style={{ background: "green", margin: "0.6rem 0" }}
                  onClick={save}
                >
                  <b>{saving ? "• • •" : "Guardar"}</b>
                </Button>
              ) : (
                <Button
                  style={{ background: "#584afa", margin: "0.6rem 0" }}
                  onClick={switchMode}
                >
                  <b>Modificar</b>
                </Button>
              )}
              <Button style={{ background: "red", margin: "0.6rem 0" }}>
                <b>Eliminar Cuenta</b>
              </Button>
            </ActionsBar>
          </Form>
        </ProfileContent>
      )}
      {dataState === "error" && (
        <ProfileContent>
          <Message>¡Error al Cargar los Datos!</Message>
          <Button style={{ background: "green" }} onClick={getProfileData}>
            <b>REINTENTAR</b>
          </Button>
        </ProfileContent>
      )}
    </Container>
  );
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(
    {
      getProfileData,
    },
    dispatch
  );
};

export default connect(null, mapDispatchToProps)(Profile);
