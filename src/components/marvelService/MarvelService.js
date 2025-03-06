class MarvelService {
  _apikey = "apikey=5d535e952d80fa6e9a041ddd8342ef8d";
  _api = "https://gateway.marvel.com:443/v1/public/";
  _baseOffset = 210;

  getResource = async (url) => {
    let res = await fetch(url);

    if (!res.ok) {
      throw new Error(`Couldn't fetch ${url} because ${res.status}`);
    }

    return await res.json();
  };

  getAllCharacters = async (offset = this._baseOffset) => {
    const res = await this.getResource(
      `${this._api}characters?offset=${offset}&${this._apikey}`
    );
    return res.data.results.map(this._transformCharCharacter)
  };

  getCharacter = async (id) => {
    let res = await this.getResource(`${this._api}characters/${id}?offset=9&${this._apikey}`)
    return this._transformCharCharacter(res.data.results[0])
  }

  _transformCharCharacter = (char) => {
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
}

export default MarvelService;
