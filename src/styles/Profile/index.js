import styled from "@emotion/styled";

export const ProfileContainer = styled.section`
    width: 100%;
    max-width: 800px;
    padding: 50px;
    box-sizing: border-box;
    background-color: grey;
`;

export const Field = styled.div`
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: stretch;
    align-items: center;
    margin-top: 10px;

    span{
        width: 20%;
        text-align: left;
    }

    input{
        width: 80%;
        text-align: left;
        padding: 10px;
        box-sizing: border-box;
        border-radius: 8px;
        border: 1px solid rgba(0,0,0,0.6);
    }
`;