import React, { useState, useEffect } from 'react';
import categoryApi from 'api/categoryApi';
import CategoryItem from './Item';

function List() {
  const [page, setPage] = useState(0);
  const [limit, setLimit] = useState(10);
  const [categoryList, setCategoryList] = useState([]);

  useEffect(() => {
    categoryApi
      .getCategories()
      .then((res) => {
        setCategoryList(res.data);
        res.data.sort((a, b) => a.priority - b.priority);
        console.log(res.data);
      })
      .catch((e) => {
        console.log(e);
        alert(e.message);
      });
  }, []);

  return (
    <div>
      {categoryList &&
        categoryList.map((child) => {
          return <CategoryItem {...child} />;
        })}
    </div>
  );
}

export default List;
