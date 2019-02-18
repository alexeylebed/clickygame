import React from "react";


function Card(props){
    return (
        <div 
            className = 'card' 
            style = {{background: `url(${props.image})`, backgroundSize: "cover"}}
            onClick = {props.handleClick}
            id = {props.id}>
        </div>
    );
}

export default Card;

