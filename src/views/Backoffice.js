import React from "react";
import { Toaster } from "react-hot-toast";
import { Route, Routes } from "react-router-dom";
import { Container } from "../components/Wrappers/Containers";
import Root from "./BackOffice/Root";
import Categories from "./BackOffice/Categories";
import Contacts from "./BackOffice/Contacts";
import Users from "./BackOffice/Users/index";
import Organization from "./BackOffice/Organization";
import News from "./BackOffice/News";
import Activities from './BackOffice/Activities';

export default function Backoffice() {
  return (
    <Container>
      <Toaster />
      <Routes>
        <Route path="/" element={<Root />} />
        <Route path="/categories" element={<Categories />} />
        <Route path="/contacts" element={<Contacts />} />
        <Route path="/users" element={<Users />} />
        <Route path="/edit-organization" element={<Organization/>} />
        <Route path="/news" element={<News />} />
        <Route path="/activities" element={<Activities />} />
      </Routes>
    </Container>
  );
}
