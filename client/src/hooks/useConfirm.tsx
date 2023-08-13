import { useState } from 'react'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import { ArchiveIcon, CrossCircledIcon } from "@radix-ui/react-icons"

function useConfirm() {
    const [show, setShow] = useState(false)
    const [message, setMessage] = useState('')
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
        <Modal show={show} onHide={() => handleConfirm(false)} centered>
            <Modal.Header closeButton>
                <Modal.Title>Confirmation</Modal.Title>
            </Modal.Header>
            <Modal.Body className="text-center">
                <h5>{message}</h5>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={() => handleConfirm(false)}>
                    Cancel <CrossCircledIcon className="icon-right" />
                </Button>
                <Button className="btn-red" onClick={() => handleConfirm(true)}>
                    Yeah <ArchiveIcon className="icon-right" />
                </Button>
            </Modal.Footer>
        </Modal>
    )

    return { confirmDialog, confirm }
}

export default useConfirm
