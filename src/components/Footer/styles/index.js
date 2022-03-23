import styled from "@emotion/styled";

export const FooterStyle = styled.footer`
  display: flex;
  width: 100%;
  justify-content: space-between;
  border-top: solid lightgray 1px;
  p {
    font-weight: bold;
  }
  div {
    padding: 0.5rem;
    width: 100%;
    text-align: center;
  }
  ul {
    list-style-type: none;
    padding: 0;
  }

  .logo {
    width: 8rem;
  }
  @media (max-width: 600px) {
    flex-direction: column;
  }
`;
