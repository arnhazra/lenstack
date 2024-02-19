"use client"
import { ReactNode } from "react"
import StyleProvider from "./style.provider"
import ReactQueryProvider from "./reactquery.provider"
import { GlobalStateProvider } from "./globalstate.provider"
import { ConfirmProvider } from "./confirm.provider"
import { PromptProvider } from "./prompt.provider"
import { CachebustingProvider } from "./cachebusting.provider"
import { Toaster } from "react-hot-toast"

export default function Providers({ children }: { children: ReactNode }) {
  return (
    <CachebustingProvider>
      <StyleProvider>
        <ReactQueryProvider>
          <GlobalStateProvider>
            <ConfirmProvider>
              <PromptProvider>
                {children}
                <Toaster position="bottom-right" />
              </PromptProvider>
            </ConfirmProvider>
          </GlobalStateProvider>
        </ReactQueryProvider>
      </StyleProvider>
    </CachebustingProvider>
  )
}
