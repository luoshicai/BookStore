import React, {useState, useEffect, useRef} from "react";
import 'antd/dist/antd.css';
import {Space, Table, Image, Button, message, Popconfirm} from "antd";
import localStorage from "localStorage";
import {deleteOneCart, getCarts} from "../service/cartService";
import {AddToOrders} from "../service/orderService";

const CartTable = (props) => {
    let data = props.data;
    const [dataSource, setDataSource] = useState([]);
    const userId = localStorage.getItem('userId');
    useEffect(() => {
        setDataSource(props.data)
    }, [props.data])

    const dataColumns = [
        {
            title: '图片',
            dataIndex: 'imag',
            render: (_, record) =>
                dataSource.length >= 1 ? (
                    <Image src={record.imag} width={100}/>
                ) : null
        },
        {
            title: '书名',
            dataIndex: 'bookName',
            key: 'bookName',
        },
        {
            title: '作者',
            dataIndex: 'author',
            key: 'author',
        },
        {
            title: '单价',
            dataIndex: 'unitPrice',
            key: 'unitPrice',
        },
        {
            title: '数量',
            dataIndex: 'number',
            key: 'number',
        },
        {
            title: '操作',
            dataIndex: 'action',
            render: (_, record) =>
                dataSource.length >= 1 ? (
                    <Space>
                        <Popconfirm title="确定移出购物车吗?" onConfirm={() => handleDelete(record.chartId)}>
                            <a>移出购物车</a>
                        </Popconfirm>
                    </Space>
                ) : null
        }
    ]

    const DeleteCallback = (data) => {
        //删除条目后刷新页面
        let userId = localStorage.getItem("userId");
        const RData = {userId:userId};
        getCarts(RData,GetCallback);
    }

    const GetCallback = (data) => {
        setDataSource(data);
    }
    //移出购物车
    const handleDelete = (chartId) => {
        const CartId = {"chartId": chartId};
        deleteOneCart(CartId, DeleteCallback);
    }
    //选择
    const [selectedRowKeys, setSelectedRowKeys] = useState([]);
    const [loading, setLoading] = useState(false);

    const cartCallBack = data =>{
        setDataSource(data);
        setSelectedRowKeys([]);
    }

    const OrderCallBack = data =>{
        if (data.status==="操作成功,等待处理!"){
            message.success("操作成功,等待处理!");
            const UserId = {userId:userId};
            getCarts(UserId, cartCallBack);
        }
        else{
            message.error(data.status);
        }
    }

    const start = () => {
        const data = {cartIds:selectedRowKeys,userId:userId,orderState:"已支付"};
        AddToOrders(data,OrderCallBack);
    };

    const onSelectChange = (newSelectedRowKeys) => {
        console.log('selectedRowKeys changed: ', selectedRowKeys);
        setSelectedRowKeys(newSelectedRowKeys);
    };

    const rowSelection = {
        selectedRowKeys,
        onChange: onSelectChange,
    };
    const hasSelected = selectedRowKeys.length > 0;


    return(
        <div>
            <Table
                rowSelection={rowSelection}
                columns={dataColumns}
                dataSource={dataSource}
                rowKey={record => record.chartId}
                />
            <div
                style={{
                    marginBottom: 16,
                }}
            >
                <Button type="primary" onClick={start} disabled={!hasSelected} loading={loading}>
                    立即购买
                </Button>
                <span
                    style={{
                        marginLeft: 8,
                    }}
                >
          {hasSelected ? `选择了 ${selectedRowKeys.length} 项` : ''}
        </span>
            </div>
        </div>
    )
}

export default CartTable;
