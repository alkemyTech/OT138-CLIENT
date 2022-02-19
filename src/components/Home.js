import React from "react";
import { Container, Content } from "./Wrappers/Containers";
import Slider from "./Slider";
import LandingSection from "./LandingSection";
function Home() {
  return (
    <Container>
      <Slider />
      <Content>
        <LandingSection
          title="Build an Interative Comapny Directory"
          description={
            "Lorem Ipsum es simplemente el texto de relleno de las imprentas y archivos de texto. Lorem Ipsum ha sido el texto de relleno estándar de las industrias desde el año 1500, cuando un impresor (N. del T. persona que se dedica a la imprenta) desconocido usó una galería de textos y los mezcló de tal manera que logró hacer un libro de textos especimen. No sólo sobrevivió 500 años, sino que tambien ingresó como texto de relleno en documentos electrónicos, quedando esencialmentesdfssfdsdfsdf."
          }
          btnText="Click"
          src="/secion-1.png"
          direction="right"
        />
        <LandingSection
          title="Build an Interative Comapny Directory 2"
          description={
            "2 Lorem Ipsum es simplemente el texto de relleno de las imprentas y archivos de texto. Lorem Ipsum ha sido el texto de relleno estándar de las industrias desde el año 1500, cuando un impresor (N. del T. persona que se dedica a la imprenta) desconocido usó una galería de textos y los mezcló de tal manera que logró hacer un libro de textos especimen. No sólo sobrevivió 500 años, sino que tambien ingresó como texto de relleno en documentos electrónicos, quedando esencialmentesdfssfdsdfsdf."
          }
          btnText="Click"
          src="/secion-2.png"
          direction="left"
        />
      </Content>
    </Container>
  );
}

export default Home;
