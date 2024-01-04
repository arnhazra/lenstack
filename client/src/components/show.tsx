"use client"
import { Fragment, ReactNode } from "react"

export interface ShowProps {
  when: boolean
  children: ReactNode
}

export default function Show({ when, children }: ShowProps) {
  return when === undefined || !when ? <Fragment></Fragment> : <Fragment>{children}</Fragment>
}