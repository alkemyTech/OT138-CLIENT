import React from "react";
import { FaArrowRight } from "react-icons/fa";
import { Link } from "react-router-dom";
import { Card, CardContent, CardImage, CardTitle, CardText, CardFooter } from "../../Card";
import { addEllipsis } from "../../../helpers";

export default function New({ id, name, image, content }) {
  const TITLE_MAX_LENGTH = 40;

  return (
    <Link to={`/novedades/${id}`}>
      <Card>
        <CardImage
          src={image}
          onError={({ currentTarget }) => {
            currentTarget.onerror = null;
            currentTarget.src = "/broken__image.gif";
          }}
          alt="News thumbnail"
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
