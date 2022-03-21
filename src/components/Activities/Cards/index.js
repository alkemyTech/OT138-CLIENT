import React from "react";
import { FaArrowRight } from "react-icons/fa";
import { Link } from "react-router-dom";
import { addEllipsis } from "../../../helpers";
import { Card, CardContent, CardImage, CardTitle, CardText, CardFooter } from "../../Card";

export default function Activity({ id, name, image, content }) {
  const TITLE_MAX_LENGTH = 40;

  return (
    <Link to={`/actividades/${id}`}>
      <Card>
        <CardImage
          src={image}
          alt="Activity thumbnail"
          onError={({ currentTarget }) => {
            currentTarget.onerror = null;
            currentTarget.src = "/broken__image.gif";
          }}
        />
        <CardContent>
          <CardTitle>{addEllipsis(name, TITLE_MAX_LENGTH)}</CardTitle>
          <CardText dangerouslySetInnerHTML={{ __html: content }} />
        </CardContent>
        <CardFooter>Leer más <FaArrowRight /></CardFooter>
      </Card>
    </Link>
  );
}
