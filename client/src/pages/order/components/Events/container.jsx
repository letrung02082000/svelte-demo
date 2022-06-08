import React, { useState } from 'react';
import 'react-tabs/style/react-tabs.css';
import { MdAdd, MdClear } from 'react-icons/md';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import styles from './styles.module.css';
import { AdminLayout } from '../../../_layouts';
import { TabContent } from './components';
import { DefaultTab } from '../../_commons';
import { CategoryBar } from '../../../category/components';

function Requirement() {
  const [tabList, setTabList] = useState([]);

  const addTab = () => {
    // setTabList([...tabList, { date: new Date(), data: 'data5', id: '6' }]);
  };

  const removeTab = (index) => {
    let temp = [...tabList];
    temp.splice(index, 1);
    setTabList(temp);
  };

  return (
    <div className={styles.container}>
      <Tabs>
        <TabList>
          <Tab>
            <span>Hôm nay</span>
          </Tab>
          {tabList.map((child, index) => {
            return (
              <Tab>
                {child.date.toLocaleDateString('en-GB')}

                <button
                  className={styles.closeButton}
                  onClick={() => removeTab(index)}
                >
                  <MdClear />
                </button>
              </Tab>
            );
          })}

          <button className={styles.newTabButton} onClick={addTab}>
            <MdAdd />
          </button>
        </TabList>
        <TabPanel>
          <DefaultTab />
        </TabPanel>
        {/* {tabList.map((child, index) => {
          return (
            <TabPanel>
              <TabContent />
            </TabPanel>
          );
        })} */}
      </Tabs>
    </div>
  );
}

export default Requirement;
