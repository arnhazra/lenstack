"use client"
import { ReactNode } from "react"

export interface SuspenseProps {
  condition: boolean
  children: ReactNode
  fallback: ReactNode
}

export default function Suspense({ condition, children, fallback }: SuspenseProps) {
  return condition ? <>{children}</> : <>{fallback}</>
}