import React from "react";
import { Toaster } from 'react-hot-toast';
import Header from "../components/Header/BackOffice";
import { Route, Routes } from "react-router-dom";
import { Container } from "../components/Wrappers/Containers";
import Root from './BackOffice/Root';
import Categories from './BackOffice/Categories';

export default function Backoffice() {
    return (
        <Container>
            <Header />
            <Toaster/>
            <Routes>
                <Route path="/" element={<Root />} />
                <Route path="/categories" element={<Categories />} />
            </Routes>
        </Container>
    );
}
