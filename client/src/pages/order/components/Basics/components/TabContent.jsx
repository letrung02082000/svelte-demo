import React from 'react';
import { NewTab } from './index';

function TabContent({ data }) {
  if (!data) {
    return <NewTab />;
  }

  return <div>TabContent</div>;
}

export default TabContent;
