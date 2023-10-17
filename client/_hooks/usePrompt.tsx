import { useState } from "react"
import Modal from "react-bootstrap/Modal"
import Button from "react-bootstrap/Button"
import { CheckCircledIcon, CrossCircledIcon } from "@radix-ui/react-icons"
import { Form } from "react-bootstrap"

export default function usePrompt() {
  const [show, setShow] = useState(false)
  const [message, setMessage] = useState("")
  const [amount, setAmount] = useState<number>(0)
  const [resolveCallback, setResolveCallback] = useState<(choice: { hasConfirmed: boolean, amount: number }) => void>(() => { })

  const handleClose = () => setShow(false)

  const prompt = (message: string): Promise<{ hasConfirmed: boolean, amount: number }> => {
    setMessage(message)
    setShow(true)

    return new Promise((resolve) => {
      setResolveCallback(() => ({ hasConfirmed, amount }: { hasConfirmed: boolean, amount: number }) => {
        handleClose()
        resolve({ hasConfirmed, amount })
      })
    })
  }

  const handleConfirm = (choice: boolean) => {
    if (resolveCallback) {
      resolveCallback({ hasConfirmed: choice, amount })
      setResolveCallback(() => { })
    }
  }

  const promptDialog = () => (
    <Modal show={show} centered keyboard={false} backdrop="static">
      <Modal.Header>
        <h6>{message}</h6>
      </Modal.Header>
      <Modal.Body>
        <Form.Group controlId="exampleForm.ControlInput1">
          <Form.Control autoFocus type="number" placeholder="Amount in number" autoComplete={"off"} onChange={(e) => setAmount(Number(e.target.value))} />
        </Form.Group>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={() => handleConfirm(false)}>
          Cancel <CrossCircledIcon className="icon-right" />
        </Button>
        <Button onClick={() => handleConfirm(true)}>
          Proceed <CheckCircledIcon className="icon-right" />
        </Button>
      </Modal.Footer>
    </Modal>
  )

  return { promptDialog, prompt }
}


