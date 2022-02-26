import React from "react";
import {
  CardContainer,
  Avatar,
  AvatarAndDescription,
  VerifiedIcon,
  VerifiedProtectoraIcon,
} from "./styles";
import Link from "next/link";
import { HiBadgeCheck } from "react-icons/hi";
import moment from "moment";
import withCountry from "../../../services/withCountry";
function Card({ articulo, country }) {
  return (
    <Link href={`/blog/${articulo?.slug}`}>
      <CardContainer>
        <img className="article__image" src={articulo?.imagen}></img>
        <h2 className="article__title">{articulo?.titulo}</h2>
        <p>
          Fecha de Publicación{" "}
          <b>{moment(articulo?.fecha).format("DD/MM/yyyy")}</b>{" "}
        </p>
        <AvatarAndDescription>
          <Link
            href={`/${country}/${articulo?.personas_articulo?.persona?.username}`}
          >
            <>
              <Avatar
                src={
                  articulo?.personas_articulo?.persona?.profile_url
                    ? articulo?.personas_articulo?.persona?.profile_url
                    : "/anonimo.png"
                }
              />
              <p>
                <b>
                  {articulo?.personas_articulo?.persona?.p_nombre}{" "}
                  {articulo?.personas_articulo?.persona?.p_apellido}
                </b>
              </p>
            </>
          </Link>
          {articulo?.personas_articulo?.persona?.verificado == 1 ? (
            <VerifiedIcon>
              <HiBadgeCheck />
            </VerifiedIcon>
          ) : articulo?.personas_articulo?.persona?.verificado == 2 ? (
            <VerifiedProtectoraIcon>
              <HiBadgeCheck />
            </VerifiedProtectoraIcon>
          ) : null}
        </AvatarAndDescription>
      </CardContainer>
    </Link>
  );
}
export default withCountry(Card);
