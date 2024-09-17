"use client"
import { ReactNode } from "react"
import ReactQueryProvider from "../providers/reactquery.provider"
import { GlobalStateProvider } from "./globalstate.provider"
import { ConfirmProvider } from "../providers/confirm.provider"
import { PromptProvider } from "../providers/prompt.provider"
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
