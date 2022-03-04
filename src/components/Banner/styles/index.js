import styled from "@emotion/styled";

export const BannerContainer = styled.div`
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
