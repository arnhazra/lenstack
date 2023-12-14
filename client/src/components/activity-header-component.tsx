"use client"
import { ReactNode } from "react"

export default function ActivityHeader({ children }: { children: ReactNode }) {
  return (
    <div className="activityheader pt-4 ps-4 pe-4 pb-2">{children}</div>
  )
}