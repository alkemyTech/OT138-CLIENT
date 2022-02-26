import React from "react";
import { Container, Content } from "./Wrappers/Containers";
import Slider from "./Slider";
import Header from "../components/Header/Landing";
import { Footer } from "./Footer";
import Activities from "./Activities";
import AboutUs from "./AboutUs";
function Home() {
  return (
    <Container>
      <Header />
      <Slider />
      <Content>
        <AboutUs />
        <Activities />
      </Content>
      <Footer />
    </Container>
  );
}

export default Home;
