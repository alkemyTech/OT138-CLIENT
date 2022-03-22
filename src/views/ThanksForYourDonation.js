import React from "react";
import Header from "../components/Header/Landing";
import { Container, Content } from "../components/Wrappers/Containers";
import { ThanksImage, ThanksContainer } from "../styles/Thanks";
export default function ThanksForYourDonation() {
  return (
    <Container>
      <Header />
      <Content>
        <ThanksContainer>
          <h1>¡Gracias por Colaborar con Somos Más!</h1>
          <ThanksImage src="/thanksyou.gif" />
        </ThanksContainer>
      </Content>
    </Container>
  );
}
