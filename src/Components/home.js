import React, {useState } from 'react';
import styled from 'styled-components';
import FondoPortada1 from "../Img/portada-1.png";
import FondoPortada2 from "../Img/portada-2.jpg";
import FondoPortada3 from "../Img/portada-3.jpg";
import FondoPortada4 from "../Img/portada-4.jpg";
import 'animate.css';

function Home(){

  const [position,SetPosition] = useState(0);
  const [selecion,SetSelecion] = useState([true,false,false,false]);
  const [classAnimation,SetClassAnimation] = useState("animate__animated animate__fadeInUp");

  const slider = [

    {id:1,
    titulo:"Somos la comunidad de la clase creativa",
    imagen:FondoPortada1
    },

    {id:2,
    titulo:"Nos apasiona trabajar en equipo",
    imagen:FondoPortada2
     },

     {id:3,
     titulo:"Brindarte la mejor experiencia de trabajo",
     imagen:FondoPortada3
     },

     {id:4,
     titulo:"Crear las mentes del futuro es nuestra pasion",
     imagen:FondoPortada4
     }

  ];
 

  function CambiarSlider(e){

   const item = e.target.getAttribute("data-item");

   if(item === "1"){

    SetClassAnimation("animate__animated animate__fadeOutDown")
    SetSelecion([true,false,false,false]);
    setTimeout(()=>{

    SetPosition(0);
    SetClassAnimation("animate__animated animate__fadeInDown")

    },1300)
   }else if(item === "2"){

    
    SetClassAnimation("animate__animated animate__fadeOutDown")
    SetSelecion([false,true,false,false]);
    setTimeout(()=>{

    SetPosition(1);
    SetClassAnimation("animate__animated animate__fadeInDown")

    },1300)

   }else if(item === "3"){

    
    SetClassAnimation("animate__animated animate__fadeOutDown")
    SetSelecion([false,false,true,false]);
    setTimeout(()=>{

    SetPosition(2);
    SetClassAnimation(" animate__animated animate__fadeInDown")

    },1300)

   }else if(item === "4"){

    
    SetClassAnimation(" animate__animated animate__fadeOutDown")
    SetSelecion([false,false,false,true]);
    setTimeout(()=>{

    SetPosition(3);
    SetClassAnimation(" animate__animated animate__fadeInDown")

    },1300)

   }
  
  

  }






  return (
  
  <Container>
      <Portada fondo={slider[position].imagen}>
        <h1 className={classAnimation}>{slider[position].titulo}</h1>
        <Boton className={classAnimation}>Aplicar ahora</Boton>

        
      <CajaItems className={classAnimation}>
        <Item data-item={1} onClick={CambiarSlider} color={Number(selecion[0])}/>
        <Item data-item={2} onClick={CambiarSlider} color={Number(selecion[1]) }/>
        <Item data-item={3} onClick={CambiarSlider} color={Number(selecion[2]) }/>
        <Item data-item={4} onClick={CambiarSlider} color={Number(selecion[3]) }/>
     </CajaItems>
      </Portada>


     
  </Container>
  );
}



const Container = styled.section`
width:100%;
height:100%;
overflow:hidden;

`;


const Portada = styled.div`

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


const Boton = styled.button`

  padding:20px 60px;
  margin:50px;
  background:#8A39E1;
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


const CajaItems = styled.div`
position:absolute;
bottom:50px;
@media (max-width:500px){
bottom:15px;
}
`;




export default Home;