import React from 'react';

export default function HTMLRenderer({ html }) {
  return (
    <p dangerouslySetInnerHTML={{ __html: html }} />
  )
}