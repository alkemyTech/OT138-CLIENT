import styled from "@emotion/styled";
import { ButtonContainer } from "../../components/Inputs/styles";

export const SectionTitle = styled.h1`
  margin: 1.5rem 0 0 0;
`;

export const HeaderButtons = styled.div`
  padding: 5px;
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-end;
  align-items: center;
  gap: 20px;
`;

export const AddButton = styled(ButtonContainer)`
  display: flex;
  flex-direction: row;
  justify-content: center;
  gap: 5px;
  align-items: center;
  padding: 5px 15px;
  min-width: 150px;
  width: auto;
  height: 42px;
  margin: 0;
`;

export const BackOfficeContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  flex: 1;
  width: 100%;
  margin: 1rem 0 0 0;
`;

export const BackofficeDivider = styled.div`
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  flex: 1;
  padding: 0 1rem;
  max-width: 50%;
  align-items: center;
  h2 {
    text-align: left;
    width: 100%;
    max-width: 620px;
  }
  @media (max-width: 768px) {
    width: 100%;
    max-width: none;
  }
`;

export const StatisticsContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  margin: 7.2rem 0 0 0;
  max-width: 620px;
  max-height: 280px;
  min-width: 280px;
  min-height: 260px;
  height: 100%;
  width: 100%;
  flex: 1;
`;

export const StatisticsBox = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 620px;
  max-height: 300px;
  min-width: 280px;
  min-height: 260px;
  height: 100%;
  width: 100%;
  flex: 1;
  background: #ebf2fb;
  border-radius: 5px;
  div > div {
    overflow: hidden;
  }
  @media (max-width: 960px) {
    div > div {
      overflow: auto;
    }
  }
  .table__wrap__text {
    max-width: 220px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
`;

export const BackofficeWelcome = styled.div`
  display: flex;
  padding: 1rem;
  flex-direction: column;
  align-items: center;
  width: 100%;

  .welcome__title {
    margin: 1rem 0 0 0;
    @media (max-width: 768px) {
      text-align: center;
    }
  }
  .welcome__description {
    margin: 5px 0 0 3.2rem;
    @media (max-width: 768px) {
      margin: 0;
      text-align: center;
    }
  }
`;

export const Thumbnail = styled.img`
  display: flex;
  flex-direction: column;
  width: 45px;
  height: 45px;
  object-fit: cover;
  border-radius: 50%;
`;
