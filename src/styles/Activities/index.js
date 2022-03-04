import styled from "@emotion/styled";

export const ActivitiesContainer = styled.section`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  width: 100%;
  flex: 1;
  padding: 1.5rem 0;
`;

export const TitleBanner = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 250px;
  .activity__title {
    font-size: 40px;
    z-index: 2;
    color: white;
  }
  .activity__thumbnail {
    object-fit: cover;
    position: absolute;
    width: 100%;
    height: 250px;
  }
`;

