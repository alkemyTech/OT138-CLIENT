import React, { Fragment, useEffect, useState } from 'react';
import {getTestimony} from "../../services/requests/form_testimonial";
import {Container,Table,Button,ContainerModal} from "../../styles/FormTestimonial";
import FormTestimonial from "./FormTestimonial";
import { FaEdit, FaTrash } from 'react-icons/fa';
import {deleteTestimony} from "../../services/requests/form_testimonial";
import {toast,Toaster} from 'react-hot-toast';





function Table_Testimonial(){


    const [data,SetData] = useState([]);
    const [animation,SetAnimation] = useState({opacity:"0",index:"-1"});
    const [Id,SetId] = useState(undefined);
   


    async function GetTestimony(){
    const {data:response} = await getTestimony();
    SetData(response) 
    }
    
    
    useEffect(()=>{
    GetTestimony();
    },[]);



    //UPDATE TESTIMONY
    async function UpdateTestimony(id){
    SetAnimation({opacity:"1",index:"2"});
    SetId(id);
    }


    async function DeleteTestimony(id){

    const {successMessage,success,errorMessage} = await deleteTestimony(id);
    if(success){
    toast.success(successMessage);
    setTimeout(()=>{
    window.location.reload();
    },1200)
    }else{
    toast.error(errorMessage);
    }}

    
    return(

    data.length ?

    <Fragment>
    <Toaster/>
    <ContainerModal opacity={animation.opacity} index={animation.index}>
    <FormTestimonial id={Id} SetAnimation={SetAnimation}/>
    </ContainerModal>
    <Container>
    <h1>Testimonios</h1>
    <Table>
    <thead>
    <tr>
    <th>NOMBRE</th>
    <th>ACTUALIZAR</th>
    </tr>
    </thead>
    <tbody>
    {data.map((item)=>{
    return(
    <tr key={item.id}>
    <td>{item.name}</td> 
    <td>
    <Button  style={editButtonStyle} onClick={()=>{UpdateTestimony(item.id)}}><FaEdit/></Button>
    <Button  style={deleteButtonStyle} onClick={()=>{DeleteTestimony(item.id)}}><FaTrash/></Button>
    </td>       
    </tr>
    )
    })}         
   
    </tbody>
    </Table>
    </Container>
    </Fragment>
    :<FormTestimonial/>
    );

}


    const editButtonStyle = {
    width: '40px',
    height: '40px',
    background: 'orange'
    }

    const deleteButtonStyle = {
    width: '40px',
    height: '40px',
    background: 'red'
    }

export default Table_Testimonial;