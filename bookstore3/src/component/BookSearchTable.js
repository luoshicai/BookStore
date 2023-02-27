import React, {useState, useEffect, useRef} from "react";
import 'antd/dist/antd.css';
import '../css/BookSearchTable.css'
import {Button, Input, message, Popconfirm, Space, Table, Modal, Form, Image} from 'antd';
import {solrSearch} from "../service/bookService";

const { Search } = Input;


const BookSearchTable = (props) =>{

    const [dataSource, setDataSource] = useState([]);
    useEffect(() => {
        setDataSource(props.data)
    },[props.data])

    //表格数据
    const columns = [
        {
            title: "书号",
            dataIndex: "book_id",
            key: "book_id",
            width: 80,
        },
        {
            title: "书名",
            dataIndex: "name",
            key: "name",
            width: 220,
        },
        {
            title: "作者",
            dataIndex: "author",
            key: "author",
            width: 220,
        },
        {
            title: '简介',
            dataIndex: 'description',
            key: 'description',

        },
    ];

    const callback = (data) =>{
        setDataSource(data);
    }

    const onSearch = (value) =>{
        const data = {index:value};
        solrSearch(data,callback);
        console.log(value)
    }

   return (
       <div>
           <div>
               <Search
                   onSearch={onSearch}
                   placeholder="input search text" enterButton="Search" size="large" />
           </div>
           <Table
               key="book_id"
               dataSource={dataSource}
               columns={columns}
           />
       </div>
   )
}

export default BookSearchTable;
