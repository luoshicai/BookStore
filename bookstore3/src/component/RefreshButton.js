import React from "react";

function RefreshButton(props){
    return(
        <button className="RefreshButton-type">
            <div className="RefreshButton-fa-type">
                <i className={props.url}> </i>
            </div>
            <p className="RefreshButton-text-type">{props.name}</p>
        </button>
    );
}

export default RefreshButton;