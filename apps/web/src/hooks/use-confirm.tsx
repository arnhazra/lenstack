"use client"
import { useState } from "react"
import { CheckCircle, CircleX } from "lucide-react"
import { Button } from "@/components/ui/button"
import { AlertDialog, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog"

export default function useConfirm() {
  const [show, setShow] = useState(false)
  const [message, setMessage] = useState("")
  const [resolveCallback, setResolveCallback] = useState<(choice: boolean) => void>(() => { })

  const handleClose = () => setShow(false)

  const confirm = (message: string): Promise<boolean> => {
    setMessage(message)
    setShow(true)

    return new Promise((resolve) => {
      setResolveCallback(() => (choice: boolean) => {
        handleClose()
        resolve(choice)
      })
    })
  }

  const handleConfirm = (choice: boolean) => {
    if (resolveCallback) {
      resolveCallback(choice)
      setResolveCallback(() => { })
    }
  }

  const confirmDialog = () => (
    <AlertDialog open={show}>
      <AlertDialogHeader>
        <AlertDialogTitle>{message}</AlertDialogTitle>
        <AlertDialogDescription>
          This Action may not be undone, be sure before you click on continue, you can cancel if you do not want to proceed
        </AlertDialogDescription>
      </AlertDialogHeader>
      <AlertDialogFooter>
        <Button variant="secondary" onClick={() => handleConfirm(false)}>
          <CircleX className="icon-left" />Cancel
        </Button>
        <Button variant="default" onClick={() => handleConfirm(true)}>
          <CheckCircle className="icon-left" />Continue
        </Button>
      </AlertDialogFooter>
    </AlertDialog>
  )

  return { confirmDialog, confirm }
}

export type ConfirmProps = {
  confirmDialog: () => React.ReactNode
  confirm: (message: string) => Promise<boolean>
}