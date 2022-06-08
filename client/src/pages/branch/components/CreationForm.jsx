import React, { useState } from 'react';
import branchApi from 'api/branchApi';
import { Button, Form } from 'react-bootstrap';
import styles from './creationForm.module.css';

function CreationForm() {
  const handleSubmit = (e) => {
    e.preventDefault();

    const name = document.getElementById('formName').value;
    const address = document.getElementById('formAddress').value;
    const tel = document.getElementById('formTel').value;
    const zalo = document.getElementById('formZalo').value;
    const mail = document.getElementById('formEmail').value;
    const description = document.getElementById('formDesc').value;

    const formData = new FormData();
    formData.append('name', name);
    formData.append('address', address);
    formData.append('tel', tel);
    formData.append('zalo', zalo);
    formData.append('description', description);
    formData.append('mail', mail);

    branchApi
      .createBranch(formData)
      .then((res) => {
        alert('Tạo chi nhánh thành công');
        window.location.reload();
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className={styles.container}>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="formName">
          <Form.Label>Tên chi nhánh</Form.Label>
          <Form.Control type="text" placeholder="Nhập tên chi nhánh" />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formAddress">
          <Form.Label>Địa chỉ</Form.Label>
          <Form.Control type="text" placeholder="Nhập địa chỉ chi nhánh" />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formTel">
          <Form.Label>Số điện thoại</Form.Label>
          <Form.Control type="text" placeholder="Nhập số điện thoại liên hệ" />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formZalo">
          <Form.Label>Zalo</Form.Label>
          <Form.Control type="text" placeholder="Nhập số điện thoại Zalo" />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formEmail">
          <Form.Label>Email</Form.Label>
          <Form.Control type="text" placeholder="Nhập địa chỉ email" />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formDesc">
          <Form.Label>Mô tả</Form.Label>
          <Form.Control type="text" placeholder="Nhập mô tả chi tiết" />
        </Form.Group>
        <Button variant="success" type="submit">
          Tạo chi nhánh
        </Button>
      </Form>
    </div>
  );
}

export default CreationForm;
