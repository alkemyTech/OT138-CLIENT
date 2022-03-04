import React from "react";
import { FaArrowRight, FaCalendar, FaClock } from "react-icons/fa";
import { Link } from "react-router-dom";
import { NewCard, NewDetails } from "./styles";

export default function New({ id, name, image, content }) {
  return (
    <Link to={`/novedades/${id}`}>
      <NewCard>
        <img className="thumbnail" src={image} />
        <NewDetails>
          <h3 className="new__title">{name}</h3>
          <p className="new__details">{content}</p>
          <p className="new__readmore">
            Leer más <FaArrowRight />
          </p>
        </NewDetails>
      </NewCard>
    </Link>
  );
}
