import styled from "@emotion/styled";



export const Container = styled.div`

width:80%;
margin:auto;
display:flex;
justify-content:center;
align-items:center;
flex-wrap:wrap;
@media (max-width:1200px){
width:100%;
}
`;


export const Section1 = styled.div`

background-color:orange;
width:80%;
display:flex;
`;


export const Box1 = styled.div`

display:flex;
flex-direction:column;
justify-content:center;
padding:20px;

`;



export const Card = styled.div`

width:320px;
height:420px;
margin:50px 20px;
-webkit-box-shadow: 0px 1px 7px -1px #3B3B3B; 
box-shadow: 0px 1px 7px -1px #3B3B3B;
border-radius:10px;
overflow:hidden;
cursor:pointer;
position:relative;
transition:500ms ease;
`;


export const CardHead = styled.div`

width:100%;
height:70%;
background-image:url(${props => props.fondo && props.fondo});
background-size:cover;
display:block;
border-radius: 10px 10px 0px 0px;


`;

export const CardBody = styled.div`
background-color:#fff;
padding:10px;
width:100%;
height:30%;
display:block;
border-radius: 0px 0px 10px 10px;
transition:800ms ease;
`;


export const ButtonView = styled.button`

background-color:#151D3B;
color:#fff;
position:absolute;
bottom:10px;
right:10px;
border:none;
padding: 5px 10px;
border-radius:5px;
font-size:15px;
transition: 500ms ease;
a{
color:#fff;   
}
&:hover{
background-color:#051367;

}}
`;