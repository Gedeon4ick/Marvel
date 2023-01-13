import './randomChar.scss';
import { Component } from 'react';
import thor from '../../resources/img/thor.jpeg';
import mjolnir from '../../resources/img/mjolnir.png';
import MarvelService from '../../services/MarvelService';
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';




class RandomChar extends Component {

    state = {
       char: {},
       loading: true,
       error: false
    }

    marvelService = new MarvelService();

    componentDidMount() {
        this.updataChar();
        // this.timerId = setInterval(this.updataChar, 3000)
    }

    componentWillUnmount() {
        clearInterval(this.timerId);
    }

    onChatLoaded = (char) => {
        this.setState({char, loading: false})
    }

    onCharLoading = () => {
        this.setState({
            loading: true
        })
    }

    onError = () => {
        this.setState({
            loading: false,
            error: true
        })
    }

    updataChar = () => {
        const id = Math.floor(Math.random() * (1011400 - 1011000) + 1011000);
        this.onCharLoading();
        this.marvelService
            .getCharacter(id)
            .then(this.onChatLoaded)
            .catch(this.onError);
    }

    
    

    render() {
        const {char, loading, error} = this.state;
        const errorMessage = error ? <ErrorMessage/> : null;
        const spiner = loading ? <Spinner/> : null;
        const content = !(loading || error) ? <View char={char}/> : null;
  
        return (
            <div className="randomchar">
                {errorMessage}
                {spiner}
                {content}
                <div className="randomchar__static">
                    <p className="randomchar__title">
                        Random character for today!<br/>
                        Do you want to get to know him better?
                    </p>
                    <p className="randomchar__title">
                        Or choose another one
                    </p>
                    <button onClick={this.updataChar} className="button button__main">
                        <div className="inner">try it</div>
                    </button>
                    <img src={mjolnir} alt="mjolnir"  className="randomchar__decoration"/>
                </div>
            </div>
        )
    }
}

const View = ({char}) => {
    const {name, description, thumbnail, homepage, wiki} = char;

    return (
        <div className="randomchar__block">
            <img src={thumbnail} alt="Random character" className={thumbnail == null ? "randomchar__img" : "randomchar__img active"}/>
            <div className="randomchar__info">
                <p className="randomchar__name">{name}</p>
                <p className="randomchar__descr">
                    {description == null ? description : "Данных по персонажу нет"}
                </p>
                <div className="randomchar__btns">
                    <a href={homepage} className="button button__main">
                        <div className="inner">Homepage</div>
                    </a>
                    <a href={wiki} className="button button__secondary">
                        <div className="inner">Wiki</div>
                    </a>
                </div>
            </div>
        </div>
    )
}

export default RandomChar;