import React from 'react';
import styles from './styles.module.css';

function MainLayout({ children }) {
  return (
    <div>
      <p>header</p>
      {children}
    </div>
  );
}

export default MainLayout;
