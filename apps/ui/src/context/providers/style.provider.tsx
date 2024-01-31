"use client"
import { Fragment, ReactNode } from "react"
import "@/styles/globals.style.sass"

export default function StyleProvider({ children }: { children: ReactNode }) {
  return (
    <Fragment>{children}</Fragment>
  )
}
