import React from 'react';
import styles from './styles.module.css';
import orderApi from 'api/orderApi';
import { ToastWrapper } from 'utils';
import { UploadArea, OrderForm } from './components';

function container(props) {
  const handleSubmitButton = (e) => {
    e.preventDefault();

    const name = document.getElementById('formName').value;
    const tel = document.getElementById('formTel').value;
    const zalo = document.getElementById('formZalo').value;
    const address = document.getElementById('formAddress').value;
    const instruction = document.getElementById('formInstruction').value;
    const note = document.getElementById('formNote').value;
    const documentLink2 = document.getElementById('formLink2').value;
    const cost = document.getElementById('formCost').value;
    const cash = document.getElementById('formCash').value;

    if (!name || !tel) {
      return ToastWrapper(
        'Vui lòng nhập đầy đủ tên và số điện thoại khách hàng',
      );
    }

    if (!instruction || instruction.length === 0) {
      return ToastWrapper('Bạn chưa nhập hướng dẫn in cho nhân viên');
    }

    if (!documentLink2) {
      const isConfirmed = window.confirm(
        'Bạn chưa nhập liên kết đến tài liệu. Bạn có muốn tiếp tục tạo đơn hàng?',
      );

      if (!isConfirmed) {
        return;
      }
    }

    orderApi
      .createOrder({
        name,
        tel,
        zalo,
        address,
        instruction,
        note,
        documentLink2,
        cost,
        cash,
      })
      .then((res) => {
        if (res.data) {
          return ToastWrapper('Tạo đơn hàng thành công!');
        }
      })
      .catch((e) => {
        ToastWrapper(`Lỗi: ${e.toString()}!`);
      });
  };

  return (
    <div className={styles.container}>
      <OrderForm />
      <UploadArea />
    </div>
  );
}

export default container;
