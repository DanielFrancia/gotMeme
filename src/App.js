import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

const memelist="https://api.imgflip.com/get_memes"

class App extends Component {

  state={
    memes:null,
    picture:null,
    toptxt:"",
    bottxt:""
  }

  componentWillMount(){
   fetch(memelist)
    .then(data=>data.json())
    .then(data=>{
      const matic=data.data.memes[0]
      const event={target:{value:matic.url}}
      this.setPic(event)
      return data
    })
    .then(data=> this.setState({memes:data.data}))
  }

  setPic=(event)=>{
    const pix=event.target.value
    this.setState({picture:pix})
  }

  upText=(event)=>{
    const up=event.target.value
    this.setState({toptxt:up})
  }

  botText=(event)=>{
    const bot=event.target.value
    this.setState({bottxt:bot})
  }


  render() {
    if(!this.state.memes){
      return (
        <div>
          LOADING
        </div>
      )
    }    
    return (
      <div className="container">
        <div className="output">
          <img className="pic" src={this.state.picture} alt={this.state.memes.memes.name} width="500" height="400"/><br/><br/><br/>
          <div className="upp">{this.state.toptxt.toUpperCase()}</div>
          <div className="bott">{this.state.bottxt.toUpperCase()}</div>
        </div>
        <div className="input">
          <div className="slect">
            <select onChange={this.setPic}>
              {this.state.memes.memes.map(meme=><option value={meme.url}>{meme.name}</option>)}
            </select>
            </div>
          <br/><br/>
          <span>TOP TEXT</span><input className="top" type="text" onChange={this.upText} value={this.state.toptxt}/><br/><br/>
          <span>BOTTOM TEXT</span><input className="bot" type="text" onChange={this.botText} value={this.state.bottxt}/>
        </div>
        
      </div>
    );
  }
}

export default App;
