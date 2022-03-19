import React from "react";
import { Container, Content } from "./Wrappers/Containers";
import Slider from "./Slider";
import Header from "../components/Header/Landing";
import { Footer } from "./Footer";
import Activities from "./Activities";
import AboutUs from "./AboutUs";
import News from "./News";
import FloatingDonateButton from "./FloatingDonateButton";
function Home() {
  return (
    <Container>
      <Header />
      <FloatingDonateButton />
      <Slider />
      <Content>
        <Activities />
        <News />
        {/* <AboutUs /> */}
        <Footer />
      </Content>
    </Container>
  );
}

export default Home;
