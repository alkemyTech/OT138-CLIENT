import React from "react";
import { Container, Content } from "../components/Wrappers/Containers";
import Slider from "../components/Slider";
import { Footer } from "../components/Footer";
import Activities from "../components/Activities";
import News from "../components/News";
import FloatingDonateButton from "../components/FloatingDonateButton";
function Home() {
  return (
    <Container>
      <FloatingDonateButton />
      <Slider />
      <Content>
        <News />
        <Activities />
      </Content>
      <Footer />
    </Container>
  );
}

export default Home;
