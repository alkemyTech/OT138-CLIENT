import styled from "@emotion/styled";

export const ActivityCard = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 260px;
  height: 360px;
  border-radius: 10px;
  background: #fff;
  box-shadow: 0 10px 15px -3px rgb(0 0 0 / 10%), 0 4px 6px -2px rgb(0 0 0 / 5%);
  cursor: pointer;
  margin: 0.5rem;
  .thumbnail {
    border-radius: 10px 10px 0 0;
    width: 100%;
  }
  &:hover {
    transition: zoom 0.5s ease-out 0s;
    transform: scale(1.018);
  }
`;
export const ActivityDetails = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0 0.5rem;
  flex: 1;
  .activity__title {
    margin: 1rem 0 10px 0;
    font-size: 1.3rem;
  }
  .activity__details {
    color: gray;
    margin: 0;
    font-size: 14.5px;
    height: 100%;
  }

  .activity__readmore {
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
  }
`;
