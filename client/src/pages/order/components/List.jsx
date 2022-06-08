import orderApi from 'api/orderApi';
import React, { useEffect, useState } from 'react';

function OrderList() {
  const [orders, setOrders] = useState([]);
  const [page, setPage] = useState(0);
  const [limit, setLimit] = useState(10);

  useEffect(() => {
    orderApi
      .getOrders(page, limit)
      .then((res) => {
        setOrders(res.data);
      })
      .catch((e) => console.log(e));
  }, []);
  return <div></div>;
}

export default OrderList;
