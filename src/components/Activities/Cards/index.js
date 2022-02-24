import React from "react";
import { FaArrowRight, FaCalendar, FaClock } from "react-icons/fa";
import { ActivityCard, ActivityDetails } from "./styles";

export default function Activity() {
  return (
    <ActivityCard>
      <img
        className="thumbnail"
        src="https://images.pexels.com/photos/1134062/pexels-photo-1134062.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260"
      />
      <ActivityDetails>
        <h3 className="activity__title">Plantación de Árboles</h3>
        <p className="activity__details">
          Te invitamos a colaborar plantando un árbol.
          <br />
          <b>"Aquel que planta un árbol, planta una esperanza"</b>
        </p>
        <p className="activity__readmore">
          Leer más <FaArrowRight />
        </p>
      </ActivityDetails>
    </ActivityCard>
  );
}
