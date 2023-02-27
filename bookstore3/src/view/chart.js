import React from "react";
import 'font-awesome/css/font-awesome.min.css';
import "../css/chart.css";
import {withRouter} from "react-router-dom";
import ChartItem from "../component/ChartItem";
import localStorage from "localStorage";
import chartItem from "../component/ChartItem";
class Chart extends React.Component{
    constructor(props) {
        super(props);
        this.state={
            userId:"",
            cartItems:[],
            selectItems:[],
            price:0
        }
        this.componentDidMount=this.componentDidMount.bind(this);
        this.handleSelect=this.handleSelect.bind(this);
        this.handleUnSelect=this.handleUnSelect.bind(this);
    }


    componentDidMount() {
        let userId = localStorage.getItem("userId");
        this.setState({userId:userId});
        fetch("http://localhost:8082/GetCharts",{
            method:'POST',
            headers:{
                'Content-Type': 'application/json'
            },
            body:JSON.stringify({userId:userId})
        })
            .then(response => response.json())
            .then(data =>{
                this.setState({cartItems:data});
            })
    }

    //移出购物车操作
    MoveOut = (chartId) => {
        fetch("http://localhost:8082/DeleteOneChart", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({"chartId": chartId})
        })
            .then(response => {
                response.json()
            })
            .then( data =>{
                //删除条目后刷新页面
                let userId = localStorage.getItem("userId");
                fetch("http://localhost:8082/GetCharts",{
                    method:'POST',
                    headers:{
                        'Content-Type': 'application/json'
                    },
                    body:JSON.stringify({userId:userId})
                })
                    .then(response => response.json())
                    .then(data =>{
                        this.setState({cartItems:data});
                    })
            })
    }

    //单个购买操作
    addOneOrder = (cartItem)=> {
        fetch("http://localhost:8082/AddOneOrder",{
            method:'POST',
            headers:{
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({userId:this.state.userId,price:cartItem.price,
                                        bookId:cartItem.bookId,OrderState:"已支付"})
        })
            .then(response => {response.json()})
            .then(data => {
                this.MoveOut(cartItem.chartId);
                alert("购买成功!")
            })
    }

    //选中操作
    handleSelect = (chartId)=>{
        //存储选中列的chartId
        let result = [];
        let newPrice = 0;
        result = this.state.selectItems;
        result.push(chartId);
        this.setState({selectItems:result});

        //更新price
        this.state.cartItems.forEach((item)=>{
            if (item.chartId===chartId){
                newPrice = item.price;
            }
        })
        newPrice =this.state.price+newPrice;
        this.setState({price:newPrice});
    }

    //取消选中操作
    handleUnSelect = (chartId)=>{
        //取消选中列的chartId
        let result = [];
        let newPrice = 0;
        this.state.selectItems.forEach((item)=>{
            if (item!==chartId){
                result.push(item);
            }
        })
        this.setState({selectItems:result});

        //更新price
        this.state.cartItems.forEach((item)=>{
            if (item.chartId===chartId){
                newPrice = item.price;
            }
        })
        newPrice =this.state.price-newPrice;
        this.setState({price:newPrice});
    }

    render() {
        const rows = [];
        const size = this.state.cartItems.length;
        this.state.cartItems.forEach((cartItem,index)=>{
            rows.push(<ChartItem item={cartItem} key={index} handleDelete={this.MoveOut} handleBuy={this.addOneOrder}
                                 handleSelect={this.handleSelect} handleUnSelect={this.handleUnSelect}/>)
        })
        return (
            <div>
                <div id="header">
                    <h1 id="title-text">我的购物车</h1>
                </div>
                <div id="menu">
                    <div id="commodity">图书信息</div>
                    <div id="author">作者</div>
                    <div id="unit-price">价格</div>
                    <div id="number">数量</div>
                    <div id="operation">操作</div>
                </div>
                <div className="item-position">
                    {rows}
                    <div>
                        <div className="AllPrice">总价：￥{this.state.price.toFixed(2)}</div>
                    <button className="submit-button" onClick={()=>{
                        fetch("http://localhost:8082/AddOneManyOrder", {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json'
                            },
                            body: JSON.stringify({chartIds: this.state.selectItems,userId:this.state.userId,
                                                        price:this.state.price,OrderState:"已支付"})
                        })
                            .then(r  => r.json())
                            .then(data=>{
                                //刷新页面
                                fetch("http://localhost:8082/GetCharts",{
                                    method:'POST',
                                    headers:{
                                        'Content-Type': 'application/json'
                                    },
                                    body:JSON.stringify({userId:this.state.userId})
                                })
                                    .then(response => response.json())
                                    .then(data =>{
                                        this.setState({cartItems:data});
                                        this.setState({selectItems:[]});
                                        this.setState({price:0});
                                        alert("购买成功！");
                                    })
                        })
                    }}>提交订单</button>
                </div>
                </div>
            </div>
        );
    }
}

export default withRouter(Chart);
