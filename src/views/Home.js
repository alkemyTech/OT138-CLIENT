import React from "react";
import { Container, Content } from "../components/Wrappers/Containers";
import Slider from "../components/Slider";
import Header from "../components/Header/Landing";
import { Footer } from "../components/Footer";
import Activities from "../components/Activities";
import AboutUs from "../components/AboutUs";
import News from "../components/News";
function Home() {
  return (
    <Container>
      <Header />
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
