import React from 'react';
import styled from '@emotion/styled';

export const Card = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 260px;
  min-width: 260px;
  height: 360px;
  min-height: 360px;
  border-radius: 10px;
  background: #fff;
  box-shadow: 0 10px 15px -3px rgb(0 0 0 / 10%), 0 4px 6px -2px rgb(0 0 0 / 5%);
  cursor: pointer;
  margin: 0.5rem;
  
  &:hover {
    transition: zoom 0.5s ease-out 0s;
    transform: scale(1.018);
  }
`;

export const CardImage = styled.img`
  border-radius: 10px 10px 0 0;
  width: 100%;
  min-height: 180px;
  max-height: 180px;
  object-fit: cover;
`;

export const CardContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0 0.5rem;
  width: 100%;
  flex: 1;
  overflow: hidden;
`;

export const CardTitle = styled.h3`
  margin: 1rem 0 10px 0;
  font-size: 1.15rem;  
`;

export const CardText = styled.div`
  color: gray;
  margin: 0;
  font-size: 14.5px;
  height: 100%;
  width: 100%;
  overflow: hidden;
  -webkit-mask-image: linear-gradient(to bottom, #fff 50%, transparent 100%);
  background: linear-gradient(to bottom, #fff 50%, transparent 100%);
`;

export const CardFooter = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  justify-content: flex-end;
  align-items: center;
  color: gray;
  font-size: 14px;
  margin: 0 0.5rem 20px 0;
  svg {
    margin: 0 0 0 3px;
  }
`;