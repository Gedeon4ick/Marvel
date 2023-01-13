import './charList.scss';
import { Component } from 'react';
import abyss from '../../resources/img/abyss.jpg';
import MarvelService from '../../services/MarvelService';
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';

class CharList  extends Component {
    
    state = {
        charList: [],
        loading: true,
        error: false,
        newItemLoading: false,
        offset: 210
    }

    marvelService = new MarvelService();

    componentDidMount() {
        this.onRequest();
        // this.timerId = setInterval(this.updataChar, 3000)
    }

    onRequest = (offset) => {
        this.onCharListLoading();
        this.marvelService.getAllCharacters(offset)
        .then(this.onCharListLoaded)
        .catch(this.onError);
    } 

    onCharListLoading = () => {
        this.setState({
            newItemLoading: true
        })
    }

    onCharListLoaded = (newCharList) => {
        this.setState(({offset, charList}) => ({
            charList: [...charList, ...newCharList],
            loading: false,
            newItemLoading: false,
            offset: offset + 9
        }))
    }

    componentWillUnmount() {
        clearInterval(this.timerId);
    }

    onChatLoaded = (charList) => {
        this.setState({charList, loading: false})
        
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
        const {charList, loading, error, offset, newItemLoading} = this.state;
        const errorMessage = error ? <ErrorMessage/> : null;
        const spiner = loading ? <Spinner/> : null;
        const content = !(loading || error) && charList ? charList.map((element) => {
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


        return (

            <div className="char__list">
                {errorMessage}
                {spiner}
                <ul className="char__grid">
                    {content}
                </ul>
                <button 
                    className="button button__main button__long"
                    disabled={newItemLoading}
                    onClick={() => {this.onRequest(offset)}}>
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