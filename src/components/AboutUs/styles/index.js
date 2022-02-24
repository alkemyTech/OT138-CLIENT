import styled from "@emotion/styled";

export const AboutContainer = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  margin: 2rem 0;
  .about__title {
    text-align: center;
    font-size: 2rem;
    margin: 0 0 5px 0;
  }
  .about__subtitle {
    color: gray;
    margin: 0;
    font-size: 14.5px;
    height: 100%;
  }
`;

export const AboutContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;

  .about__details {
    text-align: center;
    font-size: 1rem;
    color: gray;
    height: 100%;
  }
  .about__img {
    max-width: 350px;
    border-radius: 5px;
  }
  .about__integration {
    text-align: center;
    max-width: 350px;
  }
`;
