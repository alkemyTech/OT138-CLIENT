import React, { useEffect, useState } from "react";
import { getPublicData } from "../../services/requests/publicData";
import { FooterStyle } from "./styles";
export function Footer() {
  const [publicData, setPublicData] = useState();
  useEffect(() => {
    getPublicData().then((res) => {
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
