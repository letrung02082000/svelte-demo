import React, { useEffect, useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import orderApi from 'api/orderApi';
import categoryApi from 'api/categoryApi';
import axiosClient from 'api/axiosClient';

function CreationForm() {
  const [categories, setCategories] = useState([]);
  const [documentId, setDocumentId] = useState(null);
  const [fileName, setFileName] = useState('');
  const [uploadPercent, setUploadPercent] = useState(0);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    const MAX_CATEGORY_PAGE = 0;
    const MAX_CATEGORY_LIMIT = 10;
    categoryApi
      .getCategories(MAX_CATEGORY_PAGE, MAX_CATEGORY_LIMIT)
      .then((res) => {
        setCategories(res.data.sort((a, b) => a.priority - b.priority));
      });
  }, []);

  const uploadFile = (e) => {
    const file = e.target.files[0];

    if (file.size > 52428800) {
      alert('Kích thước tệp không được vượt quá 50MB');
      document.getElementById('formFile').value = null;
      return;
    }
    setFileName(file.name);
    setUploading(true);
    const formData = new FormData();
    formData.append('document', file);

    axiosClient
      .post('/orders/upload', formData, {
        onUploadProgress: (progressEvent) => {
          const percent = parseInt(
            (progressEvent.loaded / progressEvent.total) * 100,
          );
          setUploadPercent(percent / 2);

          if (percent == 100) {
            setTimeout(() => {
              setUploadPercent(75);
            }, 1500);
          }
        },
      })
      .then((res) => {
        setDocumentId(res.data.documentId);
        setUploadPercent(100);
        setUploading(false);
      })
      .catch((err) => {
        setUploading(false);
        alert(err.toString());
      });
  };

  const clearFile = () => {
    document.getElementById('formFile').value = null;
    setDocumentId(null);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const category = document.getElementById('formCategory').value;
    const name = document.getElementById('formName').value;
    const tel = document.getElementById('formTel').value;
    const zalo = document.getElementById('formZalo').value;
    const address = document.getElementById('formAddress').value;
    const note = document.getElementById('formNote').value;
    const instruction = document.getElementById('formInstruction').value;
    const documentLink = document.getElementById('formDocumentLink')?.value;

    if (!documentId && !documentLink) {
      console.log(documentLink);
      alert('Vui lòng tải lên tệp đính kèm hoặc nhập link tài liệu');
      return;
    }

    if (!category || !name || !tel) {
      alert('Vui lòng nhập đầy đủ thông tin');
      return;
    }

    if (!instruction) {
      alert('Vui lòng nhập hướng dẫn in cho nhân viên');
      return;
    }

    const order = {
      category,
      name,
      tel,
      zalo,
      address,
      note,
      instruction,
    };

    if (uploading) {
      alert('Vui lòng chờ đợi khi đang tải lên tệp đính kèm');
      return;
    }

    if (documentId) {
      order['document'] = `https://drive.google.com/file/d/${documentId}`;
    } else {
      order['document'] = documentLink;
    }

    orderApi
      .createOrder(order)
      .then((res) => {
        alert('Tạo đơn hàng thành công');
        return;
      })
      .catch((e) => {
        console.log(e);
        alert(e.message);
      });
  };

  return (
    <div>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="formFile" onChange={uploadFile}>
          <Form.Label>Tải tệp lên</Form.Label>

          <Form.Control type="file" />
        </Form.Group>
        <Form.Group>
          {uploading ? (
            <Form.Text>Đang tải tệp lên... {uploadPercent}%</Form.Text>
          ) : null}
        </Form.Group>
        <Button variant="success" className="mt-1 mb-3" onClick={clearFile}>
          Xóa tệp
        </Button>
        {!documentId ? (
          <Form.Group className="mb-3" controlId="formDocumentLink">
            <Form.Label>Hoặc nhập liên kết đến tài liệu</Form.Label>
            <Form.Control
              type="text"
              placeholder="Nhập liên kết đến tài liệu"
            />
          </Form.Group>
        ) : null}
        <Form.Group className="mb-3" controlId="formCategory">
          <Form.Label>Thể loại</Form.Label>
          <Form.Select>
            {categories.map((category) => {
              return (
                <option key={category._id} value={category._id}>
                  {category.name}
                </option>
              );
            })}
          </Form.Select>
        </Form.Group>
        <Form.Group className="mb-3" controlId="formInstruction">
          <Form.Label>Hướng dẫn in</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            placeholder="Nhập hướng dẫn in cho nhân viên"
          />
        </Form.Group>

        {/* <Form.Text>Thông tin khách hàng</Form.Text> */}
        <Form.Group className="mb-3" controlId="formName">
          <Form.Label>Tên khách hàng</Form.Label>
          <Form.Control
            type="text"
            placeholder="Nhập họ tên đầy đủ của khách hàng"
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formTel">
          <Form.Label>Số điện thoại</Form.Label>
          <Form.Control type="text" placeholder="Nhập số điện thoại" />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formZalo">
          <Form.Label>Zalo (nếu có)</Form.Label>
          <Form.Control type="text" placeholder="Nhập số điện thoại Zalo" />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formAddress">
          <Form.Label>Địa chỉ giao hàng</Form.Label>
          <Form.Control
            type="text"
            placeholder="Bỏ trống nếu nhận tại cửa hàng"
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formNote">
          <Form.Label>Ghi chú (nếu có)</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            placeholder="Nhập ghi chú cho đơn hàng"
          />
        </Form.Group>
        <Button className="mt-1 mb-5" variant="success" type="submit">
          Tạo đơn hàng
        </Button>
      </Form>
    </div>
  );
}

export default CreationForm;
