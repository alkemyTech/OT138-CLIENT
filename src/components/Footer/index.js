import React, { useEffect, useState } from "react";
import { getPublicData } from "../../services/requests/publicData";
import { FooterStyle } from "./styles";

const webLinks = [
  { name: "Inicio", url: "/" },
  { name: "Actividades", url: "/actividades" },
  { name: "Novedades", url: "/novedades" },
  { name: "Nosotros", url: "/nosotros" },
  { name: "Testimonios", url: "/testimonios" },
  { name: "Contacto", url: "/contacto" },
  { name: "Iniciar Sesión", url: "/login" },
];
export function Footer() {
  const [publicData, setPublicData] = useState();
  useEffect(() => {
    getPublicData().then((res) => {
      if (!res.data.error && res.data.error !== undefined) {
        setPublicData(res.data.result);
      } else {
        console.log(res.data.error);
      }
    });
  }, []);

  if (publicData) {
    return (
      <FooterStyle>
        <div>
          <p>{publicData.name}</p>
          <img src={publicData.image} alt="Logo" className="logo"></img>
        </div>
        <div>
          <p>Links</p>
          <ul>
            {webLinks.map((link, index) => {
              return (
                <li key={index}>
                  <a href={link.url}>{link.name}</a>
                </li>
              );
            })}
          </ul>
        </div>
        <div>
          <p>Redes Sociales</p>
          <ul>
            {publicData.Links.map((link, index) => {
              return (
                <li key={link.id}>
                  <a href={link.url}>{link.name}</a>
                </li>
              );
            })}
          </ul>
        </div>
      </FooterStyle>
    );
  } else {
    return <FooterStyle></FooterStyle>;
  }
}
