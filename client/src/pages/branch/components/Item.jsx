import React, { useState } from 'react';
import styles from './item.module.css';
import branchApi from 'api/branchApi';
import { Button, Col, Container, Form, Row } from 'react-bootstrap';

function Branch({ data }) {
  const updateBranch = (e) => {
    e.preventDefault();

    const name = document.getElementById('formName' + data._id).value;
    const address = document.getElementById('formAddress' + data._id).value;
    const tel = document.getElementById('formTel' + data._id).value;
    const zalo = document.getElementById('formZalo' + data._id).value;
    const mail = document.getElementById('formEmail' + data._id).value;
    const description = document.getElementById('formDesc' + data._id).value;

    const formData = new FormData();
    formData.append('name', name);
    formData.append('address', address);
    formData.append('tel', tel);
    formData.append('zalo', zalo);
    formData.append('description', description);
    formData.append('mail', mail);

    branchApi
      .updateBranch(data._id, formData)
      .then((res) => {
        return alert('Cập nhật thành công');
      })
      .catch((e) => {
        alert(e.message);
        console.log(e.message);
      });
  };

  return (
    <Form className={styles.formContainer} onSubmit={updateBranch}>
      <Form.Group className="mb-3" controlId={'formName' + data._id}>
        <Row>
          <Col md={2}>
            <Form.Label>Tên chi nhánh</Form.Label>
          </Col>
          <Col md={10}>
            <Form.Control
              type="text"
              placeholder="Nhập tên chi nhánh"
              defaultValue={data?.name}
              name="name"
            />
          </Col>
        </Row>
      </Form.Group>
      <Form.Group className="mb-3" controlId={'formAddress' + data._id}>
        <Row>
          <Col md={2}>
            <Form.Label>Địa chỉ</Form.Label>
          </Col>
          <Col md={10}>
            <Form.Control
              type="text"
              placeholder="Nhập địa chỉ chi nhánh"
              defaultValue={data?.address}
              name="address"
            />
          </Col>
        </Row>
      </Form.Group>
      <Form.Group className="mb-3" controlId={'formTel' + data._id}>
        <Row>
          <Col md={2}>
            <Form.Label>Số điện thoại</Form.Label>
          </Col>
          <Col md={10}>
            <Form.Control
              type="text"
              placeholder="Nhập số điện thoại liên hệ"
              defaultValue={data?.tel}
              name="tel"
            />
          </Col>
        </Row>
      </Form.Group>
      <Form.Group className="mb-3" controlId={'formZalo' + data._id}>
        <Row>
          <Col md={2}>
            <Form.Label>Zalo</Form.Label>
          </Col>
          <Col md={10}>
            <Form.Control
              type="text"
              placeholder="Nhập số điện thoại Zalo"
              defaultValue={data?.zalo}
              name="zalo"
            />
          </Col>
        </Row>
      </Form.Group>
      <Form.Group className="mb-3" controlId={'formEmail' + data._id}>
        <Row>
          <Col md={2}>
            <Form.Label>Email</Form.Label>
          </Col>
          <Col md={10}>
            <Form.Control
              type="text"
              placeholder="Nhập địa chỉ email"
              defaultValue={data?.mail}
              name="mail"
            />
          </Col>
        </Row>
      </Form.Group>
      <Form.Group className="mb-3" controlId={'formDesc' + data._id}>
        <Row>
          <Col md={2}>
            <Form.Label>Mô tả</Form.Label>
          </Col>
          <Col md={10}>
            <Form.Control
              type="text"
              placeholder="Nhập mô tả chi tiết"
              defaultValue={data?.description}
              name="description"
            />
          </Col>
        </Row>
      </Form.Group>
      <Container className="d-flex justify-content-center">
        <Button className="mt-0 mb-5" variant="success" type="submit">
          Cập nhật thông tin
        </Button>
      </Container>
    </Form>
  );
}

export default Branch;
