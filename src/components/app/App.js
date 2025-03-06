
import AppHeader from "../appHeader/AppHeader";
import CharList from "../charList/CharList";
import CharInfo from "../charInfo/CharInfo";
import RandomChar from "../randomChar/RandomChar";
import decoration from '../../resource/img/vision.png'
import { Component } from "react";
import ErrorBoundle from "../errorBoundle/errorBoundle";

class App extends Component {
  state = {
    selectedChar: null
  }

  onCharSelected = (id) => {
    this.setState({
      selectedChar: id
    })
  }

  render() {
    return (
      <div className="app">
        <AppHeader />
        <main>
          <ErrorBoundle>
            <RandomChar />
          </ErrorBoundle>
          <div className="char__content">
            <ErrorBoundle>
              <CharList charSelected={this.onCharSelected} />
            </ErrorBoundle>
            <ErrorBoundle>
              <CharInfo charId={this.state.selectedChar} />
            </ErrorBoundle>
          </div>
          <img className="bg-decoration" src={decoration} alt="vision" />
        </main>
      </div>
    )
  };
}

export default App;
