import styled from "@emotion/styled";

const Slide = styled.div`
  height: 100%;
  width: 100%;
  background-size: cover;
  background-url: url(${props => props.link ? props.link : ''});
  font-size: 24px;
  text-align: right;
  padding: 50px;
`;

export default Slide;