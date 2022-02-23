import React from "react";
import { Pagination } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import Slide from "./styles/index.js";
import "swiper/css";
import "swiper/css/pagination";
import "./styles/index.css";
import { SliderContent } from "../../styles/Slides/index.js";

export default function Slider() {
  return (
    <Swiper className="mySwiper">
      <SwiperSlide>
        <Slide>
          <SliderContent>
            <img src="/portada-1.jpg" alt="slide"></img>
          </SliderContent>
          <h1>Alkemy ONG</h1>
          <p>¡Cambiando Vidas!</p>
        </Slide>
      </SwiperSlide>
      <SwiperSlide>
        <Slide>
          <SliderContent>
            <img src="/portada-2.jpg" alt="slide"></img>
          </SliderContent>
          <h1>Alkemy ONG</h1>
          <p>¡Juntos todo es posible!</p>
        </Slide>
      </SwiperSlide>
    </Swiper>
  );
}
