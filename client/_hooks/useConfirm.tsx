import { useState } from "react"
import Modal from "react-bootstrap/Modal"
import Button from "react-bootstrap/Button"
import { CheckCircledIcon, CrossCircledIcon } from "@radix-ui/react-icons"

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
    <Modal show={show} centered keyboard={false} backdrop="static">
      <Modal.Header className="ps-4 pe-4">
        <h5>{message}</h5>
      </Modal.Header>
      <Modal.Body className="ps-4 pe-4">
        <p className="boxtext">This Action may not be undone, be sure before you click on continue, you can cancel if you don't want to proceed</p>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={() => handleConfirm(false)}>
          Cancel <CrossCircledIcon className="icon-right" />
        </Button>
        <Button onClick={() => handleConfirm(true)}>
          Continue <CheckCircledIcon className="icon-right" />
        </Button>
      </Modal.Footer>
    </Modal >
  )

  return { confirmDialog, confirm }
}

export default useConfirm
