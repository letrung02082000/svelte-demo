import React from 'react';
import styles from './styles.module.css';

function Order({ data }) {
  return (
    <div className={styles.container}>
      <div className={styles.orderContainer}>
        <p>
          Tài liệu tải lên:{' '}
          {data.documentLink1 ? (
            <a href={data.documentLink1}>Link drive</a>
          ) : (
            'Không có'
          )}
        </p>

        <p>
          Liên kết tài liệu:{' '}
          {data.documentLink2 ? (
            <a
              href={data.documentLink2}
              target='_blank'
              rel='noopenner noreferer'
            >
              Link drive
            </a>
          ) : (
            'Không có'
          )}
        </p>

        <p>Hướng dẫn in: {data?.instruction}</p>
        <p>Ghi chú: {data?.note}</p>
      </div>
      <div className={styles.infoContainer}>
        <p>Khách hàng: {data?.name}</p>
        <p>SĐT: {data?.tel}</p>
        <p>
          Zalo:{' '}
          {data.zalo ? (
            <a
              href={`https://zalo.me/${data.zalo}`}
              target='_blank'
              rel='noopenner noreferer'
            >
              {data?.zalo}
            </a>
          ) : (
            'Không có'
          )}
        </p>

        <p>Địa chỉ giao hàng: {data.address || 'Không có'}</p>
      </div>
    </div>
  );
}

export default Order;
