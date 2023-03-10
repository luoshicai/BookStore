import React, {useState} from "react";
import {withRouter} from "react-router-dom";
import "../css/root.css";
import {Button, DatePicker, version, Space, Table, Popconfirm, message, Tabs} from "antd";
import "antd/dist/antd.css";
import BookTable from "../component/BookTable";
import UserTable from "../component/UserTable";
import OrderTable from "../component/OrderTable";
import BookSaleTable from "../component/BookSaleTable";
import UserBuyTable from "../component/UserBuyTable";
import BookSearchTable from "../component/BookSearchTable";
import {getBooks} from "../service/bookService";
import {rootUsers} from "../service/userService";
import {getAllOrders, getBookSales, getConsumption} from "../service/orderService";
import SearchAuthor from "../component/SearchAuthor";
import BookTagTable from "../component/BookTagTable";
const { TabPane } = Tabs;

class Root extends React.Component{
    constructor(props) {
        super(props);
        this.state={
            products:[],
            users:[],
            orders:[],
            bookSale:[],
            userConsumption: []
        }
        this.componentDidMount = this.componentDidMount.bind(this);
    }

    getBooksCallback = (data) =>{
        this.setState({...this.state,products:data});
    }

    rootUsersCallback = (data) =>{
        this.setState({...this.state,users:data});
    }

    allOrdersCallback = (data) =>{
        this.setState({...this.state,orders:data});
    }

    bookSaleCallback = (data) =>{
        this.setState({...this.state,bookSale:data});
    }

    consumptionCallback = (data) =>{
        this.setState({...this.state,userConsumption:data});
    }
    componentDidMount() {
        getBooks("",this.getBooksCallback);
        rootUsers("",this.rootUsersCallback);
        getAllOrders("",this.allOrdersCallback);
        getBookSales("", this.bookSaleCallback);
        getConsumption("", this.consumptionCallback);
    }


    render() {
        let data = this.state.products;
        let users = this.state.users;
        let orders = this.state.orders;
        let bookSale = this.state.bookSale;
        let userConsumption = this.state.userConsumption;
        return(
            <div>
                <div className='header-base'>
                    <h1 id="header-base-tittle">????????????</h1>
                </div>
                <div className="Rcontent">
                    <Tabs defaultActiveKey="1">
                        <TabPane tab="????????????" key="1">
                            <BookTable data={data}/>
                        </TabPane>
                        <TabPane tab="????????????" key="2">
                            <UserTable data={users}/>
                        </TabPane>
                        <TabPane tab="????????????" key="3">
                            <OrderTable data={orders}/>
                        </TabPane>
                        <TabPane tab="??????????????????" key="4">
                            <BookSaleTable data={bookSale}/>
                        </TabPane>
                        <TabPane tab="??????????????????" key="5">
                            <UserBuyTable data={userConsumption}/>
                        </TabPane>
                        <TabPane tab="????????????" key="6">
                            <BookSearchTable data={data}/>
                        </TabPane>
                        <TabPane tab="????????????" key="7">
                             <SearchAuthor/>
                        </TabPane>
                        <TabPane tab="?????????????????????" key="8">
                             <BookTagTable data={data}/>
                        </TabPane>
                    </Tabs>
                </div>
            </div>
        )
    }
}

export default withRouter(Root);
