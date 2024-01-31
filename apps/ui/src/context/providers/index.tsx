"use client"
import { ReactNode } from "react"
import ReactQueryProvider from "./reactquery.provider"
import { GlobalStateProvider } from "./globalstate.provider"
import { NextUIProvider } from "@nextui-org/react"

export default function Providers({ children }: { children: ReactNode }) {
  return (
    <ReactQueryProvider>
      <GlobalStateProvider>
        <NextUIProvider>
          {children}
        </NextUIProvider>
      </GlobalStateProvider>
    </ReactQueryProvider>
  )
}
