import React from "react";
import "../css/chart.css";
import "../css/Order.css";
import {withRouter} from "react-router-dom";
import MyOrderTable from "../component/MyOrderTable";
import {GetBookSalesById, getOrders} from "../service/orderService";
import {Tabs} from "antd";
import BookSaleTable from "../component/BookSaleTable";
import MyBookSaleTable from "../component/MyBookSaleTable";
import FunctionIcon from "../component/FunctionIcon";
const { TabPane } = Tabs;
class Order extends React.Component{
    constructor(props) {
        super(props);
        this.state={
            userId:"",
            Orders:[],
            bookSale: [],
        }
        this.componentDidMount=this.componentDidMount.bind(this);
    }

    callback = (data) => {
        this.setState({...this.state,Orders:data});
    }

    BookSaleCallback = (data) =>{
        this.setState({...this.state,bookSale:data});
    }

    componentDidMount() {
        let userId = localStorage.getItem("userId");
        this.setState({userId:userId});
        const data = {userId: userId};
        getOrders(data,this.callback);
        GetBookSalesById(data,this.BookSaleCallback);

        //ajax轮询后改为websocket通知，故注释掉
        // setInterval(()=>{
        //     getOrders(data,this.callback);
        //     GetBookSalesById(data,this.BookSaleCallback);
        // },5000)
    }

    jumpToCart = () =>{
        this.props.history.push("/Cart");
    }

    render() {
        const data = this.state.Orders;
        const MyBookSale = this.state.bookSale;
        return (
            <div>
                <div className='header-base'>
                    <h1 id="header-base-tittle">城南书屋</h1>
                    <div id="header">
                        <h1 id="title-text">我的订单</h1>
                    </div>
                    <div className="OrderToCart" onClick={()=>{this.jumpToCart()}}>
                        <FunctionIcon  url="fa fa-shopping-cart" name="购物车"> </FunctionIcon>
                    </div>
                </div>
                <div className="Rcontent">
                    <Tabs defaultActiveKey="1">
                        <TabPane tab="查看订单" key="1">
                            <MyOrderTable data={data}/>
                        </TabPane>
                        <TabPane tab="订单统计" key="2">
                            <MyBookSaleTable data={MyBookSale}/>
                        </TabPane>
                    </Tabs>
                </div>
            </div>
        );
    }
}

export default withRouter(Order);
