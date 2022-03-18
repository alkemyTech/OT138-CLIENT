import React from "react";
import { FaArrowRight, FaCalendar, FaClock } from "react-icons/fa";
import { Link } from "react-router-dom";
import { Card, CardDetails } from '../../Card';
import { addEllipsis } from "../../../helpers";

export default function New({ id, name, image, content }) {
  const TITLE_MAX_LENGTH = 40;

  return (
    <Link to={`/novedades/${id}`}>
      <Card>
        <img
          className="card__thumbnail"
          src={image}
          onError={({ currentTarget }) => {
            currentTarget.onerror = null;
            currentTarget.src = "/broken__image.gif";
          }}
          alt="News thumbnail"
        />
        <CardDetails>
          <h4 className="card__title">{addEllipsis(name, TITLE_MAX_LENGTH)}</h4>
          <div className="card__details" dangerouslySetInnerHTML={{ __html: content }} />
          <p className="card__readmore">
            Leer más <FaArrowRight />
          </p>
        </CardDetails>
      </Card>
    </Link>
  );
}
