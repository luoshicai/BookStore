import React from "react";

function FunctionIcon(props){

    return(
        <button className="FunctionIcon-type">
            <div className="FunctionIcon-fa-type">
                <i className={props.url}> </i>
            </div>
            <p className="FunctionIcon-text-type">{props.name}</p>
        </button>
    );
}

export default FunctionIcon;