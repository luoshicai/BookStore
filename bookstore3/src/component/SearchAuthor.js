import React, {useState, useEffect, useRef} from "react";
import {Input, Table} from "antd";
import {SearchAuthorByBook} from "../service/bookService";
import BookSearchTable from "./BookSearchTable";

const { Search } = Input;

const SearchAuthor = (props) =>{

    const [bookName, setBookName] = useState([]);

    const callback = (data) =>{
        if (data.message=="success"){
            let bookname = bookName;
            let authorName = data.data.toString();
            authorName = authorName.substring(12);
            alert(`${bookname}的作者为:${authorName}`);
        }
        else{
            let bookname = bookName;
            alert(`没有名为${bookname}的书籍,请重新输入!`);
        }
    }

    const onSearch = (value) =>{
        setBookName(value);
        SearchAuthorByBook(value,callback);
    }

    return (
        <div>
            <div>
                <Search
                    onSearch={onSearch}
                    placeholder="input search text" enterButton="Search" size="large" />
            </div>
        </div>
    )
}

export default SearchAuthor;
