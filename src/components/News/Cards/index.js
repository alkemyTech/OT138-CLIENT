import React from "react";
import { FaArrowRight, FaCalendar, FaClock } from "react-icons/fa";
import { Link } from "react-router-dom";
import { NewCard, NewDetails } from "./styles";

export default function New({ id, name, image, content }) {
  const TITLE_MAX_LENGTH = 40;

  function formatName(name) {
    if (name.length > TITLE_MAX_LENGTH) {
      return name.slice(0, TITLE_MAX_LENGTH - 3) + "...";
    }
    return name;
  }

  return (
    <Link to={`/novedades/${id}`}>
      <NewCard>
        <img
          className="thumbnail"
          src={image}
          onError={({ currentTarget }) => {
            currentTarget.onerror = null;
            currentTarget.src = "/broken__image.gif";
          }}
          alt="new__thumbnail"
        />
        <NewDetails>
          <h3 className="new__title">{formatName(name)}</h3>
          <p className="new__details">{content}</p>
          <p className="new__readmore">
            Leer más <FaArrowRight />
          </p>
        </NewDetails>
      </NewCard>
    </Link>
  );
}
