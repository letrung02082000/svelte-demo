import React, { useEffect, useState } from 'react';
import styles from './styles.module.css';
import LeftNavBar from './components/NavBar';
import { Outlet } from 'react-router-dom';
import categoryApi from 'api/categoryApi';
import { updateCategoryList } from '../../../redux/categorySlice';
import { useDispatch } from 'react-redux';
import { Col, Container, Button } from 'react-bootstrap';

function AdminLayoutContainer({ children }) {
  const dispatch = useDispatch();
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    categoryApi
      .getCategories(0, 10)
      .then((res) => {
        dispatch(updateCategoryList(res.data));
      })
      .catch((e) => {
        console.log(e);
      });
  }, []);

  const toggleNavbar = () => {
    setVisible(!visible);
  };

  return (
    <Container fluid className={styles.container}>
      {visible ? (
        <Col className={styles.navBar}>
          <LeftNavBar onToggleClick={toggleNavbar} />
        </Col>
      ) : (
        <button
          onClick={toggleNavbar}
          className="position-fixed bottom-0 start-0 m-2 border border-success border-2 rounded"
        >
          Hiện
        </button>
      )}

      <Col className={styles.content}>
        {children}
        <Outlet />
      </Col>
    </Container>
  );
}

export default AdminLayoutContainer;
