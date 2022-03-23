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
  border-radius: 50%;
  overflow: hidden;
  position: relative;
  .profile-editing-cover{
    position: absolute;
    z-index: 20;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    opacity: 0;
    color: white;
    font-weight: 900;
  }
  &:hover .profile-editing-cover{
    opacity: ${props => props.editing? '1':'0'};
  }
  .dzu-dropzone{
    display: block;
    width: 200px !important;
    height: 200px !important;
    border: 0 !important;
    overflow: hidden !important;
  }
  .dzu-previewContainer{
    min-height: auto !important;
    display: block;
    padding: 0;
    position: relative;
  }
  img {
    height: 100% !important;
    width: 100%;
    object-fit: cover !important;
    object-position: center center;
    min-width: 200px !important;
    min-height: 200px !important;
    position: absolute;
  }
  .dzu-previewStatusContainer{
    position: absolute;
    top: 10px;
    left: 50%;
    transform: translate(-50%, 0);
    z-index: 5;
    padding: 4px;
    box-sizing: border-box;
    background-color: rgba(255,255,255,0.6);
    border-radius: 50%;
  }
  .dzu-previewButton{
    margin: 0;
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
