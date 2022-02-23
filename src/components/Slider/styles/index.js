import styled from "@emotion/styled";

const Slide = styled.div`
  height: 100%;
  width: 100%;
  background: url(${props => props.link ? props.link : ''});
  background-size: cover;
  font-size: 24px;
  text-align: ${props => props.orientation ? props.orientation : 'center'};
  color: #FFF;
  font-family: 'Poppins', sans-serif;
  padding: 50px;
`;

export default Slide;