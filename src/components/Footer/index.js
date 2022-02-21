import React, { useEffect, useState } from "react";
import { FooterStyle } from "./styles";
import api from "../../config/api";
export function Footer() {
  const [publicData, setPublicData] = useState();
  useEffect(() => {
    api.get("/api/organizations/1/public").then((res) => {
      setPublicData(res.data);
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
            {publicData.webLinks.map((link, index) => {
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
            {publicData.socialMediaLinks.map((link, index) => {
              return (
                <li key={index}>
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
