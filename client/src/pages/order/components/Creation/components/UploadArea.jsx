import React from 'react';
import styles from './styles.module.css';

function UploadArea() {
  let temp = localStorage.getItem('order');
  if (temp) {
    temp = JSON.parse(temp);
  } else {
    temp = {};
  }

  const handleLink2Change = (e) => {
    temp.documentLink2 = e.target.value;
    localStorage.setItem('order', JSON.stringify(temp));
  };

  const handleClearLink2 = () => {
    document.getElementById('formLink2').value = null;
    temp.documentLink2 = null;
    localStorage.setItem('order', JSON.stringify(temp));
  };

  return (
    <div className={styles.uploadArea}>
      <div className={styles.uploadContainer}>
        <div className={styles.formGroup}>
          <label className={styles.formUploadButton}>
            <input
              className={styles.formInput}
              type='file'
              id='document'
              name='document'
            />
            <img src='/photocopy/uploadicon.png' />
            <span>Tải tệp lên</span>
          </label>
          <button type='button' className={styles.button}>
            Xóa tệp
          </button>
        </div>

        <div
          className={styles.formGroup}
          style={{ alignItems: 'center', margin: '1rem 0', width: '100%' }}
        >
          <label>Hoặc</label>
          <input
            id='formLink2'
            type='text'
            placeholder='Nhập đường dẫn liên kết đến tài liệu'
            className={styles.formInput}
            onChange={handleLink2Change}
            defaultValue={temp.documentLink2}
          />
          <button
            type='button'
            className={styles.button}
            onClick={handleClearLink2}
          >
            Xóa liên kết
          </button>
        </div>
      </div>
    </div>
  );
}

export default UploadArea;
