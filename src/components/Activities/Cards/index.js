import React from "react";
import { FaArrowRight, FaCalendar, FaClock } from "react-icons/fa";
import { Link } from "react-router-dom";
import { ActivityCard, ActivityDetails } from "./styles";

export default function Activity({ id, name, image, content }) {
  return (
    <Link to={`/actividades/${id}`}>
      <ActivityCard>
        <img
          className="thumbnail"
          src={image}
          alt="activities__thumbnail"
          onError={({ currentTarget }) => {
            currentTarget.onerror = null;
            currentTarget.src = "/broken__image.gif";
          }}
        />
        <ActivityDetails>
          <h3 className="activity__title">{name}</h3>
          <p className="activity__details">{content}</p>
          <p className="activity__readmore">
            Leer más <FaArrowRight />
          </p>
        </ActivityDetails>
      </ActivityCard>
    </Link>
  );
}
