import React from 'react';
import { Tabs } from 'antd';
import { Checkbox } from "antd";

const { TabPane } = Tabs;

function callback(key) {
  console.log(key);
}

function TabsCollage(props) {
    // props.list.map((value, index) => (
    //     <React.Fragment key={index}>
    //       <Checkbox
    //         onChange={() => handleToggle(value._id)}
    //         checked={Checked.indexOf(value._id) === -1 ? false : true}
    //       />
    //       <span>{value.name}</span>
    //     </React.Fragment>
    //   ));
    // return (
    //     <Tabs onChange={callback} type="card">
    //     <TabPane tab="Tab 1" key="1">
    //         Content of Tab Pane 1
    //     </TabPane>
    //     <TabPane tab="Tab 2" key="2">
    //         Content of Tab Pane 2
    //     </TabPane>
    //     <TabPane tab="Tab 3" key="3">
    //         Content of Tab Pane 3
    //     </TabPane>
    //     </Tabs>
    //     //mountNode
    // )
}

export default TabsCollage