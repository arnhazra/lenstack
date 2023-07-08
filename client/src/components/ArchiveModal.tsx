import { FC, Fragment } from 'react'
import { Button, Modal } from 'react-bootstrap'
import { Tilt_Neon } from 'next/font/google'
import Show from './Show'

interface ArchiveModalProps {
    isOpened: boolean,
    isTxProcessing: boolean,
    closeModal: () => void,
    doAction: () => void
}

const tiltNeon = Tilt_Neon({ subsets: ['latin'] })

const ArchiveModal: FC<ArchiveModalProps> = ({ isOpened, isTxProcessing, closeModal, doAction }) => {
    const hideModal = (): void => {
        if (!isTxProcessing) {
            closeModal()
        }
    }

    return (
        <Fragment>
            <Modal backdrop='static' centered show={isOpened} onHide={hideModal} className={tiltNeon.className}>
                <Modal.Header closeButton>
                    <Modal.Title>Archive</Modal.Title>
                </Modal.Header>
                <Modal.Body className='text-center'>
                    <Show when={!isTxProcessing}>
                        <h5>Are you sure you want to archive this?</h5>
                    </Show>
                    <Show when={isTxProcessing}>
                        <h5>Archive in progress <i className='fas fa-circle-notch fa-spin'></i></h5>
                    </Show>
                </Modal.Body>
                <Modal.Footer>
                    <Button disabled={isTxProcessing} onClick={doAction}>Archive<i className='fa-solid fa-archive'></i></Button>
                    <Button disabled={isTxProcessing} onClick={hideModal}>Cancel<i className='fa-solid fa-close'></i></Button>
                </Modal.Footer>
            </Modal>
        </Fragment>
    )
}

export default ArchiveModal