"use client"
import Constants from "@/_constants/appConstants"
import { ErrorProps } from "@/_types/Types"
import { Button } from "react-bootstrap"
import { ArrowLeftIcon, CrossCircledIcon } from "@radix-ui/react-icons"
import Footer from "./Footer"
import { Fragment } from "react"

export default function Error({ customMessage }: ErrorProps) {
  return (
    <Fragment>
      <div className="box">
        <p className="branding mb-4">{customMessage ? customMessage : Constants.ErrorMessage}</p>
        <div className="text-center mb-4">
          <CrossCircledIcon className="icon-large" />
        </div>
        <Button onClick={() => window.history.back()} className="btn-block mt-2"><ArrowLeftIcon className="icon-left" />Go Back</Button>
      </div>
      <Footer />
    </Fragment>
  )
}