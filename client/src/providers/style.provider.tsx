"use client"
import { Fragment, ReactNode } from 'react'
import "bootstrap/dist/css/bootstrap.min.css"
import "@/styles/global.style.sass"
import "@/styles/header.style.sass"
import "@/styles/button.style.sass"
import "@/styles/form.style.sass"
import "@/styles/productcard.style.sass"

export default function StyleProvider({ children }: { children: ReactNode }) {
  return (
    <Fragment>{children}</Fragment>
  )
}
