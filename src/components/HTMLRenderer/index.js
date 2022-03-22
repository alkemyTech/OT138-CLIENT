export default function HTMLRenderer({ html }) {
  return (
    <div dangerouslySetInnerHTML={{ __html: html }} />
  )
}