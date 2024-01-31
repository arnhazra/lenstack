"use client"
import { ReactNode } from "react"
import ReactQueryProvider from "./reactquery.provider"
import { GlobalStateProvider } from "./globalstate.provider"
import { NextUIProvider } from "@nextui-org/react"
import StyleProvider from "./style.provider"

export default function Providers({ children }: { children: ReactNode }) {
  return (
    <ReactQueryProvider>
      <GlobalStateProvider>
        <NextUIProvider>
          <StyleProvider>
            {children}
          </StyleProvider>
        </NextUIProvider>
      </GlobalStateProvider>
    </ReactQueryProvider>
  )
}
