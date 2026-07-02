import "./charList.scss";
import { useState, useEffect, useRef } from "react";
import useMarvelService from "../marvelService/MarvelService";
import ErrorMessage from "../errorMessage/ErrorMessage";
import Spinner from "../spinner/Spinner";
import PropTypes from "prop-types";

const CharList = (props) => {
  const [charList, setChar] = useState([]);
  const [newCharList, setNewList] = useState(false);
  const [offset, setOffset] = useState(210);
  const [charListEnded, setEndList] = useState(false);

  const { getAllCharacters, loading, error } = useMarvelService();

  useEffect(() => {
    onRequest(offset, true);
  }, []);

  const itemRefs = useRef([]);

  const onRequest = (offset, initial) => {
    initial ? setNewList(false) : setNewList(true);
    getAllCharacters(offset).then(charListLoaded);
  };

  const onCharLoading = () => {
    setNewList(true);
  };

  const charListLoaded = (newCharList) => {
    let ended = false;
    if (newCharList.length < 9) {
      ended = true;
    }

    setChar((charList) => [...charList, ...newCharList]);
    setNewList((newCharList) => true);
    setOffset((offset) => offset + 9);
    setEndList((charListEnded) => true);

    const focusOnItem = (id) => {
      itemRefs.current.forEach((item) =>
        item.classList.remove("char__item_selected"),
      );
      itemRefs.current[id].focus();
      itemRefs.current[id].classList.add("char__item_selected");
    };

    function charRenderItem(arr) {
      const items = arr.map((item, i) => {
        let imgStyle = { objectFit: "cover" };
        if (
          item ===
          "http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg"
        ) {
          imgStyle = { objectFit: "unset" };
        }
        return (
          <li
            className="char__item"
            key={item.id}
            ref={(el) => (itemRefs.current[i] = el)}
            onClick={() => {
              props.charSelected(item.id);
              focusOnItem(i);
            }}
            onKeyPress={(e) => {
              if (e.key === "" || e.key === "Enter") {
                props.charSelected(item.id);
                focusOnItem(i);
              }
            }}
          >
            <img src={item.image} alt={item.name} style={imgStyle} />
            <div className="char__name">{item.name}</div>
          </li>
        );
      });
      return <ul className="char__grid">{items}</ul>;
    }

    const items = charRenderItem(charList);

    const errorMessage = error ? <ErrorMessage /> : null;
    const spinner = loading && !newCharList ? <Spinner /> : null;

    return (
      <div className="char__list">
        {spinner}
        {errorMessage}
        {items}
        <button
          className="button button__main button__long"
          disabled={onCharLoading}
          style={{ display: charListEnded ? "none" : "block" }}
          onClick={() => onRequest(offset)}
        >
          <div className="inner">load more</div>
        </button>
      </div>
    );
  };
};

CharList.propTypes = {
  charSelected: PropTypes.func.isRequired,
};

export default CharList;
