import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import Slide from "./styles/index.js";
import "swiper/css";
import "swiper/css/pagination";
import "./styles/index.css";
import { SliderContent } from "../../styles/Slides/index.js";
import { getSlides as getSlidesService } from '../../services/requests/slides';

export default function Slider() {
  const [slides, setSlides] = useState([]);

  useState(() => {
    getSlides();
  }, []);

  async function getSlides() {
    const { success, data } = await getSlidesService();

    if (success) {
      //setSlides(data);
    }
  }

  return (
    <Swiper className="mySwiper">
      {
        slides.map((item, index) => {
          return (
            <SwiperSlide key={index}>
              <Slide>
                <SliderContent>
                  <img src={item.imageURL} alt={`Slide number ${index}`}></img>
                </SliderContent>
                <h1>{item.text}</h1>
              </Slide>
            </SwiperSlide>
          );
        })
      }
    </Swiper>
  );
}
