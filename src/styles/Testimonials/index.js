import styled from 'styled-components';

export const Card = styled.div`
width:360px;
height:240px;
border-radius:5px;
-webkit-box-shadow: 0px 2px 10px 1px #4A4A4A; 
box-shadow: 0px 2px 10px 1px #4A4A4A;
padding:20px;
font-family: "Open Sans", sans-serif;
position:relative;
p{
font-size:18px;
}


.ck-blurred{
padding:0px !important;
height:auto !important;
}


&:after{
content:"";
background-color:white;
width:340px;
height:100px;
position:absolute;
bottom:10px;
z-index:5;
display:block;
opacity:0;
}

@media(max-width:500px){
width:90%; 
}

`;


export const HeaderCard = styled.div`
width:100%;
display:flex;
align-items:center;
img{
width:60px;
height:60px;
border-radius:100%;
object-fit:cover;
margin-right:20px;
}


`;


export const Container = styled.section`
width:100%;
height:560px;
display:flex;
justify-content:center;
align-items:center;
flex-wrap:wrap;
gap:50px;
@media (max-width:1000px){
width:100%;
margin-top:50px;
}
@media (max-width:772px){
height:auto;
}
`;


export const Content =  styled.div`

*{
border:none !important; 
&:focus{
outline:none !important;
box-shadow:none !important;
}
}
button{
display:none !important;
}
.ck-reset,.ck-editor__main{
border:none !important;
}
.ck-content:after{
content:"" !important;
position:fixed !important;
background:red !important;
}

`;


export const PositionPagination = styled.div`
width:100%;
position:absolute;
`;
