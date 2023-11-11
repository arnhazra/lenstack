"use client"
import { ReactNode } from "react"

export default function GenericHero({ children }: { children: ReactNode }) {
  return (
    <div className="generichero p-4">{children}</div>
  )
}