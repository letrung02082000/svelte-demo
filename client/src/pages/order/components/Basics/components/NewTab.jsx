import React, { useState } from 'react';
import { CategoryBar } from '../../../../category/components';
import styles from './newTab.module.css';

function NewTab(props) {
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <CategoryBar />
      </div>
      <div className={styles.queryOrder}></div>
    </div>
  );
}

export default NewTab;
