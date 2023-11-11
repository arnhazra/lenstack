"use client"
import Constants from "@/constants/appConstants"
import { CrossCircledIcon } from "@radix-ui/react-icons"

export default function Error() {
  return (
    <div className="box">
      <p className="branding mb-4">{Constants.ToastError}</p>
      <div className="text-center mb-4">
        <CrossCircledIcon className="icon-large" />
      </div>
    </div>
  )
}
