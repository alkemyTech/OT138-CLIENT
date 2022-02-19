import styled from "@emotion/styled";
export const CoverPage = styled.div`
  background-image: url(${(props) => props.fondo && props.fondo});
  transition: 1500ms ease all;
  max-width: 100%;
  width: 100%;
  height: 70vh;
  background-size: cover;
  display: flex;
  justify-content: center;
  text-align: center;
  align-items: center;
  flex-direction: column;
  position: relative;
  padding: 30px;
  font-family: "Poppins", sans-serif;

  @media (max-width: 500px) {
    padding: 10px;
    h1 {
      width: 100%;
      font-size: 35px;
      font-weight: 400;
      color: #fff;
    }
  }

  @media (min-width: 500px) and (max-width: 714px) {
    padding: 0px;
    h1 {
      width: 100%;
      font-size: 70px;
      font-weight: 400;
      color: #fff;
    }
  }

  @media (min-width: 714px) and (max-width: 1500px) {
    padding: 20px;
    h1 {
      width: 100%;
      font-size: 70px;
      font-weight: 400;
      color: #fff;
    }
  }

  @media (min-width: 1500px) and (max-width: 3000px) {
    h1 {
      width: 80%;
      font-size: 90px;
      font-weight: 400;
      color: #fff;
    }
  }
`;

export const Buttom = styled.button`
  padding: 20px 60px;
  margin: 50px;
  background: #3b2284;
  font-family: "Poppins", sans-serif;
  font-size: 20px;
  border: none;
  border-radius: 10px;
  color: #fff;
  cursor: pointer;
  transition: 500ms ease;

  &:hover {
    background: #7900ff;
  }

  @media (max-width: 1000px) {
    padding: 20px 40px;
    font-size: 18px;
    margin: 30px 0px;
  }
`;

export const Item = styled.button`
  width: 20px;
  height: 20px;
  border-radius: 100%;
  background-color: #fff;
  border: none;
  margin: 0px 10px;
  cursor: pointer;
  opacity: ${(props) => (props.color ? "1;" : "0.5;")};
  transition: 500ms ease;
`;

export const BoxItems = styled.div`
  position: absolute;
  bottom: 50px;
  @media (max-width: 500px) {
    bottom: 15px;
  }
`;

export const Section1 = styled.section`
  width: 100%;
  height: auto;
  margin-top: 100px;
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: auto;
  grid-template-areas: "caja1 caja2";

  @media (max-width: 2500px) {
    grid-template-columns: 1fr 1fr;
    grid-template-areas: "caja1 caja2";
  }

  @media (max-width: 500px) {
    grid-template-columns: 1fr;
    grid-template-areas: "caja1" "caja2";
    margin-top: 50px;
  }

  @media (max-width: 1359px) {
    grid-template-columns: 1fr;
    grid-template-areas: "caja1" "caja2";
  }
`;

export const Box1 = styled.section`
  font-family: "Poppins", sans-serif;
  padding: 40px;
  grid-area: caja1;

  h1 {
    font-weight: 400;
    font-size: 60px;
  }

  button {
    border: none;
    padding: 15px 60px;
    font-size: 17px;
    border-radius: 5px;
    cursor: pointer;
    background-color: #3b2284;
    color: #fff;
    margin: 10px 0px;
  }

  @media (max-width: 2500px) {
    padding-left: 150px;
  }

  @media (max-width: 1559px) {
    padding-left: 150px;

    h1 {
      font-size: 50px;
    }
  }

  @media (max-width: 1359px) {
    text-align: center;
    padding: 10px;
  }

  @media (max-width: 500px) {
    text-align: center;
    padding: 10px;

    h1 {
      font-size: 30px;
      width: 100%;
      margin: 20px 0px;
    }
  }
`;

export const Box2 = styled.section`
  padding: 20px;
  display: flex;
  grid-area: caja2;
  justify-content: center;
  align-items: center;

  img {
    border-radius: 10px;
  }
`;

export const Section2 = styled.section`
  width: 100%;
  height: auto;
  margin-top: 100px;
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: auto;
  grid-template-areas: "caja3 caja4";

  @media (max-width: 2500px) {
    grid-template-columns: 1fr 1fr;
    grid-template-areas: "caja3 caja4";
  }

  @media (max-width: 500px) {
    grid-template-columns: 1fr;
    grid-template-areas: "caja4" "caja3";
    margin-top: 50px;
  }

  @media (max-width: 1359px) {
    grid-template-columns: 1fr;
    grid-template-areas: "caja4" "caja3";
  }
`;

export const Box3 = styled.div`
  grid-area: caja3;
  padding: 20px;
  display: flex;
  justify-content: center;
  align-items: center;

  img {
    border-radius: 10px;
  }
`;

export const Box4 = styled.div`
  grid-area: caja4;
  padding: 40px;

  h1 {
    font-weight: 400;
    font-size: 60px;
  }

  button {
    border: none;
    padding: 15px 60px;
    font-size: 17px;
    border-radius: 5px;
    cursor: pointer;
    background-color: #3b2284;
    color: #fff;
    margin: 10px 0px;
  }

  @media (max-width: 2500px) {
    padding-right: 150px;
  }

  @media (max-width: 1559px) {
    padding-right: 150px;
    h1 {
      font-size: 50px;
    }
  }

  @media (max-width: 1359px) {
    text-align: center;
    padding: 10px;
  }

  @media (max-width: 500px) {
    text-align: center;
    padding: 10px;

    h1 {
      font-size: 30px;
      width: 100%;
      margin: 20px 0px;
    }
  }
`;
