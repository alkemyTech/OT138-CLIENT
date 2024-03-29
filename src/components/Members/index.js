import styled from "@emotion/styled";
import React from "react";

export const MemberCardContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 200px;
  min-width: 200px;
  box-sizing: border-box;
  border-radius: 10px;
  overflow: hidden;
  margin: 1rem;
  box-shadow: 0 2px 8px 4px rgba(0, 0, 0, 0.1);
  gap: 10px;
  
  .card__avatar {
    width: 200px;
    height: 200px;

    img {
      width: 100%;
      height: auto;
      filter: grayscale(10%);
    }
  }

  .card__name {
    font-size: 1.1rem;
    text-align: center;
    box-sizing: border-box;
    padding: 1rem 0 .5rem 0;
  }

  .card__area {
    font-size: 0.8rem;
    font-weight: 600;
    color: gray;
    padding-bottom: 1rem;
  }
`;

export function Card({ image, name, area }) {
  return (
    <MemberCardContainer>
      <div className="card__avatar">
        <img
          src={image}
          onError={({ currentTarget }) => {
            currentTarget.onerror = null;
            currentTarget.src = "/broken__image.gif";
          }}
        />
      </div>
      <span className="card__name">{name}</span>
      <span className="card__area">{area}</span>
    </MemberCardContainer>
  );
}
