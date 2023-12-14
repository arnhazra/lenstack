"use client"
import { ReactNode } from "react"

export default function SubHeader({ children }: { children: ReactNode }) {
  return (
    <div className="subheader pt-4 ps-4 pe-4 pb-1">{children}</div>
  )
}