import React, { Component} from 'react';
import TableList from './Tablelist/Tablelist';
import Paginate from "./Paginate/paginate";
import style from "./App.css"
import axios from "axios";

class App extends Component {


  state={
    data:[],
    filterdata:[],
    wholedata:[],
    itemsperpage:5,
    currentpage:1,
    newdata:{},
    buttontext:"Add New Row",
    filterparams:["",""]
  }
  componentDidMount(){
    axios.get("/react_table_ashwin/data.json").then((res)=>{
      console.log(res);
      var data=res.data;
      data=data.map(a=>({...a,...a.nutritions}))
      this.setState({data:[...data],wholedata:[...data],filterdata:[...data]},()=>{
        this.paginate(1);
      })
      
    })
  }
  addData=(state)=>{
    this.setState({newdata:{...state}});
  }
  addnewRow=()=>{
    var buttontext=(this.state.buttontext==="Submit")?"Add New Row":"Submit";
    var row={...this.state.newdata};
    var alldata=[...this.state.wholedata];
    if(Object.keys(this.state.newdata).length!==0)alldata.push(row);
    this.setState({newdata:{},wholedata:alldata,buttontext},()=>{
        this.filter(...this.state.filterparams);
    })
  }

  updatecurrent=(num)=>{this.paginate(num)}

  paginate=(num)=>{
    var firstElem=(num-1)*this.state.itemsperpage;
    var data=[...this.state.filterdata];
    data=data.splice(firstElem,this.state.itemsperpage);
    this.setState({data:data});
  }
  filter=(val,key)=>{
    var newdata=[...this.state.wholedata];
    if(val){
      newdata=newdata.filter(a=>{
      if((""+a[key]).toLowerCase().indexOf(val.toLowerCase())==-1)return false;
      else return true;
    })
  }
    this.setState({data:newdata,filterdata:newdata,filterparams:[val,key]},()=>{
      this.paginate(1);
    })
  }
  commonfilter=(value)=>{
    var newdata=[...this.state.wholedata];
    if(value){
      newdata=newdata.filter(a=>{
        var rowstring=Object.values(a).reduce((acc,x)=>(""+acc+x).toLowerCase());
        if(rowstring.indexOf(value.toLowerCase())===-1)return false;
        else return true;
      })
    }
    this.setState({data:newdata,filterdata:newdata},()=>{
      this.paginate(1);
    })

  }

  sort=(key,dir)=>{
    var sortdata=[...this.state.wholedata];
    sortdata.sort((a,b)=>{
        if(!a[key]||!b[key])return -1;
        return (a[key]>b[key])?dir:-dir;
    })
    this.setState({wholedata:sortdata},()=>{this.filter(...this.state.filterparams);})
  }

  render() {
    return (
      <div className={style.App}>
        <div style={{textAlign:"right",width:"70%",margin:"auto"}}><label>Common Search </label><input onChange={(e)=>{this.commonfilter(e.target.value)}}/></div>
        <TableList itemList={this.state.data}  filter={this.filter} add={this.state.buttontext} addData={this.addData} sort={this.sort}/>
        <Paginate datalength={this.state.filterdata.length} updatecurrent={this.updatecurrent} ipp={this.state.itemsperpage}></Paginate>
        <button onClick={this.addnewRow} 
        className={style.button}>{this.state.buttontext}</button>
      </div>
    );
  }
}

export default App;
