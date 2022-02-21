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
        </div>
        <div>
          <p>Links</p>
        </div>
        <div>
          <p>Redes Sociales</p>
        </div>
      </FooterStyle>
    );
  } else {
    return <FooterStyle></FooterStyle>;
  }
}
