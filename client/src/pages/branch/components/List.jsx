import React, { useState, useEffect } from 'react';
import branchApi from 'api/branchApi';
import BranchItem from './Item';

function BranchList() {
  const [page, setPage] = useState(0);
  const [limit, setLimit] = useState(10);
  const [branchList, setBranchList] = useState([]);

  console.log(branchList);

  useEffect(() => {
    branchApi
      .getBranchs(page, limit)
      .then((res) => setBranchList(res.data))
      .catch((err) => console.log(err));
  }, []);

  return (
    <div>
      {branchList &&
        branchList.map((child) => {
          return <BranchItem data={child} key={child._id} />;
        })}
    </div>
  );
}

export default BranchList;
