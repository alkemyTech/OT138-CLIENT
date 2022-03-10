import React from "react";
import Header from "../Header";

export default function index() {
  const navItems = [
    {
      route: "/backoffice",
      text: "Inicio",
    },
    {
      route: "/backoffice/actividades",
      text: "Actividades",
    },
    {
      route: "/backoffice/novedades",
      text: "Novedades",
    },
    {
      route: "/backoffice/testimonios",
      text: "Testimonios",
    },
    {
      route: "/backoffice/nosotros",
      text: "Nosotros",
    },
    {
      route: "/backoffice/usuarios",
      text: "Usuarios",
    },
    {
      route: "/backoffice/slider",
      text: "Slider",
    },
  ];
  return <Header navItems={navItems} />;
}
