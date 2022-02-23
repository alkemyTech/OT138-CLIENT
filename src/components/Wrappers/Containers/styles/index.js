import styled from "@emotion/styled";

export const ContainerStyle = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  min-width: 100%;
  height: 100%;
  min-height: 100vh;
  width: 100%;
  background: var(--background-color);
  .form__container {
    display: flex;
    flex-direction: column;
  }
  @media (max-width: 960px) {
    padding: 0 0 4rem 0;
  }
`;
export const ContentStyle = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  flex: 1;
  width: 100%;
  max-width: 1440px;
  @media (max-width: 1366px) {
    max-width: 960px;
  }
`;
