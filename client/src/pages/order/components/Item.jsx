import React from 'react';

function Order({ createdAt }) {
  const createdDate = new Date(createdAt);
  return (
    <div>
      <div>{createdDate.toLocaleDateString('en-GB')}</div>
    </div>
  );
}

export default Order;
