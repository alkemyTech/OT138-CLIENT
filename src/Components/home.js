import React, {Fragment, useState } from 'react';
import styled from 'styled-components';
import BackgroundCover1 from "../Img/portada-1.png";
import BackgroundCover2 from "../Img/portada-2.jpg";
import BackgroundCover3 from "../Img/portada-3.jpg";
import BackgroundCover4 from "../Img/portada-4.jpg";
import ImagenSecion1 from "../Img/secion-1.png";
import ImagenSecion2 from "../Img/secion-2.png";
import 'animate.css';

function Home(){

  const [position,SetPosition] = useState(0);
  const [selection,SetSelection] = useState([true,false,false,false]);
  const [classAnimation,SetClassAnimation] = useState("animate__animated animate__fadeInUp");

  const slider = [

    {id:1,
    titulo:"We are the creative class community",
    imagen:BackgroundCover1
    },

    {id:2,
    titulo:"We are passionate about working as a team",
    imagen:BackgroundCover2
     },

     {id:3,
     titulo:"Give you the best work experience",
     imagen:BackgroundCover3
     },

     {id:4,
     titulo:"Creating the minds of the future is our passion",
     imagen:BackgroundCover4
     }

  ];
 

  function ChangeSlider(e){
   const item = e.target.getAttribute("data-item");
   if(item === "1"){

    SetClassAnimation("animate__animated animate__fadeOutDown")
    SetSelection([true,false,false,false]);
    setTimeout(()=>{
    SetPosition(0);
    SetClassAnimation("animate__animated animate__fadeInDown")
    },1300)
   }else if(item === "2"){

    SetClassAnimation("animate__animated animate__fadeOutDown")
    SetSelection([false,true,false,false]);
    setTimeout(()=>{
    SetPosition(1);
    SetClassAnimation("animate__animated animate__fadeInDown")
    },1300)

   }else if(item === "3"){

    SetClassAnimation("animate__animated animate__fadeOutDown")
    SetSelection([false,false,true,false]);
    setTimeout(()=>{
    SetPosition(2);
    SetClassAnimation(" animate__animated animate__fadeInDown")
    },1300)

   }else if(item === "4"){

    SetClassAnimation(" animate__animated animate__fadeOutDown")
    SetSelection([false,false,false,true]);
    setTimeout(()=>{
    SetPosition(3);
    SetClassAnimation(" animate__animated animate__fadeInDown")

    },1300)

   }}



  return (
  <Fragment>
  <Container>
  <CoverPage fondo={slider[position].imagen}>
  <h1 className={classAnimation}>{slider[position].titulo}</h1>
  <Buttom className={classAnimation}>Aplicar ahora</Buttom>
  <BoxItems className={classAnimation}>
  <Item data-item={1} onClick={ChangeSlider} color={Number(selection[0])}/>
  <Item data-item={2} onClick={ChangeSlider} color={Number(selection[1]) }/>
  <Item data-item={3} onClick={ChangeSlider} color={Number(selection[2]) }/>
  <Item data-item={4} onClick={ChangeSlider} color={Number(selection[3]) }/>
  </BoxItems>
  </CoverPage>
  </Container>

  <Section1>
    <Box1>
    <h1>Build an Interative Comapny Directory</h1>
    <p>Lorem Ipsum es simplemente el texto de relleno de las imprentas y archivos de texto. Lorem Ipsum ha sido el texto de relleno estándar de las industrias desde el año 1500, cuando un impresor (N. del T. persona que se dedica a la imprenta) desconocido usó una galería de textos y los mezcló de tal manera que logró hacer un libro de textos especimen. No sólo sobrevivió 500 años, sino que tambien ingresó como texto de relleno en documentos electrónicos, quedando esencialmente igual al original. Fue popularizado en los 60s con la creación de las hojas "Letraset", las cuales contenian pasajes de Lorem.</p>
    <button>Conocer</button>
    </Box1>
    <Box2>
    <img src={ImagenSecion1} alt="secion1"width="70%" />
    </Box2>
  </Section1>


  <Section2>
    <Box3>
    <img src={ImagenSecion2} alt="secion1"width="70%" />
    </Box3>
    <Box4>
    <h1>Build an Interative Comapny Directory</h1>
    <p>Lorem Ipsum es simplemente el texto de relleno de las imprentas y archivos de texto. Lorem Ipsum ha sido el texto de relleno estándar de las industrias desde el año 1500, cuando un impresor (N. del T. persona que se dedica a la imprenta) desconocido usó una galería de textos y los mezcló de tal manera que logró hacer un libro de textos especimen. No sólo sobrevivió 500 años, sino que tambien ingresó como texto de relleno en documentos electrónicos, quedando esencialmente igual al original. Fue popularizado en los 60s con la creación de las hojas "Letraset", las cuales contenian pasajes de Lorem.</p>
    <button>Conocer</button>
    </Box4>
  </Section2>
  </Fragment>
  );
}



const Container = styled.section`
width:100%;
height:100%;
overflow:hidden;

`;


const CoverPage = styled.div`

background-image:url(${props => props.fondo && props.fondo});
transition:1500ms ease all;
max-width:100%;
height:100vh;
background-size:cover;
display:flex;
justify-content:center;
text-align:center;
align-items:center;
flex-direction:column;
position:relative;
padding:30px;
font-family: 'Poppins', sans-serif;


@media (max-width:500px){
  padding:10px;
  h1{
  width:100%;
  font-size:40px;
  font-weight:400;
  color:#fff;
  }}



@media (min-width: 500px) and (max-width: 714px) { 
  padding:0px;
  h1{
  width:100%;
  font-size:70px;
  font-weight:400;
  color:#fff;
  }}



@media (min-width: 714px) and (max-width: 1500px) { 
 padding:20px;
 h1{
 width:100%;
 font-size:70px;
 font-weight:400;
 color:#fff;
 }}


@media (min-width: 1500px) and (max-width:3000px) { 
 h1{
 width:80%;
 font-size:90px;
 font-weight:400;
 color:#fff;
 }}
`;


const Buttom = styled.button`

  padding:20px 60px;
  margin:50px;
  background:#3b2284;
  font-family: 'Poppins', sans-serif;
  font-size:20px;
  border:none;
  border-radius:10px;
  color:#fff;
  cursor:pointer;
  transition:500ms ease;


  &:hover{
  background:#7900FF;
  }

  @media (max-width:1000px){
  padding:20px 40px;
  font-size:18px;
  margin:30px 0px;
  }

`;


const Item = styled.button`

  width:20px;
  height:20px;
  border-radius:100%;
  background-color:#fff;
  border:none;
  margin:0px 10px;
  cursor:pointer;
  opacity:${props => props.color ? "1;" : "0.5;"}
  transition:500ms ease;
`;


const BoxItems = styled.div`
position:absolute;
bottom:50px;
@media (max-width:500px){
bottom:15px;
}
`;


const Section1 = styled.section`
width:100%;
height:auto;
margin-top:100px;
display:grid;
grid-template-columns: 1fr;
grid-template-rows:auto;
grid-template-areas: "caja1 caja2";




@media (max-width:2500px){
  grid-template-columns: 1fr 1fr;
  grid-template-areas: "caja1 caja2";
}


@media (max-width:500px){
  grid-template-columns: 1fr;
  grid-template-areas: "caja1" "caja2";
  margin-top:50px;
}


@media (max-width:1359px){
  grid-template-columns: 1fr;
  grid-template-areas: "caja1" "caja2";
}
`;



const Box1 = styled.section`

font-family: 'Poppins', sans-serif;
padding:40px;
grid-area:caja1;

h1{
font-weight:400;
font-size:60px;
}

button{
  border:none;
  padding:15px 60px;
  font-size:17px;
  border-radius:5px;
  cursor:pointer;
  background-color:#3b2284;
  color:#fff;
  margin:10px 0px;
  

}

@media (max-width:2500px){
  padding-left:150px;
}

@media (max-width:1559px){
  padding-left:150px;

  h1{
    font-size:50px;
  }}

  @media (max-width:1359px){

    text-align:center;
    padding:10px;

  }

@media (max-width:500px){
  text-align:center;
  padding:10px;
 
  h1{
    font-size:30px;
    width:100%;
    margin:20px 0px;
  }}
`;


const Box2 = styled.section`

padding:20px;
display:flex;
grid-area:caja2;
justify-content:center;
align-items:center;

img{
  border-radius:10px;
}
`;

const Section2 = styled.section`
width:100%;
height:auto;
margin-top:100px;
display:grid;
grid-template-columns: 1fr;
grid-template-rows:auto;
grid-template-areas: "caja3 caja4";




@media (max-width:2500px){
  grid-template-columns: 1fr 1fr;
  grid-template-areas: "caja3 caja4";
}


@media (max-width:500px){
  grid-template-columns: 1fr;
  grid-template-areas: "caja4" "caja3";
  margin-top:50px;
}


@media (max-width:1359px){
  grid-template-columns: 1fr;
  grid-template-areas: "caja4" "caja3";
}
`;

const Box3 = styled.div`

grid-area:caja3;
padding:20px;
display:flex;
justify-content:center;
align-items:center;

img{
  border-radius:10px;
}

`;


const Box4 = styled.div`

grid-area:caja4;
padding:40px;

h1{
font-weight:400;
font-size:60px;
}

button{
  border:none;
  padding:15px 60px;
  font-size:17px;
  border-radius:5px;
  cursor:pointer;
  background-color:#3b2284;
  color:#fff;
  margin:10px 0px;
  

}

@media (max-width:2500px){
  padding-right:150px;
}



@media (max-width:1559px){
  padding-right:150px;
h1{
font-size:50px;
}}

@media (max-width:1359px){
text-align:center;
padding:10px;
}
  
@media (max-width:500px){
  text-align:center;
  padding:10px;
 
  h1{
    font-size:30px;
    width:100%;
    margin:20px 0px;
  }}

`;




export default Home;