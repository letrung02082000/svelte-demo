import React from 'react';

export function Loading() {
  return (
    <>
      <img alt="Loading" src="/loading.gif" style={{ width: '100%' }} />
      <p style={{ backgroundColor: '#F5F5FA', textAlign: 'center' }}>
        Đang tải dữ liệu...
      </p>
    </>
  );
}
