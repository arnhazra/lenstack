"use client"
import { cn } from "@/lib/utils"
import { Fragment } from "react"

export default function Loading() {
  return (
    <Fragment>
      <div className="fixed inset-0 flex justify-center items-center z-50 bg-white">
        <div>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="36"
            height="36"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className={cn("animate-spin")}
          >
            <path d="M21 12a9 9 0 1 1-6.219-8.56" />
          </svg>
        </div>
      </div>
    </Fragment>
  )
}
