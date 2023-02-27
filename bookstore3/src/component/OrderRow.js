import React from "react";
import "../css/OrderRow.css"

class OrderRow extends React.Component{
    constructor(props) {
        super(props);
    }

    render() {
        let order=this.props.order;
        return(
            <div className="order-card">
                <div className="order-num">{order.order_id}</div>
                <div className="order-state">{order.order_state}</div>
                <div className="order-price">￥{order.order_price}</div>
                <div  className="order-operation">
                    <button>确认收货</button>
                </div>
            </div>
        )
    }
}

export default OrderRow;