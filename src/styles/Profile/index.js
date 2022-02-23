import styled from "@emotion/styled";

export const ProfileContainer = styled.section`
    width: 100%;
`;

export const ProfileContent = styled.div`
    width: 100%;
    padding: 50px;
    box-sizing: border-box;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
`;

export const Message = styled.div`
    width: 100%;
    text-align: center;
    font-size: 2rem;
`

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
        border: none;
        background-color: #edf2f7;
    }
    input:disabled{
        background-color: rgba(0,0,0,0.01);
    }
`;

export const Button = styled.button`
    width: 200px;
    padding: 10px;
    margin-top: 10px;
    border-radius: 10px;
    box-sizing: border-box;
    background-color: #3b2284;
    color: white;
    border: none;
`;

export const Image = styled.div`
    width: 200px;
    height: 200px;
    border: 3px solid #3b2284;
    margin: 20px;
    border-radius: 100px;
    overflow: hidden;
    img{
        width: 100%;
        height: 100%;
        display: block;
    }
`;

export const TextFields = styled.div`
    flex: 50%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;