import React from 'react'

type Props = {
  src: string
}
export const Playground: React.FC<Props> = ({ src }) => {
  return (
    <iframe
      src={src.replace('play?#code', 'play#code')}
      allow="clipboard-read; clipboard-write"
      width="100%"
      height="100%"
      allowFullScreen
    />
  )
}
