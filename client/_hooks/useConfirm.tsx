import { useState } from "react"
import Modal from "react-bootstrap/Modal"
import Button from "react-bootstrap/Button"
import { CheckCircledIcon } from "@radix-ui/react-icons"

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
    <Modal show={show} onHide={() => handleConfirm(false)} centered keyboard={false} backdrop="static">
      <Modal.Header closeButton>
        <Modal.Title>Confirm</Modal.Title>
      </Modal.Header>
      <Modal.Body className="text-center">
        <h5>{message}</h5>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={() => handleConfirm(true)}>
          Yeah <CheckCircledIcon className="icon-right" />
        </Button>
      </Modal.Footer>
    </Modal>
  )

  return { confirmDialog, confirm }
}

export default useConfirm
