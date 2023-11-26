"use client"
import { useState } from "react"
import Modal from "react-bootstrap/Modal"
import Button from "react-bootstrap/Button"
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
    <Modal show={show} centered keyboard={false} backdrop="static">
      <Modal.Header>
        <h5>{message}</h5>
      </Modal.Header>
      <Modal.Body>
        <Form.Group controlId="exampleForm.ControlInput1">
          <Form.Control autoFocus type="text" placeholder="Enter the value" autoComplete={"off"} onChange={(e) => setValue(e.target.value)} />
        </Form.Group>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={() => handleConfirm(false)}>
          <CrossCircledIcon className="icon-left" />Cancel
        </Button>
        <Button onClick={() => handleConfirm(true)}>
          <CheckCircledIcon className="icon-left" />Proceed
        </Button>
      </Modal.Footer>
    </Modal>
  )

  return { promptDialog, prompt }
}