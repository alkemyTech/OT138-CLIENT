import React from "react";
import { ArticleContainer } from "./styles";
import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";

export default function Article({ title, thumbnail, category, content }) {
  return (
    <ArticleContainer>
      <h1 className="article__title">{title}</h1>
      <img src={thumbnail} alt="portada" className="article__thumbnail"></img>
      {
        category &&
        <div className="article__category">Categoría: <span>{category}</span></div>
      }
      <ReactMarkdown
        children={content}
        unwrapDisallowed={false}
        rehypePlugins={[rehypeRaw]}
      />
    </ArticleContainer>
  );
}
