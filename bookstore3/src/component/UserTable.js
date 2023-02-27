import React, {useState, useEffect, useRef} from "react";
import 'antd/dist/antd.css';
import {Button, Input, message, Popconfirm, Space, Table, Modal, Form} from 'antd';
import Highlighter from 'react-highlight-words';
import { SearchOutlined } from '@ant-design/icons';
import {changeIdentity, rootUsers} from "../service/userService";

const UserTable = (props) =>{

    let data = props.data;
    const [dataSource, setDataSource] = useState([]);
    useEffect(() => {
        setDataSource(props.data)
    },[props.data])

    const rootUserCallback = data =>{
        setDataSource(data);
    }
    const identityCallback = data =>{
        message.success("该用户已被封禁");
        rootUsers("",rootUserCallback);
    }
    //封禁账号
    const handleBlock = (userId) =>{
        const data = {id:userId,identity:0};
        changeIdentity(data,identityCallback);
    }

    const identityCallback1 = data =>{
        message.success("解封成功");
        rootUsers("",rootUserCallback);
    }
    //解封账号
    const handleUnBlock = (userId) => {
        const data = {id:userId,identity:1};
        changeIdentity(data,identityCallback1);
    }

    const columns = [
        {
            title: "用户ID",
            dataIndex: "user_id",
            key: "user_id",
        },
        {
            title: "用户名",
            dataIndex: "userName",
            key: "userName",
        },
        {
            title: "密码",
            dataIndex: "password",
            key: "password",
        },
        {
            title: "身份",
            dataIndex: "Stridentity",
            render: (_, record) =>
                (record.identity ===0) ? (
                    <p>账号封禁中</p>
                ) : ((record.identity===1) ? (
                    <p>普通用户</p>
                ) : (<p>管理员</p>))

        },
        {
            title: "操作",
            dataIndex: "operation",
            render: (_, record) =>
                (dataSource.length)&&(record.identity!==2) >= 1 ? (
                    <Space size="middle">
                        <Popconfirm title="确定封禁该用户吗?" onConfirm={() => handleBlock(record.user_id)}>
                            <a>封禁</a>
                        </Popconfirm>
                        <Popconfirm title="确定解封该用户吗?" onConfirm={() => handleUnBlock(record.user_id)}>
                            <a>解封</a>
                        </Popconfirm>
                    </Space>
                ) : null,
        }
    ];


    return(
        <div>
            <Table
                key="user_id"
                dataSource={dataSource}
                columns={columns}
            />
        </div>
    )
}

export default UserTable;
