import React from "react";
import "../css/productrow.css";
import localStorage from "localStorage";
class BookRow extends React.Component{
    constructor(props) {
        super(props);

    }

    highLight(e){
        e.target.className="li0-onMouse";
    }
    restore(e){
        e.target.className="li0";
    }
    none(e){
        e.target.className="none";
    }
    render() {
        let i=0;
        const length=this.props.length;
        const row=[];
        for (let m=0;m<2;++m){
            row[m]=[];
        }
        this.props.products.forEach((product,index)=>{
                if (i<=4){
                    row[0].push(
                        <td className="li0" key={index} onClick={()=>{
                            localStorage.setItem("book_id",product.book_id);
                            this.props.history.push({
                                pathname: '/BookDetail',
                                params: {
                                    id: product.book_id
                                }
                            })}}>
                            <img src={product.imag} className="card-img-type"/>
                            <p className="card-text-type">{product.name}</p>
                            <p className="card-price-type">{product.price}</p>
                        </td>
                    )
                }
                else{
                    row[1].push(
                        <td className="li0" key={index} onClick={()=>{
                            localStorage.setItem("book_id",product.book_id);
                            this.props.history.push({
                                pathname: '/BookDetail',
                                params: {
                                    id: product.book_id
                                }
                            })}}>
                            <img src={product.imag} className="card-img-type"/>
                            <p className="card-text-type">{product.name}</p>
                            <p className="card-price-type">{product.price}</p>
                        </td>
                    )
                }
                ++i;
            }
        )
        // while (i<10){
        //     if (i<=4){
        //         row[0].push(
        //             <td className="li0"> </td>
        //         )
        //     }
        //     else{
        //         row[1].push(
        //             <td className="li0"> </td>
        //         )
        //     }
        //     ++i;
        // }
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

export default BookRow;