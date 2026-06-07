import React from 'react';
import { Modal, Button } from 'react-bootstrap';

function MyModal({ show, handleClose, context }) {
    if (!context) return null;

    return (
        <Modal show={show} onHide={handleClose} centered>
            <Modal.Header closeButton>
                <Modal.Title>{context.name}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <img src={context.imageSrc} alt={context.name} className="img-fluid mb-3" style={{ borderRadius: '8px' }} />
                <p><strong>ID:</strong> {context.id}</p>
                <p><strong>Description:</strong> {context.description}</p>
                <p><strong>Price:</strong> <span className="text-success fw-bold">{context.newPrice}</span></p>
                {context.tag && <p><strong>Tag:</strong> <span className="badge bg-warning text-dark">{context.tag}</span></p>}
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Close
                </Button>
            </Modal.Footer>
        </Modal>
    );
}

export default MyModal;