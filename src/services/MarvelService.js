import {useHttp} from "../hooks/http.hook"
// файлы для взаимодействия с сервером


// создаем класс, здесь мы не импорттируем компонент и не наследуем ничего, так как класс будет на чистом Js. 

const useMarvelService = () => {
    const {loading, request, error, clearError} = useHttp();

    const _apiBase =  'https://gateway.marvel.com:443/v1/public/';
    const _apiKey ='apikey=158c7e484bbe3f594246c0ba7c72b090';
    const _baseOffset = 210;

    
     // функция для отправки get запросов
    
    // методы которые будут делать запросы
    const getAllCharacters =  async (offset = _baseOffset) => {
        const res = await request(`${_apiBase}characters?limit=9&offset=${offset}&${_apiKey}`);
        return res.data.results.map(_transformCharacter)
    }
    // получение только одного персонажа
    const getCharacter = async (id) => {
        const res = await request(`${_apiBase}characters/${id}?${_apiKey}`);
        return _transformCharacter(res.data.results[0]);
    }

    // метод трансформации данных в нужный нам формат
    const _transformCharacter = (char) => {
          return {
            id: char.id,
            name: char.name,
            description: char.description,
            thumbnail: char.thumbnail.path + '.' + char.thumbnail.extension,
            homepage: char.urls[0].url,
            wiki: char.urls[0].url,
            comics: char.comics.items
          }
    }

    return {loading, error, getAllCharacters, getCharacter, clearError}
}


export default useMarvelService;