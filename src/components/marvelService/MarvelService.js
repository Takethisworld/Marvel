import { useState, useEffect } from 'react';
import useHttp from '../../hooks/http.hook';

const useMarvelService = () => {
  const _apikey = "b5282a5848f0247afda12eed204eaa42";
  const _api = "https://superheroapi.com/api/";
  const _baseOffset = 210;

  const { loading, request, error } = useHttp();

  const getAllCharacters = async (offset = _baseOffset) => {
    const res = await request(
      `${_api}${_apikey}/70`
    );
    return res.data.results.map(_transformCharCharacter)
  };

  const getCharacter = async (id) => {
    let res = await request(`${_api}${_apikey}/character-${id}?offset=9&`)
    return _transformCharCharacter(res.data.results[0])
  }

  const _transformCharCharacter = (char) => {
    return {
      id: char.id,
      name: char.name,
      description: char.description ? `${char.description.slice(0, 210)}...` : 'There Hero description',
      thumbnail:
        char.thumbnail.path +
        "." +
        char.thumbnail.extension,
      homepage: char.urls[0].url,
      wiki: char.urls[1].url,
      comics: char.comics.items
    }
  }
  return { loading, error, getAllCharacters, getCharacter }
}

export default useMarvelService;
