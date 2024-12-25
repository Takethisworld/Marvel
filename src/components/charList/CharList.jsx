import "./charList.scss";
import abyss from "../../resource/img/abyss.jpg";
import { Component } from "react";
import MarvelService from "../marvelService/MarvelService";
import ErrorMessage from "../errorMessage/ErrorMessage";
import Spinner from "../spinner/Spinner";

class CharList extends Component {
  state = {
    charList: [],
    error: false,
    loading: true,
  };

  marvelService = new MarvelService();

  componentDidMount() {
    this.marvelService
      .getAllCharacters()
      .then(this.charListLoaded)
      .catch(this.onError);
  }

  charListLoaded = (charList) => {
    this.setState({
      charList,
      loading: false,
    });
  };

  onError() {
    this.setState({
      loading: false,
      error: true,
    });
  }

  charRenderItem = (arr) => {
    const items = arr.map((items) => {
      let imgStyle = { objectFit: " cover" };
      if (
        items.thumbnail ===
        "http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg"
      ) {
        imgStyle = { objectFit: "unset" };
      }

      return (
        <li className="char__item" key={items.id}>
          <img src={items.thumbnail} alt={items.name} style={imgStyle} />
          <div className="char__name">{items.name}</div>
        </li>
      );
    });
    return <ul className="char__grid">{items}</ul>;
  };

  uploadChar = () => {
    const id = Math.floor(Math.random() * (1011400 - 1011000) + 1011000);
    this.marvelService
      .getCharacter(id)
      .then(this.onCharLoaded)
      .catch(this.onError);
  };

  render() {
    const { charList, error, loading } = this.state;

    const items = this.charRenderItem(charList);
    const errorMessage = error ? <ErrorMessage /> : null;
    const spinner = loading ? <Spinner /> : null;
    const content = !(loading || error) ? items : null;

    return (
      <div className="char__list">
        {spinner}
        {errorMessage}
        {content}
        <button className="button button__main button__long">
          <div className="inner">load more</div>
        </button>
      </div>
    );
  }
}

export default CharList;
