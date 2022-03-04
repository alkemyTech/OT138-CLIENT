import styled from "@emotion/styled";

export const NewsContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  margin: 2rem 0;
  .activities__title {
    text-align: center;
    font-size: 2rem;
    margin: 0 0 5px 0;
  }
  .activities__subtitle {
    text-align: center;
    font-size: 1rem;
    margin: 0 0 2rem 0;
    color: gray;
  }
`;

export const NewsContent = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
`;
