import styled from "@emotion/styled";

export const FloatingButton = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 45px;
  width: 45px;
  border-radius: 50%;
  background: #0f9d58;
  color: #fff;
  position: fixed;
  bottom: 20px;
  right: 20px;
  cursor: pointer;
  font-weight: bold;
  font-size: 1.2rem;
  z-index: 9999;
`;
