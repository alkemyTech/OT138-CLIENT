import styled from "@emotion/styled";

export const SliderContent = styled.div`
  display: flex;
  flex-direction: column;
  img {
    top: 0;
    left: 0;
    position: absolute;
    object-fit: cover;
    width: 100%;
    height: 100%;
    filter: blur(6px);
    -webkit-filter: blur(6px);
    z-index: -1;
  }
`;
