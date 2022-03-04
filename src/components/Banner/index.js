import React from "react";
import { BannerContainer } from "./styles";

export default function Banner({ title, thumbnail }) {
  return (
    <BannerContainer>
      <img src={thumbnail} alt="portada" className="activity__thumbnail"></img>
      <h1 className="activity__title">{title}</h1>
    </BannerContainer>
  );
}
