"use client"
import { ReactNode, createContext, useContext } from "react"
import useConfirm, { ConfirmProps } from "../hooks/use-confirm"

const ConfirmContext = createContext<ConfirmProps | undefined>(undefined)

export const ConfirmProvider = ({ children }: { children: ReactNode }) => {
  const { confirmDialog, confirm } = useConfirm()
  const value = { confirmDialog, confirm }

  return (
    <ConfirmContext.Provider value={value}>
      {children}
      {confirmDialog()}
    </ConfirmContext.Provider>
  )
}

export const useConfirmContext = (): ConfirmProps => {
  const context = useContext(ConfirmContext)

  if (!context) {
    throw new Error("useConfirmContext must be used within a ConfirmProvider")
  }

  return context
}
