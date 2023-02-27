import React from 'react';
import 'antd/dist/antd.css';
import '../css/Cart.css';
import {withRouter} from "react-router-dom";
import localStorage from "localStorage";
import CartTable from "../component/CartTable";
import {getCarts} from "../service/cartService";
import FunctionIcon from "../component/FunctionIcon";
import {message} from "antd";
class Cart extends React.Component{
    constructor(props) {
        super(props);
        this.state={
            userId:"",
            cartItems:[],
            selectItems:[],
            price:0,
        }
    }

    callback = (data) => {
        this.setState({cartItems:data});
    }

    componentDidMount() {
        let userId = localStorage.getItem("userId");
        this.setState({userId:userId});
        const data = {userId:userId};
        getCarts(data,this.callback);

        //websocket
        if(typeof(WebSocket) == "undefined") {
            console.log("您的浏览器不支持WebSocket");
        }else{
            console.log("您的浏览器支持WebSocket");
        }

        let websocket  = new WebSocket("wss://localhost:8453/websocket/"+userId);
        //打开事件
        websocket.onopen = function () {
            console.log("websocket已打开");
        }

        //发现消息进入
        websocket.onmessage = this.message;


        // //关闭事件
        // websocket.onclose = function() {
        //     console.log("websocket已关闭");
        // };
        // //发生了错误事件
        // websocket.onerror = function() {
        //     console.log("websocket发生了错误");
        // }
    }

    message = (msg) =>{
        console.log("websocket已连接");
        console.log(msg.data);  // 第一次进去会显示：连接成功
        this.props.history.push("/Order");
        alert(msg.data);
    }

    jumpToOrder = ()=>{
        this.props.history.push("/Order");
    }

    render() {
        return (
            <div>
                <div className='header-base'>
                    <h1 id="header-base-tittle">城南书屋</h1>
                    <div id="header">
                        <h1 id="title-text">我的购物车</h1>
                    </div>
                    <div className="CartToOrder" onClick={()=>{this.jumpToOrder()}}>
                        <FunctionIcon url="fa fa-book" name="订单" > </FunctionIcon>
                    </div>
                </div>
                <div className="Rcontent">
                    <CartTable data={this.state.cartItems}/>
                </div>
            </div>
        );
    }
}

export default withRouter(Cart);
