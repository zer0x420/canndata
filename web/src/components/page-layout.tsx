// src/components/PageLayout.tsx
import React from "react"

interface PageLayoutProps {
    title?: string
    children: React.ReactNode
    border?: boolean
}

const PageLayout = ({ title, children, border }: PageLayoutProps) => {
    return (
        <div className="flex-grow container mx-auto py-8">
            <h1 className="text-3xl font-bold mb-6">{title}</h1>
            <div className={(border ? 'rounded-lg border p-6 shadow-sm' : '')}>
                {children}
            </div>
        </div>
    )
}

export default PageLayout
