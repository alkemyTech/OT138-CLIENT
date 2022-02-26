import React from "react";
import { ArticleContainer } from "./styles";
import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";

export default function Article({ title, thumbnail, content }) {
  return (
    <ArticleContainer>
      <h1 className="article__title">{title}</h1>
      <img src={thumbnail} alt="portada" className="article__thumbnail"></img>
      <ReactMarkdown
        children={content}
        unwrapDisallowed={false}
        rehypePlugins={[rehypeRaw]}
      />
    </ArticleContainer>
  );
}
