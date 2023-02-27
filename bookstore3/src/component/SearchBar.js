import React from "react";

class SearchBar extends React.Component{
    constructor(props) {
        super(props);
    }
    render() {
        return <div className="SearchBar-position">
            <input type="text" className="SearchBar-type" placeholder="请输入你想要搜索的内容"/>
            <button type="submit" className="fa fa-search" id="SearchBar-button"> </button>
        </div>;
    }
}

export default SearchBar;