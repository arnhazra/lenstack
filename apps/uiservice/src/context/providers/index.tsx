"use client"
import { ReactNode } from "react"
import ReactQueryProvider from "./reactquery.provider"
import { GlobalStateProvider } from "./globalstate.provider"
import { ConfirmProvider } from "./confirm.provider"
import { PromptProvider } from "./prompt.provider"
import { Toaster } from "@/components/ui/toaster"

export default function Providers({ children }: { children: ReactNode }) {
  return (
    <ReactQueryProvider>
      <GlobalStateProvider>
        <ConfirmProvider>
          <PromptProvider>
            {children}
          </PromptProvider>
        </ConfirmProvider>
        <Toaster />
      </GlobalStateProvider>
    </ReactQueryProvider>
  )
}
