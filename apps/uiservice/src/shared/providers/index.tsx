"use client"
import { ReactNode } from "react"
import ReactQueryProvider from "./reactquery.provider"
import { GlobalStateProvider } from "../../context/globalstate.provider"
import { ConfirmProvider } from "./confirm.provider"
import { PromptProvider } from "./prompt.provider"
import { Toaster } from "../components/ui/toaster"
import { TooltipProvider } from "../components/ui/tooltip"

export default function Providers({ children }: { children: ReactNode }) {
  return (
    <TooltipProvider>
      <ReactQueryProvider>
        <GlobalStateProvider>
          <ConfirmProvider>
            <PromptProvider>{children}</PromptProvider>
          </ConfirmProvider>
          <Toaster />
        </GlobalStateProvider>
      </ReactQueryProvider>
    </TooltipProvider>
  )
}
