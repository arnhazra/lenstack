"use client"
import { useState } from "react"
import {
	AlertDialog,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button"
import { uiConstants } from "@/constants/global-constants"

export default function useConfirm() {
	const [show, setShow] = useState(false)
	const [message, setMessage] = useState("")
	const [resolveCallback, setResolveCallback] = useState<
		(choice: boolean) => void
	>(() => {})

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
			setResolveCallback(() => {})
		}
	}

	const confirmDialog = () => (
		<AlertDialog open={show}>
			<AlertDialogContent>
				<AlertDialogHeader>
					<AlertDialogTitle>{message}</AlertDialogTitle>
					<AlertDialogDescription>
						{uiConstants.confirmDescription}
					</AlertDialogDescription>
				</AlertDialogHeader>
				<AlertDialogFooter>
					<Button variant="outline" onClick={() => handleConfirm(false)}>
						Cancel
					</Button>
					<Button variant="default" onClick={() => handleConfirm(true)}>
						Continue
					</Button>
				</AlertDialogFooter>
			</AlertDialogContent>
		</AlertDialog>
	)

	return { confirmDialog, confirm }
}

export type ConfirmProps = {
	confirmDialog: () => React.ReactNode
	confirm: (message: string) => Promise<boolean>
}
