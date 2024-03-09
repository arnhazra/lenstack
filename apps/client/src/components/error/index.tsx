"use client"
import { uiConstants } from "@/constants/global-constants"
import { Button } from "react-bootstrap"
import { ArrowLeftIcon, CrossCircledIcon } from "@radix-ui/react-icons"

interface ErrorProps {
  customMessage?: string
}

export default function Error({ customMessage }: ErrorProps) {
  return (
    <div className="container-center">
      <div className="box">
        <p className="branding mb-4">{customMessage ? customMessage : uiConstants.errorMessage}</p>
        <div className="text-center mb-4">
          <CrossCircledIcon className="icon-large" />
        </div>
        <Button variant="primary" onClick={() => window.history.back()} className="btn-block mt-2"><ArrowLeftIcon className="icon-left" />Go Back</Button>
      </div>
    </div>
  )
}