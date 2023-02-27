import React, {useState, useEffect, useRef, Children} from "react";
import 'antd/dist/antd.css';
import {Button, Input, message, Popconfirm, Space, Table, Modal, Form, DatePicker, Image} from 'antd';
import Highlighter from 'react-highlight-words';
import { SearchOutlined } from '@ant-design/icons';
import {FilterAllOrderByTime, FilterBookByTime, GetOrderDetails} from "../service/orderService";
const { RangePicker } = DatePicker;
const OrderTable = (props) => {

    //总父数据
    const [parentData, setParentData] = useState([]);
    const RealData = props.data;
    useEffect(() => {
        setParentData(props.data)
    },[props.data]);


    //子表格
    const ChildrenColunms = [
        {
            title: '图片',
            dataIndex: 'bookImg',
            render: (_, record) =>
                (
                    <Image src={record.bookImg} width={100}/>
                )
        },
        {
            title : "书名",
            dataIndex : "bookName",
            key : "bookName",
        },
        {
            title: "作者",
            dataIndex: "bookAuthor",
            key: "bookAuthor",
        },
        {
            title: "价格",
            dataIndex: "bookPrice",
            key: "bookPrice",
        },
        {
            title: "数量",
            dataIndex: "bookNum",
            key: "bookNum",
        }
    ];

    //父表格
    const parentColunms = [
        {
            title: "订单号",
            dataIndex: "order_id",
            key: "order_id",
        },
        {
            title: "订单所属用户",
            dataIndex: "order_user",
            key: "order_user",
        },
        {
            title: "订单日期",
            dataIndex: "order_date",
            key:  "order_date",
        },
        {
            title: "订单价格",
            dataIndex: "order_price",
            key: "order_price",
        },
        {
            title: "订单状态",
            dataIndex: "order_state",
            key: "order_state",
        },
        {
            title: "操作",
            dataIndex: "action",
            render: (_, record) =>
                parentData.length>=1 ? (
                    <a onClick={() => SeeDetail(record.order_id)}>查看订单详情</a>
                ) : null
        }
    ];

    //查看数据详情
    const [state, setState] = useState({visible:false,data:[]});
    const [visible, setVisible] = useState({visible:false});

    const callback = data =>{
        setState({...state,data:data});
        setVisible({...state,visible: true});
    }
    const SeeDetail = (orderId) => {
        const data = {orderId:orderId};
        GetOrderDetails(data, callback);
    }

    const closeModal = () =>{
        setVisible({...state,visible: false});
    }

    //时间筛选
    const DateCallback = data =>{
        console.log(data);
        setParentData(data);
    }

    const handleDate = (date,dateString)=>{
        const date1 = dateString[0];
        const date2 = dateString[1];
        if (date1!==""){
            const data = {date1:date1,date2:date2};
            FilterAllOrderByTime(data,DateCallback);
        }
        else{
            setParentData(RealData);
        }
    }


    return(
        <div>
            <RangePicker onChange={handleDate}/>
            <Modal title="查看订单详情" visible={visible.visible} onCancel={() => closeModal()} onOk={() => closeModal()} width={1000}>
                <Table columns={ChildrenColunms}
                       dataSource={state.data}/>
            </Modal>
            <Table
                columns={parentColunms}
                dataSource={parentData}
                />
        </div>
    )
}

export default OrderTable;
