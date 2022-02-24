import React from "react";
import { AboutContainer, AboutContent } from "./styles";
import CountUp from "react-countup";
export default function AboutUs() {
  return (
    <AboutContainer>
      <h2 className="about__title">Acerca de Nosotros</h2>
      <p className="about__subtitle">Nuestra Misión</p>
      <AboutContent>
        {/* <img
          className="thumbnail"
          src="https://media-exp1.licdn.com/dms/image/C4E1BAQEDDjuh9HQchg/company-background_10000/0/1610631110628?e=2159024400&v=beta&t=00JMFny1Y6JiSd8rpPDIfJ_6vNH6NhtCK_yban1zy3c"
        /> */}
        <p className="about__details">
          Defender los derechos de los grupos y personas más desfavorecidos.
        </p>
        <img className="about__img" src="about-3.svg" />

        <p className="about__integration">
          Nos integran 8132 organizaciones no gubernamentales que realizan más
          de{" "}
          <b>
            <CountUp
              start={100000}
              end={500000}
              duration={3}
              decimals={0}
              separator="."
            />
          </b>{" "}
          atenciones mensuales.
        </p>
        {/* <p className="about__details">
          Alkemy ONG es una iniciativa de alkemy.org en colaboración con los
          estudiantes de la misma.
          <br />
          Fue lanzada el 14 de febrero de 2022 en el marco de la celebración del
          Día del Amor y la Amistad o Día de los Enamorados, mediante la
          conferencia de Presentación de Alkemy.
        </p> */}
      </AboutContent>
    </AboutContainer>
  );
}
