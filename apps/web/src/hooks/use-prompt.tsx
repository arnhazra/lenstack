"use client"
import { useState } from "react"
import { CheckCircle, CircleX } from "lucide-react"
import { Button } from "@/components/ui/button"
import { AlertDialog, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog"
import { Input } from "@/components/ui/input"

export default function usePrompt() {
  const [show, setShow] = useState(false)
  const [message, setMessage] = useState<string>("")
  const [value, setValue] = useState<string>("")
  const [resolveCallback, setResolveCallback] = useState<(choice: { hasConfirmed: boolean, value: string }) => void>(() => { })

  const handleClose = () => setShow(false)

  const prompt = (message: string): Promise<{ hasConfirmed: boolean, value: number }> => {
    setMessage(message)
    setShow(true)

    return new Promise((resolve) => {
      setResolveCallback(() => ({ hasConfirmed, value }: { hasConfirmed: boolean, value: number }) => {
        handleClose()
        resolve({ hasConfirmed, value })
      })
    })
  }

  const handleConfirm = (choice: boolean) => {
    if (resolveCallback) {
      resolveCallback({ hasConfirmed: choice, value })
      setResolveCallback(() => { })
    }
  }

  const promptDialog = () => {
    if (show) {
      return (
        <AlertDialog>
          <form onSubmit={(e) => { e.preventDefault(); handleConfirm(true) }}>
            <AlertDialogHeader>
              <AlertDialogTitle>{message}</AlertDialogTitle>
              <Input required autoFocus type="text" placeholder={`Enter ${message}`} autoComplete={"off"} onChange={(e) => setValue(e.target.value)} />
            </AlertDialogHeader>
            <AlertDialogFooter>
              <Button variant="secondary" onClick={() => handleConfirm(false)}>
                <CircleX className="icon-left" />Cancel
              </Button>
              <Button type="submit" variant="default">
                <CheckCircle className="icon-left" />Proceed
              </Button>
            </AlertDialogFooter>
          </form>
        </AlertDialog>
      )
    }

    else {
      <div />
    }
  }

  return { promptDialog, prompt }
}

export type PromptProps = {
  promptDialog: () => React.ReactNode
  prompt: (message: string) => Promise<{ hasConfirmed: boolean, value: number }>
}