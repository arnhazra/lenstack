import { Fragment } from "react"

export default function Loading() {
  return (
    <Fragment>
      <div className="container-center">
        <div className="loading-container text-center">
          <i className="fas fa-spinner fa-spin fa-3x"></i>
        </div>
      </div>
    </Fragment>
  )
}
