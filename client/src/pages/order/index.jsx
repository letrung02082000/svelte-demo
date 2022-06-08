import React from 'react';
import { CategoryBar } from 'components/common';
import OrderList from './components/List';
import { Container } from 'react-bootstrap';

function OrderPage() {
  const [selectCategory, setSelectCategory] = React.useState(null);

  return (
    <Container>
      <Container className="d-flex justify-content-center">
        <CategoryBar onChange={(value) => setSelectCategory(value)} />
      </Container>
      <OrderList />
    </Container>
  );
}

export default OrderPage;
