import React, { useState, useEffect } from 'react';
import { Form, Button } from 'react-bootstrap';
import categoryApi from 'api/categoryApi';

function CategoryPage(props) {
  const handleSubmit = (e) => {
    e.preventDefault();
    const name = document.getElementById('formName' + props._id).value;
    const description = document.getElementById('formDesc' + props._id).value;
    let priority = Number(
      document.getElementById('formPriority' + props._id).value,
    );

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
      .updateCategory(props._id, category)
      .then((res) => {
        alert('Cập nhật thể loại thành công');
      })
      .catch((e) => {
        console.log(e);
        alert(e.message);
      });
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group className="mb-3" controlId={'formName' + props._id}>
        <Form.Label>Tên thể loại</Form.Label>
        <Form.Control
          type="text"
          placeholder="Nhập tên thể loại"
          defaultValue={props?.name}
        />
      </Form.Group>
      <Form.Group className="mb-3" controlId={'formDesc' + props._id}>
        <Form.Label>Mô tả</Form.Label>
        <Form.Control
          type="text"
          placeholder="Nhập mô tả thể loại"
          defaultValue={props?.description}
        />
      </Form.Group>
      <Form.Group className="mb-3" controlId={'formPriority' + props._id}>
        <Form.Label>Độ ưu tiên</Form.Label>
        <Form.Control
          type="text"
          placeholder="Nhập độ ưu tiên lớn hơn 0"
          defaultValue={props?.priority}
        />
      </Form.Group>
      <Button className="mt-1 mb-5" variant="success" type="submit">
        Cập nhật thể loại
      </Button>
    </Form>
  );
}

export default CategoryPage;
