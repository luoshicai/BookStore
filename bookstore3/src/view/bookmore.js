import React from "react";
import "../css/productrow.css";
import "../css/bookmore.css"
import BookRow from "../component/productrow";
import {withRouter} from "react-router-dom";
import {getBooks} from "../service/bookService";
import FunctionIcon from "../component/FunctionIcon";

class BookPage extends React.Component{
     constructor(props) {
         super(props);
         this.state={
             products:[]
         }
     }
    callback = (data) => {
        this.setState({products:data});
    }
    componentDidMount() {
        getBooks("",this.callback);
    }

    jumpToCart = () =>{
        this.props.history.push("/Cart");
    }

    jumpToOrder = () =>{
        this.props.history.push("/Order");
    }

    MoreToHome = () =>{
        this.props.history.push("/");
    }

    render() {
         let BookType=this.props.location.state.BookType;
         return(
           <div>
               <div className="browse-header">
                   <div className="MoreToHome" onClick={()=>{this.MoreToHome()}}>
                       <FunctionIcon  url="fa fa-reply" name=""> </FunctionIcon>
                   </div>
                   <div id="header">
                       <h1 id="title-text">城南书屋</h1>
                   </div>
                   <div>
                       <div className="DetailToCart" onClick={()=>this.jumpToCart()}>
                           <FunctionIcon  url="fa fa-shopping-cart" name="购物车"> </FunctionIcon>
                       </div>
                       <div className="DetailToOrder" onClick={()=>this.jumpToOrder()}>
                           <FunctionIcon url="fa fa-book" name="订单" > </FunctionIcon>
                       </div>
                   </div>
               </div>
               <div className="browse-content">
                   <FilterTable BookType={BookType} products={this.state.products} history={this.props.history}> </FilterTable>
               </div>
           </div>
         );
     }
}

class FilterTable extends React.Component{
    constructor(props) {
        super(props);
        this.state={
            filterText:"",
            bookType:this.props.BookType
        }
        this.handleFilterTextChange=this.handleFilterTextChange.bind(this);
        this.handleBookTypeChange=this.handleBookTypeChange.bind(this);
    }

    handleBookTypeChange(bookType){
        this.setState({bookType:bookType});
    }

    handleFilterTextChange(filterText){
        this.setState({filterText:filterText});
    }

    render(){
        return(
          <div>
              <div className="browse-search-position">
                  <ConSearch onBookTypeChange={this.handleBookTypeChange}
                             onFilterTextChange={this.handleFilterTextChange}
                             BookType={this.props.BookType}> </ConSearch>
              </div>
              <div className="browse-filtered-content-position">
                  <FilContent fileterText={this.state.filterText}
                              bookType={this.state.bookType} products={this.props.products} history={this.props.history}> </FilContent>
              </div>
          </div>
        );
    }
}
class ConSearch extends React.Component{
    constructor(props) {
        super(props);
        this.handleFilterTextChange=this.handleFilterTextChange.bind(this);
        this.handleBookTypeChange=this.handleBookTypeChange.bind(this);
        this.state={
            NumOfType:""
        }

    }

    handleFilterTextChange(){
        let value=document.getElementById("searchText").value;
        this.props.onFilterTextChange(value);
    }

    handleBookTypeChange(e) {
        if (e.target.value===this.state.NumOfType){
            e.target.checked=0;
            this.setState({NumOfType:""});
            this.props.onBookTypeChange("");
        }
        else{
            if (this.state.NumOfType === "") {
                this.props.onBookTypeChange(e.target.value);
                this.setState({NumOfType:e.target.value});
            } else {
                let a = document.getElementsByName("checkboxType");
                a.forEach((b) => {
                    b.checked = 0;
                })
                e.target.checked=1;
                this.setState({NumOfType:e.target.value});
                this.props.onBookTypeChange(e.target.value);
            }
        }
    }

    render() {
        return (
            <div className="browse-search">
                <div className="browse-searchBar-position">
                    <input id="searchText" type="text" className="browse-searchBar-text"/>
                    <input type="submit" value="搜索" className="browse-searchBar-submit" onClick={this.handleFilterTextChange}/>
                </div>
                <div className="browse-filter-position">
                    <tr>
                        <td className="box-margin">
                            <input name="checkboxType" type="checkbox" onClick={this.handleBookTypeChange} value="文学小说"/>文学小说
                        </td>
                        <td className="box-margin">
                            <input name="checkboxType" type="checkbox" onClick={this.handleBookTypeChange} value="社科励志"/>社科励志
                        </td>
                        <td className="box-margin">
                            <input name="checkboxType" type="checkbox" onClick={this.handleBookTypeChange} value="幼儿启蒙"/>幼儿启蒙
                        </td>
                        <td className="box-margin">
                            <input name="checkboxType" type="checkbox" onClick={this.handleBookTypeChange} value="教辅工具"/>教辅工具
                        </td>
                        <td className="box-margin">
                            <input name="checkboxType" type="checkbox" onClick={this.handleBookTypeChange} value="获奖作品"/>获奖作品
                        </td>
                    </tr>
                </div>
            </div>
        );
    }
}

class FilContent extends React.Component{
    constructor(props) {
        super(props);
    }

    render(){
        const products = this.props.products;
        const filterText=this.props.fileterText;
        const bookType=this.props.bookType;
        let filterProducts=[];

        if (filterText===""&&bookType===""){
            filterProducts=products;
        }
        else if (filterText!==""&&bookType===""){
            products.forEach((product) => {
                if (product.name.indexOf(filterText)!==-1){
                    filterProducts.push(product);
                }
            })
        }
        else if (filterText===""&&bookType!==""){
            products.forEach((product)=>{
                if (product.category===bookType){
                    filterProducts.push(product);
                }
            })
        }
        else if (filterText!==""&&bookType!==""){
            products.forEach((product) => {
                if (product.name.indexOf(filterText)!==-1&&product.category===bookType){
                    filterProducts.push(product);
                }
            })
        }

        return(
            <div>
                <BookRow products={filterProducts} history={this.props.history}> </BookRow>
            </div>
        );
    }
}


// const PRODUCTS =[
//     {category:"文学小说",price:"￥29.05",stocked:"true",name:"拉普拉斯的魔女",author:"东野圭吾",url:require('../imag/book1.jpg')},
//     {category:"文学小说",price:"￥40.15",stocked:"true",name:"人生求缺不求满",author:"丰子恺",url:require('../imag/book2.jpg')},
//     {category:"社科励志",price:"￥56.70",stocked:"true",name:"毛泽东选集",author:"毛泽东",url:require('../imag/book3.jpg')},
//     {category:"社科励志",price:"￥22.56",stocked:"true",name:"怎样管精力，就怎样过一生",author:"(法)奥迪尔",url:require('../imag/book4.jpg')},
//     {category:"幼儿启蒙",price:"￥53.5",stocked:"true",name:"培养注意力的心理学",author:"帅澜",url:require('../imag/book5.jpg')},
//     {category:"幼儿启蒙",price:"￥58.11",stocked:"true",name:"孩子，你是在为自己读书",author:"周舒予",url:require('../imag/book6.jpg')},
//     {category:"教辅工具",price:"￥103",stocked:"true",name:"现代汉语词典(第7版)",author:"商务印书馆",url:require('../imag/book7.jpg')},
//     {category:"教辅工具",price:"￥154",stocked:"true",name:"牛津高阶英汉双解词典(第9版)",author:"商务印书馆",url: require('../imag/book8.jpg')},
//     {category: "获奖作品",price:"￥44.85",stocked: "true",name:"北上",author: "徐则臣",url:require('../imag/book9.jpg')},
//     {category: "获奖作品",price:"￥168.4",stocked: "true",name:"三体",author: "刘慈欣",url:require('../imag/book10.jpg')}
// ];
export default withRouter(BookPage);
