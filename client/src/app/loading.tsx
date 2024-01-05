import Header from "@/components/header"
import { Fragment } from "react"

export default function Loading() {
  return (
    <Fragment>
      <Header isAuthorized={false} />
      <div className="loading-container text-center">
        <i className="fas fa-spinner fa-spin fa-3x"></i>
      </div>
    </Fragment>
  )
}
