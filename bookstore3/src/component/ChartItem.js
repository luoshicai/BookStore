import React from "react";
import "../css/ChartItem.css";
class ChartItem extends React.Component{
    constructor(props) {
        super(props);
        this.state={
            select:0
        }
    }

    render(){
        let item = this.props.item;
        return(
            <div className="card">
                <div className="checkbox-position">
                    <input type="checkbox" className="checkbox-size" onClick={()=>{
                        if (this.state.select===0){
                            this.props.handleSelect(item.chartId);
                            this.setState({select:1});
                        }
                        else{
                            this.props.handleUnSelect(item.chartId);
                            this.setState({select:0});
                        }
                    }}/>
                </div>
                <div className="card-picture">
                    <img src={item.imag}className="picture-content"/>
                </div>
                <div className="card-description">
                    {item.name}
                </div>
                <div className="card-author">{item.author}</div>
                <div className="card-unit-price">￥{item.price}</div>
                <div className="card-operation">
                    <button className="delete-operation" onClick={()=>{this.props.handleDelete(item.chartId);}}>移出购物车</button>
                    <button className="buy-operation" onClick={()=>{this.props.handleBuy(item);}}>立即购买</button>
                </div>
            </div>
        )
    }
}

export default ChartItem;