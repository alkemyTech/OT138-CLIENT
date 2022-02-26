import styled from "@emotion/styled";

export const CardContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 360px;
  width: 250px;
  background: var(--cards-background);
  color: ${({ theme }) => (theme?.darkMode ? "#ffffff" : "#000000")};
  margin: 0.4rem;
  border-radius: 10px;
  box-shadow: 0px 2px 4px rgba(71, 78, 92, 0.07);
  text-align: center;
  position: relative;
  transition: zoom 0.5s ease-in;
  &:hover {
    cursor: pointer;
    transform: scale(1.018);
  }

  .article__image {
    width: 100%;
    object-fit: cover;
    height: 210px;
    border-radius: 6px 6px 0 0;
    -webkit-user-select: none;
    -khtml-user-select: none;
    -moz-user-select: none;
    -o-user-select: none;
    user-select: none;
  }
  h2 {
    margin: 5px 0;
  }
  p {
    color: gray;
    font-size: 0.9rem;
  }
`;

export const Avatar = styled.img`
  display: flex;
  flex-direction: column;
  height: 30px;
  width: 30px;
  object-fit: cover;
  border-radius: 50%;
`;

export const AvatarAndDescription = styled.div`
  margin: 8px 0 0 1rem;
  display: flex;
  flex-direction: row;
  align-items: center;
  width: fit-content;
  p {
    margin: 0 0 0 5px;
  }
`;
export const VerifiedIcon = styled.span`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  font-size: 20px;
  transition: all 0.3s ease;
  height: fit-content;
  width: fit-content;
  color: #4da6e9;
  margin: 0 0 0 2px;
`;

export const VerifiedProtectoraIcon = styled.span`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  font-size: 20px;
  transition: all 0.3s ease;
  height: fit-content;
  width: fit-content;
  color: #00c852;
  margin: 0 0 0 2px;
`;
