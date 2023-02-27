import React, {useState, useEffect, useRef} from "react";
import 'antd/dist/antd.css';
import {Button, Input, message, Popconfirm, Space, Table, Modal, Form, Image} from 'antd';
import Highlighter from 'react-highlight-words';
import { SearchOutlined } from '@ant-design/icons';
import {addBook, ChangeBook, DeleteById} from "../service/bookService";
const BookTable = (props) =>{
    let data = props.data;
    const [dataSource, setDataSource] = useState([]);
    useEffect(() => {
        setDataSource(props.data)
    },[props.data])

    const DeleteCallback = data =>{
        message.success("删除成功");
    }
    const handleDelete = (book_id) =>{
        const newData = dataSource.filter((item) => item.book_id !== book_id);
        setDataSource(newData);
        const data = {id:book_id};
        DeleteById(data,DeleteCallback);
    }

    //查找操作
    const [searchText, setSearchText] = useState('');
    const [searchedColumn, setSearchedColumn] = useState('');
    const searchInput = useRef(null);

    const handleSearch = (selectedKeys, confirm, dataIndex) => {
        confirm();
        setSearchText(selectedKeys[0]);
        setSearchedColumn(dataIndex);
    };

    const handleReset = (clearFilters) => {
        clearFilters();
        setSearchText('');
    };

    const getColumnSearchProps = (dataIndex) => ({
        filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
            <div
                style={{
                    padding: 8,
                }}
            >
                <Input
                    ref={searchInput}
                    placeholder={`Search ${dataIndex}`}
                    value={selectedKeys[0]}
                    onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
                    onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
                    style={{
                        marginBottom: 8,
                        display: 'block',
                    }}
                />
                <Space>
                    <Button
                        type="primary"
                        onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
                        icon={<SearchOutlined />}
                        size="small"
                        style={{
                            width: 90,
                        }}
                    >
                        Search
                    </Button>
                    <Button
                        onClick={() => clearFilters && handleReset(clearFilters)}
                        size="small"
                        style={{
                            width: 90,
                        }}
                    >
                        Reset
                    </Button>
                    <Button
                        type="link"
                        size="small"
                        onClick={() => {
                            confirm({
                                closeDropdown: false,
                            });
                            setSearchText(selectedKeys[0]);
                            setSearchedColumn(dataIndex);
                        }}
                    >
                        Filter
                    </Button>
                </Space>
            </div>
        ),
        filterIcon: (filtered) => (
            <SearchOutlined
                style={{
                    color: filtered ? '#1890ff' : undefined,
                }}
            />
        ),
        onFilter: (value, record) =>
            record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
        onFilterDropdownVisibleChange: (visible) => {
            if (visible) {
                setTimeout(() => searchInput.current?.select(), 100);
            }
        },
        render: (text) =>
            searchedColumn === dataIndex ? (
                <Highlighter
                    highlightStyle={{
                        backgroundColor: '#ffc069',
                        padding: 0,
                    }}
                    searchWords={[searchText]}
                    autoEscape
                    textToHighlight={text ? text.toString() : ''}
                />
            ) : (
                text
            ),
    });

    //修改操作
    const handleChange = (record) => {
        let changeBookId = record.book_id;
        localStorage.setItem("changeBookId", changeBookId);
        setState({...state,ChangeVisible: true});
    }

    const ChangeCancel = () => {
        setState({...state,ChangeVisible: false});
    }


    const ChangeCallback = (data) => {
        message.success("修改成功");
        setState({...state,ChangeVisible: false})
    }
    const ChangeSure = () =>{
        changeBook.validateFields().then(values => {
            let book_id = localStorage.getItem("changeBookId");
            const data = {name:values.name,author:values.author,
                          category:values.category,price:values.price,
                          description:values.description,inventory:values.inventory,
                          imag:values.imag, book_id:book_id};
            ChangeBook(data,ChangeCallback);
        })
    }


    //添加操作
    const [state, setState] = useState({ModalVisible:false,ChangeVisible:false});
    const [formBook] = Form.useForm();
    const [changeBook] = Form.useForm();
    const showModal = () =>{
        setState( {...state,ModalVisible:true});
    }

    const addCallBack = (data) => {
        message.success("添加成功");
        setState({...state,ModalVisible: false});
    }

    const submitBook = () =>{
        formBook.validateFields().then(values=>{
            const data = {name:values.name,author:values.author,
                          category:values.category,price:values.price,
                          description:values.description,inventory:values.inventory,
                          imag:values.imag};
            addBook(data,addCallBack);
        })
    }

    const cancelBook = () =>{
        setState({...state,ModalVisible: false});
    }
    //列数据
    const defaultColumns = [
        {
            title: '书号',
            dataIndex: 'book_id',
            key: 'book_id',
            ...getColumnSearchProps('book_id')
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
            ...getColumnSearchProps('name'),
        },
        {
            title: '类别',
            dataIndex: 'category',
            key: 'category',
            ...getColumnSearchProps('category')
        },
        {
            title: '作者',
            dataIndex: 'author',
            key: 'author',
            ...getColumnSearchProps('author')
        },
        {
            title: '单价',
            dataIndex: 'price',
            key: 'price',
            ...getColumnSearchProps('price')
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
            ...getColumnSearchProps('inventory')
        },
        {
            title: '操作',
            dataIndex: 'action',
            render: (_, record) =>
                dataSource.length >= 1 ? (
                    <Space size="middle">
                        <Popconfirm title="Sure to delete?" onConfirm={() => handleDelete(record.book_id)}>
                            <a>删除</a>
                        </Popconfirm>
                        <a onClick={() => handleChange(record)}>修改</a>
                    </Space>
                ) : null,
        }
    ];
    return (
        <div>
            <Button type="primary" onClick={() => showModal()}>添加书籍</Button>
            <Modal title="添加书籍" visible={state.ModalVisible}
                   okText="确认添加" cancelText="取消"
                   onOk={() => {submitBook()}}
                   onCancel={() => {cancelBook()}}>
                <Form form={formBook}
                      name="wrap"
                      labelCol={{
                          flex: '110px',
                      }}
                      labelAlign="right"
                      labelWrap
                      wrapperCol={{
                          flex: 1,
                      }}>
                    <Form.Item label="书名" name="name"
                               rules={[{
                                   required:true,
                                   message:'书名不能为空'
                               }]}><Input/></Form.Item>
                    <Form.Item label="类别" name="category"
                               rules={[{
                                   required:true,
                                   message:'密码不能为空'
                               }]}><Input/></Form.Item>
                    <Form.Item label="作者" name="author"
                               rules={[{
                                   required:true,
                                   message:'作者不能为空'
                               }]}><Input/></Form.Item>
                    <Form.Item label="价格" name="price"
                               rules={[{
                                   required:true,
                                   message:'价格不能为空'
                               }]}><Input/></Form.Item>
                    <Form.Item label="简介" name="description"><Input/></Form.Item>
                    <Form.Item label="库存" name="inventory"
                               rules={[{
                                   required:true,
                                   message:'库存不能为空'
                               }]}><Input/></Form.Item>
                    <Form.Item label="图片" name="imag"><Input/></Form.Item>
                </Form>
            </Modal>
            <Modal title="修改书籍" visible={state.ChangeVisible}
                   okText="确认修改" cancelText="取消"
                   onOk={() => ChangeSure()}
                   onCancel={() => ChangeCancel()}>
                <Form form={changeBook}
                      name="wrap"
                      labelCol={{
                          flex: '110px',
                      }}
                      labelAlign="right"
                      labelWrap
                      wrapperCol={{
                          flex: 1,
                      }}>
                    <Form.Item label="书名" name="name"
                               rules={[{
                                   required:true,
                                   message:'书名不能为空'
                               }]}><Input/></Form.Item>
                    <Form.Item label="类别" name="category"
                               rules={[{
                                   required:true,
                                   message:'密码不能为空'
                               }]}><Input/></Form.Item>
                    <Form.Item label="作者" name="author"
                               rules={[{
                                   required:true,
                                   message:'作者不能为空'
                               }]}><Input/></Form.Item>
                    <Form.Item label="价格" name="price"
                               rules={[{
                                   required:true,
                                   message:'价格不能为空'
                               }]}><Input/></Form.Item>
                    <Form.Item label="简介" name="description"><Input/></Form.Item>
                    <Form.Item label="库存" name="inventory"
                               rules={[{
                                   required:true,
                                   message:'库存不能为空'
                               }]}><Input/></Form.Item>
                    <Form.Item label="图片" name="imag"><Input/></Form.Item>
                </Form>
            </Modal>
            <Table
                key="book_id"
                dataSource={dataSource}
                columns={defaultColumns}
            />
        </div>
    );
}

export default BookTable;
