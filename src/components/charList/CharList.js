import './charList.scss';
import { Component } from 'react';
import abyss from '../../resources/img/abyss.jpg';
import MarvelService from '../../services/MarvelService';
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';

class CharList  extends Component {
    
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

    onError = () => {
        this.setState({
            loading: false,
            error: true
        })
    }

    updataChar = () => {
        // const id = Math.floor(Math.random() * (1011400 - 1011000) + 1011000);
        this.marvelService
            .getAllCharacters()
            .then(this.onChatLoaded)
            .catch(this.onError);
    }

    render () {
        const {char, loading, error} = this.state;
        const errorMessage = error ? <ErrorMessage/> : null;
        const spiner = loading ? <Spinner/> : null;
        const content = !(loading || error) && char ? char.map((element) => {
            return (
                    <li 
                        key={element.id}
                        className="char__item"
                        onClick={() => this.props.onCharSelected(element.id)}>
                            <img src={element.thumbnail} alt="abyss" className={element.thumbnail == null ? null : "active"}/>
                            <div className="char__name">{element.name}</div>
                    </li>
            )
        }) : null;
        console.log(char); 


        return (

            <div className="char__list">
                {errorMessage}
                {spiner}
                <ul className="char__grid">
                    {content}
                </ul>
                <button className="button button__main button__long">
                    <div className="inner">load more</div>
                </button>
            </div>
        )
        
    }

    
}

// const CardList = ({char}) => {
//     const { name, thumbnail } = char;
//     <li className="char__item">
//         <img src={thumbnail} alt="abyss"/>
//         <div className="char__name">{name}</div>
//     </li>
// }


export default CharList;