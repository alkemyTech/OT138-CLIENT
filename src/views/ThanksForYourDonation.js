import React from "react";
import { Container, Content } from "../components/Wrappers/Containers";
import { ThanksImage, ThanksContainer } from "../styles/Thanks";
export default function ThanksForYourDonation() {
  return (
    <Container>
      <Content>
        <ThanksContainer>
          <h1>¡Gracias por Colaborar con Somos Más!</h1>
          <ThanksImage src="/thanksyou.gif" />
        </ThanksContainer>
      </Content>
    </Container>
  );
}
