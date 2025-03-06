import "./charList.scss";
import { Component } from "react";
import MarvelService from "../marvelService/MarvelService";
import ErrorMessage from "../errorMessage/ErrorMessage";
import Spinner from "../spinner/Spinner";
import PropTypes from "prop-types";

class CharList extends Component {
  state = {
    charList: [],
    error: false,
    loading: true,
    newCharList: false,
    offset: 210,
    charListEnded: false,
  };

  marvelService = new MarvelService();

  componentDidMount() {
    this.onRequest();
  }

  charListLoaded = (newCharList) => {
    let charListEnded = false;
    if (newCharList.length < 9) {
      charListEnded = true;
    }

    this.setState(({ offset, charList }) => ({
      charList: [...charList, ...newCharList],
      loading: false,
      newCharList: true,
      offset: offset + 9,
      charListEnded: charListEnded,
    }));
  };

  onCharLoading = () => {
    this.setState({
      newCharList: true,
    });
  };

  onRequest = (offset) => {
    this.onCharLoading();
    this.marvelService
      .getAllCharacters(offset)
      .then(this.charListLoaded)
      .catch(this.onError);
  };

  onError() {
    this.setState({
      loading: false,
      error: true,
    });
  }

  itemRefs = [];

  setRefs = (ref) => {
    this.itemRefs.push(ref);
  };

  focusOnItem = (id) => {
    this.itemRefs.forEach((item) =>
      item.classList.remove("char__item_selected")
    );
    this.itemRefs[id].classList.add("char__item_selected");
    this.itemRefs[id].focus();
  };

  charRenderItem = (arr) => {
    const items = arr.map((item, i) => {
      let imgStyle = { objectFit: "cover" };
      if (
        item.thumbnail ===
        "http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg"
      ) {
        imgStyle = { objectFit: "unset" };
      }

      return (
        <li
          className="char__item"
          key={item.id}
          ref={this.setRefs}
          onClick={() => {
            this.props.charSelected(item.id);
            this.focusOnItem(i);
          }}
          onKeyPress={(e) => {
            if (e.key === "" || e.key === "Enter") {
              this.props.charSelected(item.id);
              this.focusOnItem(i);
            }
          }}
        >
          <img src={item.thumbnail} alt={item.name} style={imgStyle} />
          <div className="char__name">{item.name}</div>
        </li>
      );
    });
    return <ul className="char__grid">{items}</ul>;
  };

  render() {
    const { charList, error, loading, offset, onCharLoading, charListEnded } =
      this.state;

    const items = this.charRenderItem(charList);
    const errorMessage = error ? <ErrorMessage /> : null;
    const spinner = loading ? <Spinner /> : null;
    const content = !(loading || error) ? items : null;

    return (
      <div className="char__list">
        {spinner}
        {errorMessage}
        {content}
        <button
          className="button button__main button__long"
          disabled={onCharLoading}
          style={{ display: charListEnded ? "none" : "block" }}
          onClick={() => this.onRequest(offset)}
        >
          <div className="inner">load more</div>
        </button>
      </div>
    );
  }
}

CharList.propTypes = {
  charSelected: PropTypes.func.isRequired,
};

export default CharList;
