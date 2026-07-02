import { useState, useEffect } from "react";
import useMarvelService from "../marvelService/MarvelService";

const ComicsList = () => {
    const [comics, setComics] = useState([]);

    const { getAllComics, loading, error } = useMarvelService();

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
}