import React from 'react'

interface IContentSection {
  title: string
  icon: React.JSX.Element
  children: React.ReactNode
}

const ContentSection = ({ title, icon, children }: IContentSection) => {
  return (
    <div className="w-full min-h-full h-fit bg-neutral p-8 lg:rounded-2xl">
      <div className="flex items-center justify-center gap-2">
        <span>{icon}</span>
        <p className="text-4xl font-semibold">{title}</p>
      </div>
      <div className="divider"></div>
      {children}
    </div>
  )
}

export default ContentSection
