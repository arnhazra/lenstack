"use client"
import { useState } from "react"
import { Modal, Button } from "react-bootstrap"
import { CheckCircledIcon, CrossCircledIcon } from "@radix-ui/react-icons"
import { Form } from "react-bootstrap"

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

  const promptDialog = () => (
    <Modal show={show} centered keyboard={false} backdrop="static" className="blurred-background">
      <form onSubmit={(e) => { e.preventDefault(); handleConfirm(true) }}>
        <Modal.Header>
          <h5>{message}</h5>
        </Modal.Header>
        <Modal.Body>
          <Form.Group controlId="exampleForm.ControlInput1">
            <Form.Control required autoFocus type="text" placeholder={`Enter ${message}`} autoComplete={"off"} onChange={(e) => setValue(e.target.value)} />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => handleConfirm(false)}>
            <CrossCircledIcon className="icon-left" />Cancel
          </Button>
          <Button type="submit" variant="primary">
            <CheckCircledIcon className="icon-left" />Proceed
          </Button>
        </Modal.Footer>
      </form>
    </Modal>
  )

  return { promptDialog, prompt }
}

export type PromptProps = {
  promptDialog: () => React.ReactNode
  prompt: (message: string) => Promise<{ hasConfirmed: boolean, value: number }>
}