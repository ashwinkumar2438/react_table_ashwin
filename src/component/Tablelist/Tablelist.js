import React,{useState,forwardRef} from 'react'
import style from './Tablelist.css'


const TableList = ({ itemList, filter,add,addData,sort}) => {
    
    
    let [state,updateState]=useState({});
    let [sortstate,updateSort]=useState({});
    let [current,updatecurrent]=useState("");
    let update=(key,value,updateParent)=>{
        let currentstate={...state};
        currentstate[key]=value;
        updateParent(currentstate);
        updateState(currentstate);

    }
    let emptystate=()=>{
        console.log("State has been emptied.");
        if(Object.keys(state).length)updateState({});
        return null;
    }
    let sortdata=(key)=>{
        if(!sortstate[key])sortstate[key]=-1;
            let dir=sortstate[key]===1?-1:1;
            sort(key,dir);
            sortstate[key]=dir;
            console.log(key);
            updateSort(sortstate);
            updatecurrent(key);
        
    }
    return (
        <div className="table-users">
            <div className={style.header}>Fruit List</div>
        
            <table >
                <thead>
                        <tr>
                            <th rowSpan="2"><h5 onClick={sortdata.bind(null,'id')}>ID {(current=='id')?(sortstate['id']===1)?<span>&#8679;</span>:<span>&#8681;</span>:null}</h5><input onChange={(e)=>{filter(e.target.value,'id')}}/></th>
                            <th rowSpan="2"><h5 onClick={sortdata.bind(null,'name')}>Name{(current=='name')?(sortstate['name']===1)?<span>&#8679;</span>:<span>&#8681;</span>:null}</h5><input onChange={(e)=>{filter(e.target.value,'name')}}/></th>
                            <th rowSpan="2"><h5 onClick={sortdata.bind(null,'genus')}>Genus{(current=='genus')?(sortstate['genus']===1)?<span>&#8679;</span>:<span>&#8681;</span>:null}</h5><input onChange={(e)=>{filter(e.target.value,'genus')}}/></th>
                            <th rowSpan="2"><h5 onClick={sortdata.bind(null,'family')}>Family{(current=='family')?(sortstate['family']===1)?<span>&#8679;</span>:<span>&#8681;</span>:null}</h5><input onChange={(e)=>{filter(e.target.value,'family')}}/></th>
                            <th rowSpan="2"><h5 onClick={sortdata.bind(null,'order')}>Order{(current=='order')?(sortstate['order']===1)?<span>&#8679;</span>:<span>&#8681;</span>:null}</h5><input onChange={(e)=>{filter(e.target.value,'order')}}/></th>
                            <th colSpan = "5"><h5>Nutrition</h5></th>
                        </tr>
                        <tr>
                            <th><h5 onClick={sortdata.bind(null,'carbohydrates')}>Carbohydrates{(current=='carbohydrates')?(sortstate['carbohydrates']===1)?<span>&#8679;</span>:<span>&#8681;</span>:null}</h5><input onChange={(e)=>{filter(e.target.value,'carbohydrates')}}/></th>
                            <th><h5 onClick={sortdata.bind(null,'protein')}>Protein{(current=='protein')?(sortstate['protein']===1)?<span>&#8679;</span>:<span>&#8681;</span>:null}</h5><input onChange={(e)=>{filter(e.target.value,'protein')}}/></th>
                            <th><h5 onClick={sortdata.bind(null,'fat')}>Fat{(current=='fat')?(sortstate['fat']===1)?<span>&#8679;</span>:<span>&#8681;</span>:null}</h5><input onChange={(e)=>{filter(e.target.value,'fat')}}/></th>
                            <th><h5 onClick={sortdata.bind(null,'calories')}>Calories{(current=='calories')?(sortstate['calories']===1)?<span>&#8679;</span>:<span>&#8681;</span>:null}</h5><input onChange={(e)=>{filter(e.target.value,'calories')}}/></th>
                            <th><h5 onClick={sortdata.bind(null,'sugar')}>Sugar{(current=='sugar')?(sortstate['sugar']===1)?<span>&#8679;</span>:<span>&#8681;</span>:null}</h5><input onChange={(e)=>{filter(e.target.value,'sugar')}}/></th>
                        </tr>
                </thead>
                

            <tbody>
                { itemList.map((item, index) => (
                    <tr key={index}>
                        <td>{item.id}</td>
                        <td>{item.name}</td>
                        <td>{item.genus}</td>
                        <td>{item.family}</td>
                        <td>{item.order}</td>
                        <td>{item.carbohydrates}</td>
                        <td>{item.protein}</td>
                        <td>{item.fat}</td>
                        <td>{item.calories}</td>
                        <td>{item.sugar}</td>
                    </tr>
                ))} 
                {(add==="Submit")?(
                <tr>
                    <td><input onBlur={(e)=>{update('id',e.target.value,addData)}}/></td>
                    <td><input onBlur={(e)=>{update('name',e.target.value,addData)}}/></td>
                    <td><input onBlur={(e)=>{update('genus',e.target.value,addData)}}/></td>
                    <td><input onBlur={(e)=>{update('family',e.target.value,addData)}}/></td>
                    <td><input onBlur={(e)=>{update('order',e.target.value,addData)}}/></td>
                    <td><input onBlur={(e)=>{update('carbohydrates',e.target.value,addData)}}/></td>
                    <td><input onBlur={(e)=>{update('protein',e.target.value,addData)}}/></td>
                    <td><input onBlur={(e)=>{update('fat',e.target.value,addData)}}/></td>
                    <td><input onBlur={(e)=>{update('calories',e.target.value,addData)}}/></td>
                    <td><input onBlur={(e)=>{update('sugar',e.target.value,addData)}}/></td>
                </tr>):emptystate()
                }
               </tbody> 
            </table>
        </div>
    )
}


export default TableList