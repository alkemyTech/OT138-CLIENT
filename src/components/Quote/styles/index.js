import styled from "@emotion/styled";

export const BlockQuote = styled.div`
  text-align: center;

  p {
    font-size: 20px !important;
  }

  p:before {
    content: open-quote;
  }

  p:after {
    content: close-quote;
  }
`;