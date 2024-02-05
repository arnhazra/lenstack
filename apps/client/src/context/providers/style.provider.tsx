"use client"
import { Fragment, ReactNode } from "react"
import "@/styles/global.style.sass"
import "@/styles/header.style.sass"
import "@/styles/button.style.sass"
import "@/styles/form.style.sass"
import "@/styles/card.style.sass"

export default function StyleProvider({ children }: { children: ReactNode }) {
  return (
    <Fragment>{children}</Fragment>
  )
}
