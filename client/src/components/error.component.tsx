"use client"
import { uiConstants } from "@/constants/global-constants"
import { ErrorProps } from "@/types/Types"
import { Button } from "react-bootstrap"
import { ArrowLeftIcon, CrossCircledIcon } from "@radix-ui/react-icons"
import { Fragment } from "react"

export default function Error({ customMessage }: ErrorProps) {
  return (
    <Fragment>
      <div className="box">
        <p className="branding mb-4">{customMessage ? customMessage : uiConstants.errorMessage}</p>
        <div className="text-center mb-4">
          <CrossCircledIcon className="icon-large" />
        </div>
        <Button onClick={() => window.history.back()} className="btn-block mt-2"><ArrowLeftIcon className="icon-left" />Go Back</Button>
      </div>
    </Fragment>
  )
}