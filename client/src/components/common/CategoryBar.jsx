import React, { useEffect, useState } from 'react';
import categoryApi from 'api/categoryApi';

export function CategoryBar({ onChange }) {
  const PAGE = 0;
  const LIMIT = 10;
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    categoryApi
      .getCategories(PAGE, LIMIT)
      .then((res) => {
        res.data.sort((a, b) => a.priority - b.priority);
        setCategories(res.data);
      })
      .catch((e) => console.log(e));
  }, []);

  return (
    <select onChange={(e) => onChange(e.target.value)}>
      {categories.map((child) => {
        return (
          <option key={child._id} value={child._id}>
            {child.name}
          </option>
        );
      })}
    </select>
  );
}
