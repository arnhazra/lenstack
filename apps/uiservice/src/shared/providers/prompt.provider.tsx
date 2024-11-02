"use client"
import { ReactNode, createContext, useContext } from "react"
import usePrompt, { PromptProps } from "../hooks/use-prompt"

const PromptContext = createContext<PromptProps | undefined>(undefined)

export const PromptProvider = ({ children }: { children: ReactNode }) => {
  const { promptDialog, prompt } = usePrompt()
  const value = { promptDialog, prompt }

  return (
    <PromptContext.Provider value={value}>
      {children}
      {promptDialog()}
    </PromptContext.Provider>
  )
}

export const usePromptContext = (): PromptProps => {
  const context = useContext(PromptContext)

  if (!context) {
    throw new Error("usePromptContext must be used within a PromptProvider")
  }

  return context
}
