import styled from "styled-components";

export const Card = styled.div`
  width: 360px;
  height: 240px;
  border-radius: 5px;
  padding: 1.5rem;
  border-radius: 10px;
  background: #fff;
  box-shadow: 0 10px 15px -3px rgb(0 0 0 / 10%), 0 4px 6px -2px rgb(0 0 0 / 5%);
  cursor: pointer;
  h2 {
    font-size: 18px;
  }
  p {
    font-size: 16px;
  }
  transition: zoom 0.5s ease-out 0s;
  &:hover {
    transform: scale(1.018);
  }


  .child{
    font-size:20px;
    margin-top:15px;
  }
`;

export const HeaderCard = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  img {
    width: 60px;
    height: 60px;
    border-radius: 50%;
    object-fit: cover;
    margin: 0 1rem 0 0;
  }
`;

export const TestimonialsContainer = styled.section`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  gap: 50px;
  width: 100%;
  flex: 1;
  padding: 1.5rem 0;
`;

export const Content = styled.div`
  * {
    border: none !important;
    &:focus {
      outline: none !important;
      box-shadow: none !important;
    }
  }
  button {
    display: none !important;
  }
  .ck-reset,
  .ck-editor__main {
    border: none !important;
  }
  .ck-content:after {
    content: "" !important;
    position: fixed !important;
    background: red !important;
  }
`;

export const PositionPagination = styled.div`
  width: 100%;
  position: absolute;
`;
