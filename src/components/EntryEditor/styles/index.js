import styled from "@emotion/styled";

export const EditorContent = styled.form`
  width: 100%;
  padding: 10px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  align-items: stretch;
`;

export const EntryType = styled.div`
  display: inline-block;
  padding: 2px;
  box-sizing: border-box;
  border-top: 1px solid black;
  margin-bottom: 20px;
`;

export const Message = styled.div`
  align-self: center;
  font-weight: 800;
  text-align: center;
  color: ${(props) => (props.alert ? "red" : "black")};
  button {
    margin: 10px 0px;
  }
`;
