import styled from '@emotion/styled';


export const Form = styled.form`
background-color:#DADBBD;
width:500px;
padding:20px 20px 50px 20px;
border-radius:10px;
margin:auto;
@media (max-width:500px){
width:100%;
}
`;


export const Input = styled.input`
width:100%;
padding:15px;
border:none;
outline:none;
border-radius:5px;
font-size:18px;

`;


export const Label = styled.label`
font-size:18px;
margin:20px 0px 10px 0px;
display:block;
font-weight:bold;
`;


export const Button = styled.button`
width:100%;
padding:15px;
border:none;
border-radius:5px;
background-color:#2D31FA;
font-size:18px;
position:relative;
top:30px;
cursor:pointer;
color:#fff;
transition:500ms;
&:hover{
background-color:#051367;
}
`;


export const MessageError = styled.p`
color:#D82148;
font-size:16px;
`;