import React from "react";
import Header from "../Header";

export default function index() {
    const navItems = [
        {
            route: "/backoffice",
            text: "Inicio",
        },
        {
            route: "/backoffice/activities",
            text: "Actividades",
        },
        {
            route: "/backoffice/news",
            text: "Novedades",
        },
        {
            route: "/backoffice/testimonials",
            text: "Testimonios",
        },
        {
            route: "/backoffice/categories",
            text: "Categorías",
        },
        {
            route: "/backoffice/contacts",
            text: "Contactos",
        },
        {
            route: "/backoffice/users",
            text: "Usuarios",
        },
        {
            route: "/backoffice/slider",
            text: "Slider",
        },
    ];
    return <Header navItems={navItems} />;
}
