import React from "react";
import "../css/submitOrder.css";
import {withRouter} from "react-router-dom";
class Order extends React.Component{
    constructor(props) {
        super(props);

    }
    render(){
        return(
            <div>
                <div className="header">
                    <h1 id="header-title">城南书屋</h1>
                    <div className="circle" id="circle1">
                        <p className="circle-content">1</p>
                        <p className="circle-text" id="circle-text1">提交订单</p>
                    </div>
                    <div className="circle-line" id="circle-line1"> </div>
                    <div className="circle" id="circle2">
                        <p className="circle-content">2</p>
                        <p className="circle-text" id="circle-text2">支付</p>
                    </div>
                    <div className="circle-line" id="circle-line2"> </div>
                    <div className="circle" id="circle3">
                        <p className="circle-content">3</p>
                        <p className="circle-text" id="circle-text3">确认收货</p>
                    </div>
                    <div className="circle-line" id="circle-line3"> </div>
                    <div className="circle" id="circle4">
                        <p className="circle-content">4</p>
                        <p className="circle-text" id="circle-text4">评价</p>
                    </div>
                </div>
                <div className="order-background">
                    <div className="address">
                        <h3 className="address-text">选择收货地址</h3>
                    </div>
                    <div className="order">
                        <h3 className="order-text">确认订单信息</h3>
                    </div>
                    <div className="submit">
                        <button className="submit-button">提交订单</button>
                    </div>
                    <div className="img">
                    </div>

                </div>
            </div>
        );
    }

}

export default withRouter(Order);