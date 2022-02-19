import styled from "@emotion/styled";

export const SectionContainer = styled.section`
  display: flex;
  justify-content: space-between;
  flex-direction: ${({ direction }) =>
    direction === "right" ? "row" : "row-reverse"};
  flex-wrap: wrap;
  width: 100%;
  margin: 3rem 0;
`;

export const Box = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: center;
  font-family: "Poppins", sans-serif;
  width: 50%;
  min-width: 300px;
  h1 {
    font-weight: 400;
    font-size: 35px;
  }
  button {
    border: none;
    outline: none;
    font-size: 16px;
    border-radius: 5px;
    cursor: pointer;
    background-color: #3b2284;
    color: #fff;
    max-width: 150px;
    height: 3rem;
    margin: 1rem 0 0 0;
    width: 100%;
  }
  .btn__left {
    align-self: flex-end;
  }
  .btn__right {
    align-self: flex-start;
  }
  .left {
    align-self: flex-start;
  }
  .right {
    align-self: flex-end;
  }
  @media (max-width: 960px) {
    width: 100%;
    padding: 0 1rem;
    margin: 1rem 0;
    align-items: center;
    h1 {
      text-align: center;
    }
    .btn__left,
    .btn__right {
      align-self: center;
    }
    .right,
    .left {
      align-self: center;
    }
  }
`;
