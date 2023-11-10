"use client"
import { ShowProps } from "@/_types/Types"
import { Fragment } from "react"

export default function Show({ when, children }: ShowProps) {
  return when === undefined || !when ? <Fragment></Fragment> : <Fragment>{children}</Fragment>
}