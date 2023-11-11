"use client"
import Constants from "@/constants/appConstants"
import { Button } from "react-bootstrap"
import { ArrowLeftIcon, CrossCircledIcon } from "@radix-ui/react-icons"

export default function NotFound() {
  return (
    <div className="box">
      <p className="branding mb-4">{Constants.ErrorMessage}</p>
      <div className="text-center mb-4">
        <CrossCircledIcon className="icon-large" />
      </div>
      <Button onClick={() => window.history.back()} className="btn-block mt-2"><ArrowLeftIcon className="icon-left" />Go Back</Button>
    </div>
  )
}
