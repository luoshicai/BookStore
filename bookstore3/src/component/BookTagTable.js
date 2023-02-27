import React, {useState, useEffect, useRef} from "react";
import 'antd/dist/antd.css';
import {Button, Input, message, Popconfirm, Space, Table, Modal, Form, Image, Select} from 'antd';
import Highlighter from 'react-highlight-words';
import { SearchOutlined } from '@ant-design/icons';
import {FindBookByTag} from "../service/bookService";
const BookTagTable = (props) =>{
    let data = props.data;
    const [dataSource, setDataSource] = useState([]);
    useEffect(() => {
        setDataSource(props.data)
    },[props.data])

    //列数据
    const defaultColumns = [
        {
            title: '书号',
            dataIndex: 'book_id',
            key: 'book_id',
        },
        {
            title: '图片',
            dataIndex: 'imag',
            key: 'imag',
            render: (_, record) =>
                dataSource.length >= 1 ? (
                    <Image src={record.imag} width={100}/>
                ) : null
        },
        {
            title: '书名',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: '作者',
            dataIndex: 'author',
            key: 'author',
        },
        {
            title: '单价',
            dataIndex: 'price',
            key: 'price',
        },
        {
            title: '简介',
            dataIndex: 'description',
            key: 'description',
            ellipsis: true,
        },
        {
            title: '库存',
            dataIndex: 'inventory',
            key: 'inventory',
        },
    ];

    const callback = (data) =>{
        setDataSource(data.data);
    }

    const onChange = (value) => {
        const data = {category:value};
        FindBookByTag(data,callback);
    };

    return (
        <div>
            <div>
                <Select
                    showSearch
                    placeholder="选择书籍类别"
                    optionFilterProp="children"
                    onChange={onChange}
                    // onSearch={onSearch}
                    filterOption={(input, option) =>
                        (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
                    }
                    options={[
                        {
                            value: '文学小说',
                            label: '文学小说',
                        },
                        {
                            value: '获奖作品',
                            label: '获奖作品',
                        },
                        {
                            value: '社科励志',
                            label: '社科励志',
                        },
                        {
                            value: '幼儿启蒙',
                            label: '幼儿启蒙',
                        },
                        {
                            value: '教辅工具',
                            label: '教辅工具',
                        },
                        {
                            value: '获奖文学',
                            label: '获奖文学',
                        },
                        {
                            value: '童年经典',
                            label: '童年经典',
                        },
                        {
                            value: '必看书目',
                            label: '必看书目',
                        },
                    ]}
                />
            </div>
            <Table
                key="book_id"
                dataSource={dataSource}
                columns={defaultColumns}
            />
        </div>
    );
}

export default BookTagTable;
