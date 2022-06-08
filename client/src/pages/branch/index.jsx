import CreationModal from './components/CreationForm';
import React, { useState } from 'react';
import { Button, Modal } from 'react-bootstrap';
import BranchList from './components/List';
import styles from './styles.module.css';

function BranchPage() {
  const [show, setShow] = useState(false);

  const handleClose = () => {
    setShow(false);
  };

  return (
    <div>
      <BranchList />
      <Button
        variant="success"
        className={styles.createButton}
        onClick={() => setShow(true)}
      >
        Tạo chi nhánh
      </Button>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton></Modal.Header>
        <Modal.Body>
          <CreationModal />
        </Modal.Body>
      </Modal>
    </div>
  );
}

export default BranchPage;
