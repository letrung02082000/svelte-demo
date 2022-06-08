import React, { useState } from 'react';
import styles from './styles.module.css';
import { selectCategoryList } from 'redux/categorySlice';
import { useSelector } from 'react-redux';
import orderApi from 'api/orderApi';
import { ToastWrapper } from 'utils';

function OrderForm() {
  const categoryList = useSelector(selectCategoryList);
  const orderInfo = localStorage.getItem('order');
  const [order, setOrder] = useState(JSON.parse(orderInfo) || {});

  const handleOrderChange = (e) => {
    const temp = { ...order, [e.target.name]: e.target.value };

    setOrder(temp);
    localStorage.setItem('order', JSON.stringify(temp));
  };

  const createOrder = () => {
    let body = {
      name: '',
      tel: '',
      zalo: '',
      cost: 0,
      cash: 0,
      address: '',
      instruction: '',
      note: '',
      documentLink2: '',
    };
    const temp = localStorage.getItem('order');
    body = { ...body, ...JSON.parse(temp) };

    orderApi.createOrder(body).then((res) => {
      if (res.data) {
        return ToastWrapper('Tạo đơn hàng thành công');
      }
    });
  };

  return (
    <div className={styles.orderForm}>
      <div className={styles.formGroup}>
        <label className={styles.formLabel}>Tên khách hàng*</label>
        <input
          className={styles.formInput}
          name="name"
          type="text"
          defaultValue={order.name || ''}
          placeholder="Nhập đầy đủ họ tên, có dấu"
          onChange={handleOrderChange}
        />
      </div>

      <div className={styles.formGroup}>
        <label className={styles.formLabel}>Điện thoại liên hệ*</label>
        <input
          className={styles.formInput}
          name="tel"
          type="text"
          defaultValue={order.tel || ''}
          placeholder="Nhập số điện thoại liên hệ của bạn"
          onChange={handleOrderChange}
        />
      </div>
      <div className={styles.formGroup}>
        <label className={styles.formLabel}>
          Số điện thoại Zalo (Không bắt buộc)
        </label>
        <input
          className={styles.formInput}
          name="zalo"
          type="text"
          defaultValue={order.zalo || ''}
          placeholder="Nhập số điện thoại zalo của bạn"
          onChange={handleOrderChange}
        />
      </div>
      <div className={styles.formGroup}>
        <label className={styles.formLabel}>Thể loại</label>
        <select
          name="category"
          onChange={handleOrderChange}
          value={order.category}
        >
          {categoryList.data?.map((category) => {
            return (
              <option value={category._id} key={category._id}>
                {category.name}
              </option>
            );
          })}
        </select>
      </div>
      <div className={styles.formGroup}>
        <label className={styles.formLabel}>Thành tiền</label>
        <input
          className={styles.formInput}
          name="cost"
          type="text"
          defaultValue={order.cost || 0}
          placeholder="Nhập chi phí dự kiến"
          onChange={handleOrderChange}
        />
      </div>
      <div className={styles.formGroup}>
        <label className={styles.formLabel}>Đã trả</label>
        <input
          className={styles.formInput}
          name="cash"
          type="text"
          placeholder="Nhập số tiền đã trả"
          defaultValue={order.cash || 0}
          onChange={handleOrderChange}
        />
      </div>
      <div className={styles.formGroup}>
        <label className={styles.formLabel}>
          Địa chỉ giao hàng (Không bắt buộc)
        </label>
        <input
          className={styles.formInput}
          type="text"
          name="address"
          defaultValue={order.address || ''}
          placeholder="Bỏ trống nếu lấy tại cửa hàng"
          onChange={handleOrderChange}
        />
      </div>
      <div className={styles.formGroup}>
        <label className={styles.formLabel}>Hướng dẫn in*</label>
        <textarea
          className={styles.formInput}
          name="instruction"
          defaultValue={order.instruction || ''}
          rows="5"
          placeholder="Nhập hướng dẫn in cho nhân viên: số trang cần in, loại giấy in, khổ in,... Bạn có
            cần xác nhận trước khi in không?"
          onChange={handleOrderChange}
        />
      </div>
      <div className={styles.formGroup}>
        <label className={styles.formLabel}>Biên lai (Không bắt buộc)</label>
        <label className={styles.formUploadButton}>
          <input className={styles.formInput} type="file" name="receipt" />
          Tải ảnh lên
        </label>
      </div>
      <div className={styles.formGroup}>
        <label className={styles.formLabel}>Ghi chú (Không bắt buộc)</label>
        <input
          className={styles.formInput}
          name="note"
          defaultValue={order.note || ''}
          type="text"
          placeholder="Nhập ghi chú"
          onChange={handleOrderChange}
        />
      </div>

      <button className={styles.formSubmitButton} onClick={createOrder}>
        Tạo đơn hàng
      </button>
    </div>
  );
}

export default OrderForm;
