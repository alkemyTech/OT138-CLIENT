import React from "react";
import Header from "../components/Header/BackOffice";
import Loading from "../components/Loading";
import { Container } from "../components/Wrappers/Containers";

export default function Backoffice() {
  return (
    <Container>
      <Header />
      <h1 style={{ textAlign: "center", margin: "5px 0" }}>
        Bienvenido/a al BackOffice de Alkemy ONG
      </h1>
      <p style={{ textAlign: "center", margin: "5px 0" }}>
        ¡Sección en Construcción!
      </p>
      <Loading />
    </Container>
  );
}
