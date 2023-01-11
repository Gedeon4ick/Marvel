// файлы для взаимодействия с сервером

// создаем класс, здесь мы не импорттируем компонент и не наследуем ничего, так как класс будет на чистом Js. 

class MarvelService {
    _apiBase =  'https://gateway.marvel.com:443/v1/public/';
    _apiKey ='apikey=158c7e484bbe3f594246c0ba7c72b090';
     // функция для отправки get запросов
    getResource = async (url) => {
        let res = await fetch(url);

        if (!res.ok) {
            throw new Error(`Could not fetch ${url}, status: ${res.status}`);
        }

        return await res.json();
    }
    // методы которые будут делать запросы
    getAllCharacters =  async () => {
        const res = await this.getResource(`${this._apiBase}characters?limit=9offset=210&${this._apiKey}`);
        return res.data.results.map(this._transformCharacter)
    }
    // получение только одного персонажа
    getCharacter = async (id) => {
        const res = await this.getResource(`${this._apiBase}characters/${id}?${this._apiKey}`);
        return this._transformCharacter(res.data.results[0]);
    }

    // метод трансформации данных в нужный нам формат
    _transformCharacter = (char) => {
          return {
            id: char.id,
            name: char.name,
            description: char.description,
            thumbnail: char.thumbnail.path + '.' + char.thumbnail.extension,
            homepage: char.urls[0].url,
            wiki: char.urls[0].url
          }
    }
}

export default MarvelService;