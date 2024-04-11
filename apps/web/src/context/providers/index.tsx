"use client"
import { ReactNode } from "react"
import ReactQueryProvider from "./reactquery.provider"
import { GlobalStateProvider } from "./globalstate.provider"
import { ConfirmProvider } from "./confirm.provider"
import { PromptProvider } from "./prompt.provider"
import { Toaster } from "react-hot-toast"
import { CachebustingProvider } from "./cachebusting.provider"

export default function Providers({ children }: { children: ReactNode }) {
  return (
    <CachebustingProvider>
      <ReactQueryProvider>
        <GlobalStateProvider>
          <ConfirmProvider>
            <PromptProvider>
              {children}
            </PromptProvider>
          </ConfirmProvider>
          <Toaster position="bottom-right" />
        </GlobalStateProvider>
      </ReactQueryProvider>
    </CachebustingProvider>
  )
}
