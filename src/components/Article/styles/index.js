import styled from "@emotion/styled";

export const ArticleContainer = styled.section`
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 0 1rem 2rem 1rem;
  background: var(--background-color);
  .article__title {
    font-size: 40px;
    font-weight: 700;
    margin: 15px 0;
  }
  .article__title,
  h1,
  h2,
  h3,
  h4,
  h5,
  h6,
  ul,
  li {
    color: var(--titles-color);
  }
  ul {
    margin: 0 0 1em 0;
  }
  img {
    border-radius: 2px;
    width: 100%;
  }
  .article__thumbnail {
    border-radius: 2px;
    width: 100%;
    max-height: 400px;
    object-fit: cover;
    margin: 0 0 1rem 0;
  }
  span {
    color: var(--span-links-color);
    margin: 5px 0;
  }
  p {
    color: var(--p-content-color);
    font-size: 18px;
    line-height: 1.6;
    margin-bottom: 1em;
  }
  a > strong,
  a {
    color: var(--a-links);
    text-decoration: none;
    :hover {
      color: var(--a-links-hover);
    }
  }
  strong {
    color: var(--strong-content-color);
  }
  .youtube {
    position: relative;
    padding-bottom: 54.5%; /*panorámico*/
    padding-top: 25px;
    height: 0;
    border-radius: 5px;
  }
  .youtube iframe {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    border-radius: 5px;
  }
  .youtube iframe,
  .youtube object,
  .youtube embed {
    border-radius: 5px;
  }
  @media (max-width: 768px) {
    .article__title {
      text-align: center;
    }
  }
`;
