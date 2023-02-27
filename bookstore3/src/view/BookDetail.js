import React from "react";
import {withRouter} from "react-router-dom";
import "../css/BookDetails.css";
import localStorage from "localStorage";
import {Button, Input, message} from "antd";
import {getBookDetail} from "../service/bookService";
import {addToCart} from "../service/cartService";
import {addToOrder} from "../service/orderService";
import FunctionIcon from "../component/FunctionIcon";

class BookDetail extends React.Component{
    constructor(props) {
        super(props);
        this.state={
            book:"",
            number:1,
            userId:""
        }
    }

    detailCallback = (data) => {
        this.setState({book:data});
    }

    componentDidMount() {
        let bookId;
        if (typeof this.props.location.params == "undefined"){
            bookId = localStorage.getItem("book_id");
        }
        else{
            bookId = this.props.location.params.id;
        }
        let userId=localStorage.getItem("userId");
        this.setState({userId:userId});
        const data = {id:bookId};
        getBookDetail(data,this.detailCallback);
    }

    numChange = e =>{
        const num = e.target.value;
        const num1 = this.state.number;
        if (num>=0){
            this.setState({number:num});
        }
        else{
            this.setState({number:num1});
        }
    }

    addClick = ()=>{
        const num = this.state.number+1;
        if (num>=0){
            this.setState({number:num});
        }
    }

    minusClick = () =>{
        const num = this.state.number-1;
        if (num>=0){
            this.setState({number:num});
        }
    }

    cartCallback = (data) =>{
        if (data.status==="加入购物车成功!"){
            message.success(data.status);
            this.props.history.push("/cart");
        }
        else{
            message.error(data.status);
        }
    }

    orderCallback = (data) => {
        if (data.status==="操作成功,等待处理！"){
            alert("操作成功,等待处理！");
            this.props.history.push("/Order");
        }
        else{
            message.error(data.status);
        }
    }

    addToCart = () =>{
        if (this.state.userId === "0"){
            this.props.history.push("/Login");
            alert("请先登录！");
        }
        else{
            let number = this.state.number;
            if (number>0){
                const data = {userId:this.state.userId,bookId:this.state.book.book_id,number:this.state.number};
                addToCart(data,this.cartCallback);
            }
            else {
                alert("书籍的数量不能为0！");
            }
        }
    }

    addToOrder = () =>{
        if (this.state.userId === "0"){
            this.props.history.push("/Login");
            alert("请先登录！");
        }
        else{
            const data = {userId:this.state.userId,number:this.state.number,
                bookId:this.state.book.book_id,OrderState:"已支付"};
            addToOrder(data,this.orderCallback);
        }
    }

    jumpToCart = () =>{
        this.props.history.push("/Cart");
    }

    jumpToOrder = () =>{
        this.props.history.push("/Order");
    }

    DetailToHome = () =>{
        this.props.history.push("/");
    }

    render(){
        const number = this.state.number;
        // const Book_ = this.state.book;
        // // console.log(Book_);
        // const icon = Book_.icon;
        // console.log(icon);
        // let iconBase64 = JSON.stringify(icon);
        // console.log(iconBase64);
        return (
            <div>
                <div id="header">
                    <div id = "arrow-position" onClick={()=>{this.DetailToHome()}}>
                        <FunctionIcon  url="fa fa-reply" name=""> </FunctionIcon>
                    </div>
                    <h1 id="title-text">书籍详情</h1>
                    <div>
                        <div className="DetailToCart" onClick={()=>this.jumpToCart()}>
                            <FunctionIcon  url="fa fa-shopping-cart" name="购物车"> </FunctionIcon>
                        </div>
                        <div className="DetailToOrder" onClick={()=>this.jumpToOrder()}>
                            <FunctionIcon url="fa fa-book" name="订单" > </FunctionIcon>
                        </div>
                    </div>
                </div>
                <div className="content-type">
                    <div className="picture">
                        <img alt="image" src={this.state.book.imag} height="350px"
                             width="350px"/>
                    </div>
                    <div className="description">
                        <div className="book-name">{this.state.book.name}</div>
                        <div className="author"><br/>作者：{this.state.book.author}</div>
                        <div className="category"><br/>分类：{this.state.book.category}</div>
                        <div className="price"><br/>定价：￥{this.state.book.price}</div>
                        <div className="status"><br/>库存：{this.state.book.inventory}</div>
                        <div className="book-num"><br/>数量：
                            <div className="add-button">
                                <Button onClick={this.addClick}>+</Button>
                            </div>
                            <div  className="num-input">
                                <Input value={number} onChange={this.numChange}/>
                            </div>
                            <div className="minus-button">
                                <Button onClick={this.minusClick}>-</Button>
                            </div>
                        </div>
                        <div className="introduction"><br/>简介：<br/>
                            {this.state.book.description}
                        </div>
                    </div>
                    <div className="button-groups">
                        <button id="join-chart" onClick={()=>{this.addToCart()}}>加入购物车</button>
                        <button id="buy" onClick={()=>{this.addToOrder()}}>立即购买</button>
                    </div>
                </div>
            </div>
        );
    }
}

export default withRouter(BookDetail);
