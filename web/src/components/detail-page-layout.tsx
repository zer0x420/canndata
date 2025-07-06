import React from "react"
import { Badge } from "./ui/badge"
interface DetailPageLayoutProps {
  title: string,
  tags?: string[],
  children: React.ReactNode
}

const headerTags = (tags?: string[]) => {
  return <div>
    {tags?.map((tag) => {
      return <Badge className="mx-1" key={tag}>{tag}</Badge>
    })}
  </div>;
}

const DetailPageLayout: React.FC<DetailPageLayoutProps> = ({ title, children, tags }) => {
  return (
    <div className="flex-grow container mx-auto py-8">
      {/* Titel */}
      <h1 className="text-3xl font-bold mb-6">{title} {headerTags(tags)} </h1>

      {/* Content */}
      <div className="rounded-lg border p-6 shadow-sm">
        {children}
      </div>
    </div>
  )
}

export default DetailPageLayout
