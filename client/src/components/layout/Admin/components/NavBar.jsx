import React from 'react';
import styles from './navBar.module.css';
import NavItem from './NavItem';
import { Button, Container } from 'react-bootstrap';

function LeftNavBar({ onToggleClick }) {
  return (
    <Container className={styles.container}>
      <span className="text-center text-uppercase font-weight-bold my-3">
        In ấn thời đại
      </span>
      <NavItem path={'/admin/order'}>Quản lý đơn hàng</NavItem>
      <NavItem path={'/admin/creation'}>Tạo đơn hàng</NavItem>
      <NavItem path={'/admin/branch'}>Quản lý chi nhánh</NavItem>
      <NavItem path={'/admin/category'}>Quản lý thể loại</NavItem>
      <Button
        variant="success"
        className={styles.hideButton}
        onClick={onToggleClick}
      >
        Ẩn
      </Button>
    </Container>
  );
}

export default LeftNavBar;
