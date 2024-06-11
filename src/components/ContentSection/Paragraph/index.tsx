import React from 'react'

interface IParagraph {
  children: React.ReactNode
}

const Paragraph = ({ children }: IParagraph) => {
  return <p className="text-justify text-lg">{children}</p>
}

export default Paragraph
