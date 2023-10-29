"use client"
import { Fragment } from "react"

export default function Loading() {
  return (
    <Fragment>
      <div className="loading-container text-center">
        <i className="fas fa-circle-notch fa-spin fa-3x"></i>
      </div>
    </Fragment>
  )
}
