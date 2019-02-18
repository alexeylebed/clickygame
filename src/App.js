import React, { Component } from 'react';
import faces from "./friends.json";
import Card from "./Components/Card"

class App extends Component {
  state = {
    score: 0,
    topScore: 0,
    faces,
    pickedFaces: [],
    clicked: [],
    alert: 'none'
  }

  renderFaces = arr => {
    let i = 0;
    let pickedFaces = [];
    //console.log(this.state)
    for (i = 0; i < 8; i++){
      pickedFaces.push({object: this.state.faces[Math.floor(Math.random(0, arr.length)*arr.length)], id: i});
      //console.log(pickedFaces[i]);
    }
    //console.log(pickedFaces);
    this.setState({
      pickedFaces: pickedFaces,
    })
  }

  incrementState = (id) => {
    console.log(this.state)
    this.setState( prevState => {
      return ({score: prevState.score + 1 , clicked: [...prevState.clicked, id], topScore: (this.state.score >= this.state.topScore) ? prevState.score + 1 : prevState.score})
    })
    this.renderFaces(faces);
  }

  checkIfClickedTwice = (id) => {
    let matchIndex = 0;
    this.state.clicked.forEach(item => {
      if(Number(item) === Number(id)){
        matchIndex++;
      } 
    })
    if(matchIndex > 0){
      return false;
    } else {
      return true;
    }
  }
  showAlert = () =>{
    this.setState({alert : "block"}, () =>{
      setTimeout(() =>{
        this.setState({alert : "none"},  () =>{
        })
      } , 1500)
    })
  }
  gameFailed = () => {
    this.setState( prevState => {
      return ({score: 0, clicked: []})
    })
    this.renderFaces(faces);
    this.showAlert();
  }

  handleClick = event => {
    let id = event.target.id;
    if(this.checkIfClickedTwice(event.target.id)){
        this.incrementState(id)
    } else {
        this.gameFailed(faces)
    }
  }

  componentDidMount(){
    this.renderFaces(faces);
  }

  render() {
    return (
      <div>
        <header>
            <div className="progname">Clicker</div>
            <div className = 'scoresWrapper'>
                <div className ="score">Score: {this.state.score}</div>
                <div className ="topScore">Top Score: {this.state.topScore}</div>
            </div>
            <div className = "alert" style = {{display: this.state.alert}}>You lose Bro!</div>
        </header>
        <div className = 'container'>
            {this.state.pickedFaces.map(item => 
                <Card 
                  image = {item.object.image}
                  key = {item.id}
                  id = {item.object.id}
                  handleClick = {this.handleClick}
                 />
            )}
        </div>
      </div>
    );
  }
}

export default App;
