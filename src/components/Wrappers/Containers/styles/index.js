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
`;
export const ContentStyle = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  max-width: 1440px;
  flex: 1;
  @media (max-width: 1366px) {
    max-width: 960px;
  }
`;
