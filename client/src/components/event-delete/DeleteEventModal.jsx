import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

const DeleteEventModal = (
    {
        show,
        event,
        onClose,
        deleteUserHandler
    }
) => {

    return (
        <>
            <Modal
                show={show}
                onHide={onClose}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header closeButton>
                    <Modal.Title>Please confirm that you want to delete:</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {event.name}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" onClick={deleteUserHandler}>Delete</Button>
                    <Button variant="danger" onClick={onClose}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default DeleteEventModal;