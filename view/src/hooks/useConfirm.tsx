"use client"
import { useState } from "react"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button"

function useConfirm() {
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
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete your
            account and remove your data from our servers.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={() => handleConfirm(false)}>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={() => handleConfirm(true)}>Continue</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )

  return { confirmDialog, confirm }
}

export default useConfirm
