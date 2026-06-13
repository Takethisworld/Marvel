
import AppHeader from "../appHeader/AppHeader";
import CharList from "../charList/CharList";
import CharInfo from "../charInfo/CharInfo";
import RandomChar from "../randomChar/RandomChar";
import decoration from '../../resource/img/vision.png'
import { useState } from "react";
import ErrorBoundle from "../errorBoundle/errorBoundle";

const App = () => {
  const [selectedChar, setChar] = useState(null)


  const onCharSelected = (id) => {
    setChar(id)
  }

  return (
    <div className="app">
      <AppHeader />
      <main>
        <ErrorBoundle>
          <RandomChar />
        </ErrorBoundle>
        <div className="char__content">
          <ErrorBoundle>
            <CharList charSelected={onCharSelected} />
          </ErrorBoundle>
          <ErrorBoundle>
            <CharInfo charId={selectedChar} />
          </ErrorBoundle>
        </div>
        <img className="bg-decoration" src={decoration} alt="vision" />
      </main>
    </div>
  )
}

export default App;
