import React from 'react';
import axios from 'axios';
import ReactDOM from 'react-dom';
import Input from './Input.jsx';
import GetData from './GetData.jsx'
class Header extends React.Component {  
	constructor(props) {
    super(props);
    this.state = {
      Heading:[]
    }
    this.fetchAuthor = this.fetchAuthor.bind(this);
  }

    fetchAuthor() {
	axios.get('http://localhost:8081/')
      .then( (response) => {
        console.log("response", response);
        this.setState({
          Heading : response.data		  
        });
      })
      .catch( (error) => {
        console.log(error);
      });  
  }
  
   render() {
      
      return (
        
		<div style={{backgroundColor:'#9090e0'}}  >	
		<button onClick={this.fetchAuthor}>Click to get App Details </button>
		<h4>Project Title:{this.state.Heading.Title}</h4>
		<h4>Author:{this.state.Heading.Author}</h4>
		<h4>Date:{this.state.Heading.Date}</h4>
		<h4>Version:{this.state.Heading.Version}</h4>
		
		<Input/>
		</div>
      );
   }
}

export default Header;


