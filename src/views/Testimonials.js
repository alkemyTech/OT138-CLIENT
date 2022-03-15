import React, { Fragment, useEffect, useState } from 'react';
import {getTestimony} from "../services/requests/form_testimonial";
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import Header from "../components/Header/Landing";
import Banner from "../components/Banner";
import Pagination from 'react-responsive-pagination';
import {Card,HeaderCard,Container,Content,PositionPagination} from "../styles/Testimonials";






function Testimonials(){

    const [data,SetData] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const totalPages = Math.ceil(data.length/3);
    const testimontPage = 3;

   
    //OPERACIONES
    const indexOfLast = currentPage * testimontPage;
    const indexOfFist = indexOfLast - testimontPage;


    useEffect(()=>{
    GetData();
    },[]);




    async function GetData(){
    const response = await getTestimony();
    SetData(response.data)
    }

    

    return(
    <Fragment>
    <Header/>
    <Banner
    title={"Lista de Testimonios"}
    thumbnail={"/testimonials.jpg"}
    />
    <Container>
    {data.length ? data.slice(indexOfFist,indexOfLast).map((item)=>{

    return(
    <Card key={item.id}>
    <HeaderCard>
    <img src={item.image} alt='imagen-perfil'/>
    <h2>{item.name}</h2>
    </HeaderCard>
    <Content>
    <CKEditor editor={ ClassicEditor }  data={item.content}/>
    </Content>       
    </Card>
    )})

    : <h1>No hay testimonios</h1>}
        
    </Container>
    <PositionPagination>
    <Pagination
      current={currentPage}
      total={totalPages}
      onPageChange={setCurrentPage}
    />
   </PositionPagination>
   </Fragment>
    );
}


export default Testimonials;