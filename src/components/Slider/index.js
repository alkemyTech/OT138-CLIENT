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
      <SwiperSlide><Slide link='/portada-1.png'>Build a great company...</Slide></SwiperSlide>
      <SwiperSlide><Slide link='/portada-2.jpg' orientation='left'>Explore the best option for your business.</Slide></SwiperSlide>
      <SwiperSlide><Slide link='/portada-3.jpg' orientation='right'>Hire only the service you need.</Slide></SwiperSlide>
      <SwiperSlide><Slide link='/portada-4.jpg'orientation='left'>Customers service on demand!</Slide></SwiperSlide>
    </Swiper>
  );
}
