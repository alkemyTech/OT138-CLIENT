import React from "react";
import { SectionContainer, Box } from "./styles";
export default function LandingSection({
  title,
  description,
  btnText,
  src,
  direction,
}) {
  return (
    <SectionContainer direction={direction}>
      <Box>
        <h1>{title}</h1>
        <p>{description}</p>
        <button className={`btn__${direction}`}>{btnText}</button>
      </Box>
      <Box>
        <img src={src} className={direction} alt="illustration" width="70%" />
      </Box>
    </SectionContainer>
  );
}
