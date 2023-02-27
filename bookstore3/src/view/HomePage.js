import React from "react";
import 'font-awesome/css/font-awesome.min.css';
import {withRouter} from "react-router-dom";
import {history} from "../basicRouter";
import {BookMessage} from "../basicRouter";
import SearchBar from "../component/SearchBar";
import FunctionIcon from "../component/FunctionIcon";
import RefreshButton from "../component/RefreshButton";
import localStorage from "localStorage";
import {getBooks} from "../service/bookService";
import {getOrders} from "../service/orderService";
import {logout} from "../service/userService";

class HomePage extends React.Component{
    constructor(props) {
        super(props);
        this.state={
            products:[],
            userId:0,
        }
        this.componentDidMount = this.componentDidMount.bind(this);
    }

    callback = (data) => {
        this.setState({products:data});
    }
    componentDidMount() {
        getBooks("",this.callback);
        const userId = localStorage.getItem("userId");
        this.setState({userId:userId});
    }

    getOrders = () =>{
        if (this.state.userId==="0"){
            alert("请先登录！");
        }
        else{
            this.props.history.push("/Order");
        }
    }

    getCarts = () =>{
        if (this.state.userId==="0"){
            alert("请先登录！");
        }
        else{
            this.props.history.push("/Cart");
        }
    }

    logoutCallback = (data) =>{
        alert("本次在线时间为："+data.msg+"s");
    }

    clickLogButton = () =>{
        if (this.state.userId==="0"){
            this.props.history.push("/Login");
        }
        else{
            //todo
            const data = {userId:this.state.userId};
            logout(data,this.logoutCallback);
            localStorage.setItem("userId", "0");
            this.props.history.push("/Login");
        }
    }

    render() {
        let status = (this.state.userId === "0" ? "登录" : "退出");
        console.log(status);
        return(
            <div>
            <div className='home-header-base'>
                <h1 id="header-base-tittle">城南书屋</h1>
                <SearchBar> </SearchBar>
                <div className="FunctionIcon-position">
                    <div className="Order-Icon" onClick={()=>{this.getOrders()}}>
                        <FunctionIcon url="fa fa-book" name="订单"> </FunctionIcon>
                    </div>
                    <div className="Chart-Icon" onClick={()=>{this.getCarts()}}>
                        <FunctionIcon  url="fa fa-shopping-cart" name="购物车"> </FunctionIcon>
                    </div>
                    <div className="LogIn-Icon" onClick={()=>this.clickLogButton()}>
                        <FunctionIcon  url="fa fa-sign-in" name={status}> </FunctionIcon>
                    </div>
                </div>
            </div>
            <div className='home_menu'>
                <div className="menu-icon">
                    <i className="fa fa-bars"> </i>
                </div>
                <div className="menu-text">分区</div>
                <div className="menuTable-type">
                    <MenuTable category={bookType}> </MenuTable>
                </div>
            </div>
            <div className='home_content'>
                <div>
                    <Recommend> </Recommend>
                </div>
                <div id="category-table">
                    <ProductTable products={this.state.products} history={this.props.history}> </ProductTable>
                </div>
            </div>
        </div>
        );
    }
}



function MoreButton(props){
    return(
      <button className="MoreButton-type" onClick={()=>props.history.push({pathname:"/More",state:{BookType:props.BookType}})}>
          更多
      </button>
    );
}

class Recommend extends React.Component{
    constructor(props) {
        super(props);
        this.state={i:0};
        this.handleClick=this.handleClick.bind(this);
    }

    handleClick(){
        let a=Math.floor(Math.random() * 5);
        while (a===this.state.i){
            a=Math.floor(Math.random() * 5);
        }
        this.setState({i:a})
    }
    render() {
        return (
            <div className="recommend-size">
                <Tab number={this.state.i}> </Tab>
                <SelectImg number={this.state.i}> </SelectImg>
                <div id="recommend-refresh-button" onClick={this.handleClick}>
                    <RefreshButton url="fa fa-refresh" name="换一换"> </RefreshButton>
                </div>
            </div>
        );
    }

}

class Tab extends React.Component{
    constructor(props) {
        super(props);
        this.selected1=this.selected1.bind(this);
        this.selected2=this.selected2.bind(this);
    }
    selected2(e){
        e.target.className="tab-stick-selected";
        document.getElementById("tab-stick1").className="tab-stick-unselected";
    }
    selected1(e){
        e.target.className = "tab-stick-selected";
        document.getElementById("tab-stick2").className="tab-stick-unselected";
    }

    render(){
        let i=this.props.number;
        return(
            <div id="tab">
                <div id="tab-tittle">
                    <h1 id="tab-tittle-text" style={{whiteSpace: 'pre-wrap'}}>
                        {recommendBook[i].tabTitleText}
                    </h1>
                </div>
                <div className="tab-stick">
                    <div className="tab-stick-selected" id="tab-stick1" onMouseOver={this.selected1}>
                        {recommendBook[i].tabStick1}
                    </div>
                    <div id="tab-division"> </div>
                    <div className="tab-stick-unselected" id="tab-stick2" onMouseOver={this.selected2}>
                        {recommendBook[i].tabStick2}
                    </div>
                </div>
            </div>
        );
    }
}

function SelectImg(props){
    let imgSrc;
    switch (props.number){
        case 0: imgSrc=<img src={recommendBook[0].recommendImagContent} alt="It's a picture"/>; break;
        case 1: imgSrc=<img src={recommendBook[1].recommendImagContent} alt="It's a picture"/>; break;
        case 2: imgSrc=<img src={recommendBook[2].recommendImagContent} alt="It's a picture"/>; break;
        case 3: imgSrc=<img src={recommendBook[3].recommendImagContent} alt="It's a picture"/>; break;
        case 4: imgSrc=<img src={recommendBook[4].recommendImagContent} alt="It's a picture"/>; break;
        default:
            break;
    }
    return imgSrc;
}

class ProductCategoryRow extends React.Component{
    constructor(props) {
        super(props);
    }
    render() {
        let history=this.props.history;
        return(
            <div>
          <tr className="row-width">
              <th><h2>{this.props.category}</h2></th>
              <td className="categoryRow-button">
                 <MoreButton history={history} BookType={this.props.category}> </MoreButton>
              </td>
          </tr>
                <hr/>
                </div>
        );
    }
}

class ProductRow extends React.Component{
    constructor(props) {
        super(props);
    }

    // handleClick = () =>{
    //     this.props.history.push("/BookDetail");
    // }

    render() {
        let i=0;
        const length=this.props.length;
        const row=[];
        for (let m=0;m<2;++m){
            row[m]=[];
        }
        this.props.products.forEach((product)=>{
            if (i<=4){
                row[0].push(
                    <td className="li0" onClick={()=>{
                        localStorage.setItem("book_id",product.book_id);
                        this.props.history.push({
                        pathname: '/BookDetail',
                        params: {
                            id: product.book_id
                        }
                    })}
                    }>
                     {/*<td className="li0" onClick={()=>this.props.history.push("/BookDetail")}>*/}
                        {/*<td className="li0" onClick={this.handleClick()}>*/}
                        <img src={product.imag} className="card-img-type"/>
                        <p className="card-text-type">{product.name}</p>
                        <p className="card-price-type">￥{product.price}</p>
                    </td>
                )
            }
            else{
                row[1].push(
                    <td className="li0" onClick={()=>{
                        localStorage.setItem("book_id",product.book_id);
                        this.props.history.push({
                            pathname: '/BookDetail',
                            params: {
                                id: product.book_id
                            }
                        })}}>
                        <img src={product.img} className="card-img-type"/>
                        <p className="card-text-type">{product.name}</p>
                        <p className="card-price-type">￥{product.price}</p>
                    </td>
                )
            }
            ++i;
            }
        )
        //没有满的补上空格
        while (i<10){
            if (i<=4){
                row[0].push(
                    <td className="li0"> </td>
                )
            }
            else{
                row[1].push(
                    <td className="li0"> </td>
                )
            }
            ++i;
        }

        return(
            <div className="li4">
                <tr>
                    {row[0]}
                </tr>
                <tr>
                    {row[1]}
                </tr>
            </div>
        );
    }

}

class ProductTable extends React.Component{
    constructor(props) {
        super(props);
    }

    render() {
        const rows = [];
        let lastCategory=null;
        const sameCategory=[];
        let length=this.props.products.length;
        let history=this.props.history;
        let i=0;
        let numOfCategory=0;
        for (let m=0;m<5;++m){
            sameCategory[m]=[];
        }
        this.props.products.forEach((product)=>{
            ++i;
            if (product.category!==lastCategory){
                if (sameCategory[numOfCategory].length!==0){
                    switch (numOfCategory) {
                        case 0: rows.push(
                                <ProductRow products={sameCategory[0]} history={history}> </ProductRow>
                                );  break;
                        case 1: rows.push(
                                <ProductRow products={sameCategory[1]} history={history}> </ProductRow>
                                );  break;
                        case 2: rows.push(
                                <ProductRow products={sameCategory[2]} history={history}> </ProductRow>
                                );  break;
                        case 3: rows.push(
                                <ProductRow products={sameCategory[3]} history={history}> </ProductRow>
                                );  break;
                        case 4: rows.push(
                                <ProductRow products={sameCategory[4]} history={history}> </ProductRow>
                                );  break;
                        default: break;
                    }
                    ++numOfCategory;
                }
                rows.push(
                    <ProductCategoryRow category={product.category} history={history}> </ProductCategoryRow>
                );
                lastCategory=product.category;
            }
            switch (numOfCategory){
                case 0: sameCategory[0].push(product);    break;
                case 1: sameCategory[1].push(product);    break;
                case 2: sameCategory[2].push(product);    break;
                case 3: sameCategory[3].push(product);    break;
                case 4: sameCategory[4].push(product);    break;
                default: break;
            }
            if (i==length){
                rows.push(
                    <ProductRow products={sameCategory[4]} history={history}> </ProductRow>
                );
            }
            }
        );
        return(
            <div>
                {rows}
            </div>
        );
    }
}

class MenuBar extends React.Component{
    constructor(props) {
        super(props);
    }
    render() {
        return(
                <div className="menu-stick">
                    <p className="menu-stick-text">{this.props.name}</p>
                </div>
        );
    }
}

class MenuTable extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const category=this.props.category;
        const length=category.length;
        const categoryDisplay=[];
        for (let i=0;i<length;++i){
            switch (i){
                case 0: categoryDisplay[0]=<MenuBar name={category[0]}> </MenuBar>; break;
                case 1: categoryDisplay[1]=<MenuBar name={category[1]}> </MenuBar>; break;
                case 2: categoryDisplay[2]=<MenuBar name={category[2]}> </MenuBar>; break;
                case 3: categoryDisplay[3]=<MenuBar name={category[3]}> </MenuBar>; break;
                case 4: categoryDisplay[4]=<MenuBar name={category[4]}> </MenuBar>; break;
                default:break;
            }

        }
        return (
            <div>
                {categoryDisplay}
            </div>
        );
    }
}

const recommendBook1={
    tabTitleText:"文学小说\n言情、悬疑、科幻",
    tabStick1:"东野圭吾 悬疑小说",
    tabStick2:"影视剧 原著小说",
    recommendImagContent:require('../imag/recommend1.jpg'),
    tabBackground:"#57AEAB",
    tabDivision:"#57AEAB"
};
const recommendBook2={
    tabTitleText:"社科励志\n超越梦想一起飞",
    tabStick1:"心灵 励志",
    tabStick2:"心理 散记",
    recommendImagContent:require('../imag/recommend2.jpg'),
    tabBackground:"#99B3BB",
    tabDivision:"#99B3BB"
};
const recommendBook3={
    tabTitleText:"幼儿启蒙\n0-3-6-9-12\n儿童智力开发",
    tabStick1:"低幼启蒙 儿童绘本",
    tabStick2:"益智图文 文学积累",
    recommendImagContent:require('../imag/recommend3.jpg'),
    tabBackground:"#58B4CE",
    tabDivision:"#58B4CE"
};
const recommendBook4={
    tabTitleText:"教辅工具\n辅佐教材的参考书",
    tabStick1:"外语学习 阅读方式",
    tabStick2:"教辅材料 工具书",
    recommendImagContent:require('../imag/recommend4.jpg'),
    tabBackground:"#EF8666",
    tabDivision:"#EF8666"
};
const recommendBook5={
    tabTitleText:"获奖作品\n莫言\n石黑一雄",
    tabStick1:"诺贝尔文学奖",
    tabStick2:"茅盾文学奖",
    recommendImagContent:require('../imag/recommend5.jpg'),
    tabBackground:"#9CB2C5",
    tabDivision:"#9CB2C5"
};
const recommendBook=[recommendBook1,recommendBook2,recommendBook3,recommendBook4,recommendBook5];
// const PRODUCTS =[
//     {category:"文学小说",price:"￥29.05",stocked:"true",name:"拉普拉斯的魔女",author:"东野圭吾",imag:require('../imag/book1.jpg')},
//     {category:"文学小说",price:"￥40.15",stocked:"true",name:"人生求缺不求满",author:"丰子恺",imag:require('../imag/book2.jpg')},
//     {category:"社科励志",price:"￥56.70",stocked:"true",name:"毛泽东选集",author:"毛泽东",imag:require('../imag/book3.jpg')},
//     {category:"社科励志",price:"￥22.56",stocked:"true",name:"怎样管精力，就怎样过一生",author:"(法)奥迪尔",imag:require('../imag/book4.jpg')},
//     {category:"幼儿启蒙",price:"￥53.5",stocked:"true",name:"培养注意力的心理学",author:"帅澜",img:require('../imag/book5.jpg')},
//     {category:"幼儿启蒙",price:"￥58.11",stocked:"true",name:"孩子，你是在为自己读书",author:"周舒予",imag:require('../imag/book6.jpg')},
//     {category:"教辅工具",price:"￥103",stocked:"true",name:"现代汉语词典(第7版)",author:"商务印书馆",imag:require('../imag/book7.jpg')},
//     {category:"教辅工具",price:"￥154",stocked:"true",name:"牛津高阶英汉双解词典(第9版)",author:"商务印书馆",imag: require('../imag/book8.jpg')},
//     {category: "获奖作品",price:"￥44.85",stocked: "true",name:"北上",author: "徐则臣",imag:require('../imag/book9.jpg')},
//     {category: "获奖作品",price:"￥168.4",stocked: "true",name:"三体",author: "刘慈欣",imag:require('../imag/book10.jpg')}
// ];

const bookType=["文学小说","社科励志","幼儿启蒙","教辅工具","获奖作品"];
export default withRouter(HomePage);
