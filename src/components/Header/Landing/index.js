import React from "react";
import Header from "../Header";

export default function Landing() {
  const navItems = [
    {
      route: "/",
      text: "Inicio",
    },
    {
      route: "/actividades",
      text: "Actividades",
    },
    {
      route: "/novedades",
      text: "Novedades",
    },
    {
      route: "/nosotros",
      text: "Nosotros",
    },
    {
      route: "/testimonios",
      text: "Testimonios",
    },
    {
      route: "/contacto",
      text: "Contacto",
    },
  ];
  return <Header navItems={navItems} />;
}
