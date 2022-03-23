import React, { useState, useEffect } from "react";
import Header from "../components/Header/Landing";
import {
  ProfileContent,
  Message,
  Image,
  ActionsBar,
  Form,
} from "../styles/Profile";
import Dropzone from "../components/Dropzone";

import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { getProfileData, logout } from "../actions/authActions";
import { saveProfileData, deleteProfile } from "../services/requests/profile";
import Loading from "../components/Loading";
import { Container } from "../components/Wrappers/Containers";
import { Input, Button } from "../components/Inputs";
import { Label } from "../styles/Login";
import { toast, Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

function Profile(props) {
  const [editing, setEditing] = useState(false);
  const [saving, setSaving] = useState(false);
  const [dataState, setDataState] = useState("loading");
  const [userId, setUserId] = useState(null);
  const [name, setName] = useState(null);
  const [lastname, setLastName] = useState(null);
  const [email, setEmail] = useState(null);
  
  const [profileImageToSend, setProfileImageToSend] = useState([]);
  const [profileImage, setProfileImage] = useState('/upload.png');
  const [profileImagePreview, setProfileImagePreview] = useState('/upload.png');

  const navigate = useNavigate();

  function switchMode() {
    editing ? setEditing(false) : setEditing(true);
  }

  useEffect(() => {
    getProfileData();
  }, []);

  const getProfileData = async () => {
    let data = await props.getProfileData();
    if (data.payload.success) {
      let { id, image, firstName, lastName, email } = data.payload.user;
      setUserId(id);
      setName(firstName);
      setLastName(lastName);
      setEmail(email);
      setDataState("loaded");
      setProfileImage(image);
    } else {
      setDataState("error");
    }
  };

  const save = async () => {
    setSaving(true);
    saveProfileData({
      id: userId,
      firstName: name,
      lastName: lastname,
      image: profileImage
    })
      .then((response) => {
        console.log(response);
        if (response.data.error) {
          toast.error("No se pudo guardar");
        }
        toast.success("Los datos se guardaron correctamente");
        switchMode();
      })
      .catch((err) => {
        toast.error("No se pudo guardar");
        console.log(err);
      });
    setSaving(false);
  };

  const deleteData = async () => {
    if (window.confirm("¿Está seguro de que quiere eliminar su cuenta?")) {
      deleteProfile()
        .then((response) => {
          console.log(response);
          if (!response.error) {
            toast.success("Cuenta eliminada con éxito");
            props.logout();
            navigate("/login");
          } else {
            toast.error("No se pudo eliminar la cuenta");
          }
        })
        .catch((err) => {
          toast.error("No se pudo eliminar la cuenta");
          console.log(err);
        });
    }
  };


  const onChangeStatus = ({ meta, file, remove }, status) => {
    if (status === "done") {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = async (event) => {
        setProfileImageToSend(event?.target?.result);
        setProfileImage(file);
        setProfileImagePreview(meta);
      };
    }
    if (status === "removed") {
      setProfileImageToSend(null);
      setProfileImage("/upload.png");
      setProfileImagePreview("/upload.png");
    }
  };

  const onSubmitFile = (files, allFiles) => {
    allFiles.forEach((f) => f.remove());
  };

  return (
    <Container>
      <Header />
      {dataState === "loading" && <Loading />}
      {dataState === "loaded" && (
        <ProfileContent>
          <Toaster />
          <Form onSubmit={(e) => e.preventDefault()}>
            <Image editing={editing}>
              <div className="profile-editing-cover">
                EDITAR
              </div>
              <Dropzone
                defaultImage={profileImage}
                onChangeStatus={onChangeStatus}
                onSubmit={onSubmitFile}
                disabled={!editing}
              />
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
              defaultValue={email}
              disabled={true}
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
              <Button
                style={{ background: "red", margin: "0.6rem 0" }}
                onClick={deleteData}
              >
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
      logout,
    },
    dispatch
  );
};

export default connect(null, mapDispatchToProps)(Profile);
