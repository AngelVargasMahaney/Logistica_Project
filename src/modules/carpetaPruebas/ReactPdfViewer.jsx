import React, { useState } from 'react'
import Modal from "react-bootstrap/Modal";

const ReactPdfViewer = () => {

    const [isOpen, setIsOpen] = useState(false)


    const showModal = () => {
        setIsOpen(true);
    };

    const hideModal = () => {
        setIsOpen(false);
    };
    return (
        <>
            <button onClick={showModal}>PDF Viewer</button>
            <Modal show={isOpen} onHide={hideModal} size="lg">
                <div>
                    <Modal.Body>
                        <div className="ModalStyles">
                            <iframe
                                id="pdf-js-viewer"
                                src="http://www.africau.edu/images/default/sample.pdf"
                                title="webviewer"
                                frameborder="0"
                                width="100%"
                                height="100%"
                            ></iframe>
                        </div>
                    </Modal.Body>
                    <Modal.Footer>
                        <button onClick={hideModal}>Cancel</button>
                    </Modal.Footer>
                </div>

            </Modal>
        </>
    )
}

export default ReactPdfViewer
