import React, { useState, useEffect } from 'react';
import CreationForm from './components/CreationForm';
import CategoryList from './components/List';
import { Button, Modal } from 'react-bootstrap';
import styles from './styles.module.css';

function CategoryPage() {
  const [show, setShow] = useState(false);
  return (
    <div>
      <CategoryList />
      <Modal show={show} onHide={() => setShow(false)}>
        <Modal.Header closeButton></Modal.Header>
        <Modal.Body>
          <CreationForm />
        </Modal.Body>
      </Modal>
      <Button
        className={styles.createButton}
        variant="success"
        onClick={() => setShow(true)}
      >
        Tạo thể loại
      </Button>
    </div>
  );
}

export default CategoryPage;
