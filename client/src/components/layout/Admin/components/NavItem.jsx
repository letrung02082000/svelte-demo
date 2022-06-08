import React from 'react';
import styles from './navItem.module.css';
import { useNavigate } from 'react-router-dom';
import { Button } from 'react-bootstrap';

function NavItem({ children, path, category }) {
  const navigate = useNavigate();

  const handleTabClick = () => {
    navigate(path);
  };

  return (
    <Button
      variant="success"
      onClick={handleTabClick}
      className={styles.navItem}
    >
      <span>{children}</span>
    </Button>
  );
}

export default NavItem;
