"use client"
import { ReactNode } from "react"

export interface ShowProps {
  condition: boolean
  children: ReactNode
  fallback?: ReactNode
}

export default function Show({ condition, children, fallback }: ShowProps) {
  return condition ? <>{children}</> : <>{fallback ?? null}</>
}
