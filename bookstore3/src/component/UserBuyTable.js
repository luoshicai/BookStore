import React, {useState, useEffect, useRef} from "react";
import 'antd/dist/antd.css';
import {Button, Input, message, Popconfirm, Space, Table, Modal, Form, DatePicker} from 'antd';
import Highlighter from 'react-highlight-words';
import { SearchOutlined } from '@ant-design/icons';
import {FilterTime} from "../service/orderService";

const { RangePicker } = DatePicker;

const UserBuyTable = (props) => {
    const RealData = props.data;
    const [dataSource, setDataSource] = useState([]);
    useEffect(() => {
        setDataSource(props.data)
    },[props.data])

    const [sortedInfo, setSortedInfo] = useState({});

    const columns =[
        {
            title: "用户ID",
            dataIndex: "user_id",
            key: "user_id",
        },
        {
            title: "用户名",
            dataIndex: "user_name",
            key: "user_name",
        },
        {
            title: "消费",
            dataIndex: "consumption",
            key: "consumption",
            sorter: (a,b) => a.consumption - b.consumption,
            sortOrder: sortedInfo.columnKey === "consumption" ? sortedInfo.order : null,
            ellipsis: true
        }
    ];

    const handleChange = (pagination, filters, sorter) => {
        console.log('Various parameters', pagination, filters, sorter);
        setSortedInfo(sorter);
    };

    const callback = data => {
        setDataSource(data);
    }
    //时间筛选
    const handleDate = (date,dateString)=>{
        const date1 = dateString[0];
        const date2 = dateString[1];
        if (dateString[0]!==""){
            const data = {date1:date1,date2:date2};
            FilterTime(data, callback);
        }
        else{
            setDataSource(RealData);
        }
    }

    return (
        <div>
            <p>消费榜</p>
            <RangePicker onChange={handleDate}/>
            <Table columns={columns} dataSource={dataSource} onChange={handleChange}/>
        </div>
    )
}

export default UserBuyTable;
