import type { ReactNode } from 'react'
import './PlaceholderCard.css'

interface Props {
  title: string
  children?: ReactNode
}

export default function PlaceholderCard({ title, children }: Props) {
  return (
    <div className="placeholder-card">
      <div className="placeholder-header">{title}</div>
      <div className="placeholder-body">
        {children ?? <span className="placeholder-text">{title} — placeholder</span>}
      </div>
    </div>
  )
}