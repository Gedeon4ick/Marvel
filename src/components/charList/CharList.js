import './charList.scss';
import { Component } from 'react';
import PropTypes from 'prop-types';
import MarvelService from '../../services/MarvelService';
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';

class CharList  extends Component {
    
    state = {
        charList: [],
        loading: true,
        error: false,
        newItemLoading: false,
        offset: 210,
        charEnded: false
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
        let ended = false;
        if(newCharList.length < 9) {
            ended = true;
        }


        this.setState(({offset, charList}) => ({
            charList: [...charList, ...newCharList],
            loading: false,
            newItemLoading: false,
            offset: offset + 9,
            charEnded: ended
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
        const {charList, loading, error, offset, newItemLoading, charEnded} = this.state;
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
                    style={{"display": charEnded ? "none" : "block "}}
                    onClick={() => {this.onRequest(offset)}}>
                    <div className="inner">load more</div>
                </button>
            </div>
        )
        
    }
}

CharList.propTypes = {
    onCharSelected: PropTypes.func.isRequired
}

export default CharList;