import React, {useState, useEffect, useRef} from "react";
import 'antd/dist/antd.css';
import {Button, Input, message, Popconfirm, Space, Table, Modal, Form,DatePicker} from 'antd';
import Highlighter from 'react-highlight-words';
import { SearchOutlined } from '@ant-design/icons';
import {FilterBookByTime} from "../service/orderService";

const { RangePicker } = DatePicker;

const BookSaleTable = (props) =>{

    const RealData = props.data;
    const [dataSource, setDataSource] = useState([]);
    useEffect(() => {
        setDataSource(props.data)
    },[props.data])

    const [sortedInfo, setSortedInfo] = useState({});

    const columns = [
        {
            title: "书号",
            dataIndex: "book_id",
            key: "book_id",
        },
        {
            title: "书名",
            dataIndex: "book_name",
            key: "book_name",
        },
        {
            title: "销量",
            dataIndex: "number",
            key: "number",
            sorter: (a,b) => a.number - b.number,
            sortOrder: sortedInfo.columnKey === "number" ? sortedInfo.order : null,
            ellipsis: true
        },
    ];

    const handleChange = (pagination, filters, sorter) => {
        console.log('Various parameters', pagination, filters, sorter);
        setSortedInfo(sorter);
    };

    const DateCallback = data => {
        setDataSource(data);
    }
    //时间筛选
    const handleDate = (date,dateString)=>{
        const date1 = dateString[0];
        const date2 = dateString[1];
        if (date1!==""){
            const data = {date1:date1,date2:date2};
            FilterBookByTime(data,DateCallback);
            }
        else{
            setDataSource(RealData);
        }
    }

    return (
        <div>
            <p>销量榜</p>
            <RangePicker onChange={handleDate}/>
            <Table columns={columns} dataSource={dataSource} onChange={handleChange}/>
        </div>
    )
}

export default BookSaleTable;
