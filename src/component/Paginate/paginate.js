import React from "react";
import style from "./paginate.css"

const paginate=({datalength,updatecurrent,ipp})=>{
    var length=Math.ceil(datalength/ipp);
    var liList=[];
    for(let i=1;i<=length;i++){
    liList.push(<li key={i}><a onClick={updatecurrent.bind(null,i)}>{i}</a></li>);
    }
    return (
        <ul className={style.paginatelist}>
           {
               liList
           } 
        </ul>
    )
}
export default paginate;