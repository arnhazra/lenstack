"use client"
import { ReactNode } from 'react'
import StyleProvider from "./style.provider"
import ReactQueryProvider from "./reactquery.provider"
import { GlobalStateProvider } from "@/context/globalstate.provider"
import { ConfirmProvider } from "./confirm.provider"
import { PromptProvider } from "./prompt.provider"

export default function Providers({ children }: { children: ReactNode }) {
  return (
    <StyleProvider>
      <ReactQueryProvider>
        <GlobalStateProvider>
          <ConfirmProvider>
            <PromptProvider>
              {children}
            </PromptProvider>
          </ConfirmProvider>
        </GlobalStateProvider>
      </ReactQueryProvider>
    </StyleProvider>
  )
}
