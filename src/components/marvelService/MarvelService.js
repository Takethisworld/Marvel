import useHttp from '../../hooks/http.hook';

const useMarvelService = () => {
  const _proxy = 'https://cors-anywhere.herokuapp.com/';
  const _apikey = "840f47a904fec0329a94aaebf82686f17f10e6eb";
  const _apiBase = "https://comicvine.gamespot.com/api/characters";
  const _api = `${_proxy}${_apiBase}?api_key=${_apikey}&format=json&limit=20&field_list=id,name,image,deck`;
  const _baseOffset = 20;

  const { loading, request, error, clearError } = useHttp();

  const getAllCharacters = async (offset = _baseOffset) => {
    const res = await request(`${_api}/${_apikey}/characters/?offset=${offset}`);
    return res.results.map(_transformCharCharacter);
  };

  const getCharacter = async (id) => {
    let res = await request(`${_api}/${_apikey}/character/4005-${id}/`);
    console.log(res.results[0])
    return _transformCharCharacter(res.results[0]);
  }

  const _transformCharCharacter = (char) => {
    console.log('char', char);
    return {
      id: char.id,
      name: char.name,
      image: char.image.medium_url
      ,
    }
  }
  return { loading, error, getCharacter, getAllCharacters, clearError }
}

export default useMarvelService;
