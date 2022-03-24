import React from 'react';
import { BlockQuote } from './styles';

export default function Quote({ text }) {
  return (
    <BlockQuote><p>{text}</p></BlockQuote>
  )
}