import React, { useEffect, useState } from 'react';
import Order from '../Order/container';
import { useDispatch, useSelector } from 'react-redux';
import { selectCategoryList } from '../../../../redux/categorySlice';
import api from '../../api';
import { ToastWrapper } from '../../../../utils';
import { CategoryBar } from '../../../category/components';

function OrderList() {
  const categoryList = useSelector(selectCategoryList);
  const [page, setPage] = useState(0);
  const [limit, setLimit] = useState(10);
  const [orderList, setOrderList] = useState([]);

  useEffect(() => {
    let today = new Date();
    today.setHours(0, 0, 0, 0);
    let nextDay = new Date();
    nextDay.setDate(nextDay.getDate() + 1);
    nextDay.setHours(0, 0, 0, 0);

    api
      .searchOrders(page, limit, {
        category: categoryList.selected._id,
        createdAt: { $gte: today, $lt: nextDay },
      })
      .then((res) => {
        console.log(res);
        if (res.data) {
          setOrderList(res.data);
        }
      })
      .catch((e) => {
        return ToastWrapper(e.toString());
      });
  }, []);

  return (
    <>
      {orderList.map((child) => {
        return <Order data={child} key={child._id} />;
      })}
    </>
  );
}

export default OrderList;
