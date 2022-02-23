import styled from "@emotion/styled";

export const ProfileContent = styled.div`
  width: 100%;
  padding: 50px;
  box-sizing: border-box;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  max-width: 1440px;
`;

export const Message = styled.h2`
  width: 100%;
  text-align: center;
  font-size: 1.5rem;
`;

export const Field = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: stretch;
  align-items: center;
  margin-top: 10px;

  span {
    width: 20%;
    text-align: left;
  }

  input {
    width: 80%;
    text-align: left;
    padding: 10px;
    box-sizing: border-box;
    border-radius: 8px;
    border: none;
    background-color: #edf2f7;
  }
  input:disabled {
    background-color: rgba(0, 0, 0, 0.01);
  }
`;

export const Image = styled.div`
  width: 200px;
  height: 200px;
  margin: 0 0 10px 0;
  align-self: center;
  img {
    border-radius: 50%;
    height: 100%;
    width: 100%;
  }
`;

export const TextFields = styled.div`
  flex: 50%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  flex: 1;
  max-width: 300px;
  width: 100%;
  h2 {
    text-align: center;
  }
`;

export const ActionsBar = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
`;
