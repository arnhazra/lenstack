"use client"
import { ReactNode } from "react"

export default function GenericHero({ children }: { children: ReactNode }) {
  return (
    <div className="generichero pt-3 ps-4 pe-4 pb-2">{children}</div>
  )
}