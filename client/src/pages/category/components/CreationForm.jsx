import React, { useState, useEffect } from 'react';
import { Form, Button } from 'react-bootstrap';
import categoryApi from 'api/categoryApi';

function CategoryPage() {
  const handleSubmit = (e) => {
    e.preventDefault();
    const name = document.getElementById('formName').value;
    const description = document.getElementById('formDesc').value;
    let priority = Number(document.getElementById('formPriority').value);

    if (name === '') {
      return alert('Tên thể loại không được để trống');
    }

    if (!Number.isInteger(priority) || priority <= 0) {
      return alert('Độ ưu tiên là 1 số nguyên lớn hơn 0');
    }

    const category = {
      name,
      description,
      priority,
    };

    categoryApi
      .createCategory(category)
      .then((res) => {
        alert('Thêm thể loại thành công');
      })
      .catch((e) => {
        console.log(e);
        alert(e.message);
      });
  };
  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group className="mb-3" controlId="formName">
        <Form.Label>Tên thể loại</Form.Label>
        <Form.Control type="text" placeholder="Nhập tên thể loại" />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formDesc">
        <Form.Label>Mô tả</Form.Label>
        <Form.Control type="text" placeholder="Nhập mô tả thể loại" />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formPriority">
        <Form.Label>Độ ưu tiên</Form.Label>
        <Form.Control type="text" placeholder="Nhập độ ưu tiên lớn hơn 0" />
      </Form.Group>
      <Button variant="success" type="submit">
        Tạo thể loại
      </Button>
    </Form>
  );
}

export default CategoryPage;
