import React from "react";
import { Pagination } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import Slide from './styles/index.js';
import 'swiper/css';
import 'swiper/css/pagination';
import './styles/index.css';


export default function Slider() {

  return (
    <Swiper pagination={{dynamicBullets: true}} modules={[Pagination]} className="mySwiper">
      <SwiperSlide><Slide link='https://wallpaperaccess.com/full/2384120.jpg'>Build a great company...</Slide></SwiperSlide>
      <SwiperSlide><Slide>Explore the best option for your business.</Slide></SwiperSlide>
      <SwiperSlide><Slide link='../../../public/portada-3.jpg'>Hire only the service you need.</Slide></SwiperSlide>
      <SwiperSlide><Slide>Customers service on demand!</Slide></SwiperSlide>
    </Swiper>
  );
}
