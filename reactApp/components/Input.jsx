import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';

class Input extends React.Component { 
    constructor(props) {
    super(props);
    this.state = {
	  Rnumber:['I','V','X','L','C','D','M'],
      data : [],
	  cells : [],
	  name : '',
	  value:"I",
	  error:'',
	  DataSet:[],
	  Data:'',
	  Dvalue:'',
	  Derror:'',
	  Coin:[],
	  Ques:'',
	  Qerror:'',
	  validate:'',
	  Ans:'',
	  response:0
    }
	
	
    this.addChild = this.addChild.bind(this);
	this.addChilddata = this.addChilddata.bind(this);
	this.getAnswer = this.getAnswer.bind(this);
	this.fetchValue = this.fetchValue.bind(this);
	this.initialValid = this.initialValid.bind(this);
	this.handleChangeQues = this.handleChangeQues.bind(this);
	this.handleChangeName = this.handleChangeName.bind(this);
	this.handleChangeValue = this.handleChangeValue.bind(this);
	this.handleChangeData = this.handleChangeData.bind(this);
	this.handleChangeDvalue = this.handleChangeDvalue.bind(this);
  }

    addChild() {
        // State change will cause component re-render
		var error="";	
        if(this.state.name != null && this.state.name.length > 0)	{	
	     var temp = new Object();
			temp["name"] = this.state.name;
			temp["value"] = this.state.value; 
		var count =0;
		var check =true;
		
		
        this.state.data.forEach(function(obj) {
		count ++;
		if (temp.name.toLowerCase() == obj.name.toLowerCase()){
		check=false;
		error ="Error Duplicate naming"
		}
		
		if(temp.value.toLowerCase() == obj.value.toLowerCase()  ){
		check=false;
		error +=" \n Error Duplicate value"
		}

		});	
        if (count == 0 || check){
		this.state.data.push(temp);	
		this.state.error ="";
		}else{
		this.state.error = error;
		}
		}else{
		this.state.error = "Error Please Enter the name"
		}
        // render update
		this.setState(this.state);
		
    }
	initialValid(){
	
	var cData = this.state.Data.split(" ");   //for validate
	  
	    var check = false;
		var val = ''
		if(cData.length <= 1) check=false;
		var tempcheck2=false;
		for (var i=0;i<cData.length && cData.length > 1 ; i++){
		var tempcheck1=false;
		
		this.state.data.forEach(function(obj){
		
		if(obj.name == cData[i] && i < cData.length-1 ){
		tempcheck1=true;
		val +=obj.value;
		}else if(i == cData.length-1 && obj.name != cData[i]){
		tempcheck2=true;
		}       		
		});
		if(!tempcheck1){ 
			break;
		}else{
			check=true;
        }		
		}
        check=tempcheck2;
		this.state.validate=val;
		this.setState(this.state);
		
		
	 return check;	
	}
	
	addChilddata() {
        // State change will cause component re-render
		var error="";	
        if(this.state.Data != null && this.state.Data.length > 0 && this.state.Dvalue >0)	{	
		 var temp1 = new Object();
	     var temp = new Object();
			temp["Data"] = this.state.Data;
			temp["Dvalue"] = this.state.Dvalue; 
		 var check=true;
		this.state.DataSet.forEach(function(obj) {
		if (temp.Data.toLowerCase() == obj.Data.toLowerCase()){
		check=false;
		error ="Error Duplicate naming"
		}
		});
		if(check){
		var cData = this.state.Data.split(" ");   //for validate
        check = this.initialValid();
			
		this.state.Coin.forEach(function(obj){
		if(cData[cData.length - 1] == obj.Data)	{
		check=false;
		error="Error duplicate coin";			
		}		
		});
		//validate part
		
		var revalue= this.fetchValue();
		
		if ( revalue > 0){		   
			temp1["Data"] = cData[cData.length - 1];
			temp1["Dvalue"] = this.state.Dvalue/revalue; 			
		}else{
		 check = false;
		 error="Error Input";		
		}		
		}else{
		this.state.Derror ="Error Data Duplicating"
		}
	    if(check){
		
		this.state.DataSet.push(temp);	
		this.state.Coin.push(temp1);
		this.state.Derror ="";
		}
		}else{
		this.state.Derror = "Error Please Enter the name"
		}
        // render update
		this.setState(this.state);
		
    }
	
	getAnswer(){
	 var ques = this.state.Ques.split(" ");
	 var ans = '';
	 var fill = '.';
	 var Cval = 1;
	 var fval = 0;
	if(this.state.Ques.indexOf("how much") == 0){
	   this.state.Data= ques.slice(3,-1).join(" ") + " ut";
	   ans = ques.slice(3,-1).join(" ") + " is ";
	}else if(this.state.Ques.indexOf("how many") == 0){
	   this.state.Data= ques.slice(4,-2).join(" ") + " ut";
	   ans = ques.slice(4,-1).join(" ") + " is ";
        fill = ' Credits.';
		this.state.Coin.forEach(function(obj){
		  if(obj.Data == ques[ques.length -2 ]) Cval=obj.Dvalue;		 
		});
		}
       	
	
	
	this.setState(this.state);
	var val = this.initialValid();
	if(!val){
	ans = 'I have no idea what you are talking about';
	fill = '.';
	}
	
	var Rval = this.fetchValue();
	if(Rval > 0){
	this.state.Ans=ans + Rval * Cval + fill;
	}else{
	this.state.Ans='I have no idea what you are talking about';
	}
	this.setState(this.state);
	
	}
	
	fetchValue() {
	var rval=0;
	var Rset = JSON.parse('{"I":1,"V":5,"X":10,"L":50,"C":100,"D":500,"M":1000}');
	var Ecount =JSON.parse('{"I":4,"V":1,"X":4,"L":1,"C":4,"D":1,"M":4}');
	if(this.state.validate.length >0){
        var Rnum = this.state.validate.split("");
		var seqC = 0;
		if(Rnum.length >1){
        for(var i=Rnum.length-1 ; i >=0 ; i--){
		 if(Ecount[Rnum[i]] >0){
		 Ecount[Rnum[i]] = Ecount[Rnum[i]] -1;
		 }
         else{
		 rval=0;
		 break;	
		 }
		 
		 if(i == Rnum.length-1){
		 rval=Rset[Rnum[i]];
		 seqC=1;
		 }
		 else{
		  
		   if(Rset[Rnum[i]] == Rset[Rnum[i+1]] && seqC < 3 && Rset[Rnum[i]].toString().indexOf("5") == -1){
		    seqC++;
			rval= rval +Rset[Rnum[i]];
			
		   }else if( Rset[Rnum[i]] < Rset[Rnum[i+1]] && (Rset[Rnum[i+1]]/Rset[Rnum[i]] == 5 || Rset[Rnum[i+1]]/Rset[Rnum[i]] == 10) && ( 2 * Rset[Rnum[i+1]] - Rset[Rnum[i]] > rval  || rval == Rset[Rnum[i+1]] ) ){
		   
		    rval= rval - Rset[Rnum[i]]
			Ecount[Rnum[i]] =0;
		   }
		   else if(Rset[Rnum[i]] > Rset[Rnum[i+1]]){
		    rval= rval +Rset[Rnum[i]];
		   }
		   else{
		   rval=0;
		   }
		   }
		 
		 
		 }
         
        		
	
	  
	  }else{
	   rval = Rset[this.state.validate];
	  }
	  }
	 return rval;
  }
	handleChangeName(event){this.setState({name: event.target.value});}
	handleChangeValue(event){ this.setState({value: event.target.value});}
	handleChangeData(event){ this.setState({Data: event.target.value});}
	handleChangeDvalue(event){ this.setState({Dvalue: event.target.value});}
	handleChangeQues(event){ this.setState({Ques: event.target.value}); }
    
	render() {
	  
      return (
        <div  >
                <h2>Get Roman_Number replace with Names Eg : glob </h2>
				<input type="text"  onChange={this.handleChangeName} name="name" /> is 
				<select name="value"  onChange={this.handleChangeValue} >
				{ 
				this.state.Rnumber.map((item) => (
				<option value={item} key={item}>{item}</option>
				))
                 
				}

				</select>
                <button onClick={this.addChild}>Add variables</button>
				{this.state.error}
				<div id='test'>
				<ul>
                { 
				this.state.data.map((item) => (
				<li key={item.name}>{item.name} is {item.value}</li>
				))
                 
				}
				
				</ul>
				
				</div>
				<div>
				<h2>Get data with Coins Eg : glob Gold</h2>
				<textarea type='text' rows="1" cols="50"  onChange={this.handleChangeData}/> is Credits : 
				<input type='number' onChange={this.handleChangeDvalue}/>
				<button onClick={this.addChilddata} >Add data</button> {this.state.Derror}
				</div>
				<div>
				<ul>
                { 
				this.state.DataSet.map((item) => (
				<li key={item.Data}>{item.Data} is Credits : {item.Dvalue}</li>
				))                
				}
				</ul>
				</div>
				<div>
				<h2>Calcutation of value and Credits</h2>
				<h3>eg : how many Credits is glob prok Gold ? </h3>
				<h3>eg : how much is pish tegj glob glob ?</h3>
				<textarea type='text' rows="1" cols="50" onChange={this.handleChangeQues} /> 
				<button onClick={this.getAnswer} >Get answer</button>
				</div>
				<div>
				<h1 >Answer:</h1>
				{this.state.Ans}
				</div>
				
            </div>
      );
   }
} 

export default Input;