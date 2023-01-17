import './charList.scss';
import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import MarvelService from '../../services/MarvelService';
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';

const CharList = ({onCharSelected, selectedChar}) => {
    const [charList, setCharList] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [newItemLoading, setNewItemLoading] = useState(false);
    const [offset, setOffset] = useState(210);
    const [charEnded, setCharEnded] = useState(false);

    const marvelService = new MarvelService();

    useEffect(()=> {
        onRequest();
    }, [])
  

    const onRequest = (offset) => {
        onCharListLoading();
        marvelService.getAllCharacters(offset)
        .then(onCharListLoaded)
        .catch(onError);
    } 

    const onCharListLoading = () => {
        setNewItemLoading(true);
    }

    const onCharListLoaded = (newCharList) => {
        let ended = false;
        if(newCharList.length < 9) {
            ended = true;
        }

        setCharList(charList => [...charList, ...newCharList]);
        setLoading(loading => false);
        setNewItemLoading(newItemLoading => false);
        setOffset(offset => offset + 9);
        setCharEnded(charEnded => ended);

    }

    const onChatLoaded = (charList) => {
        setCharList(charList);
        setLoading(false);
        
    }

    const onError = () => {
        setLoading(false);
        setError(true)
    }

    // const updataChar = () => {
    //     // const id = Math.floor(Math.random() * (1011400 - 1011000) + 1011000);
    //     marvelService
    //         .getAllCharacters()
    //         .then(onChatLoaded)
    //         .catch(onError);
    // }

    const errorMessage = error ? <ErrorMessage/> : null;
    const spiner = loading ? <Spinner/> : null;
    const content = !(loading || error) && charList ? charList.map((element) => {
        return (
                <li 
                    tabIndex={0}
                    onFocus={() => onCharSelected(element.id)}
                    key={element.id}
                    onClick={() => onCharSelected(element.id)}
                    className={selectedChar ? selectedChar === element.id ? "char__item active" : "char__item" : "char__item"}>
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
                onClick={() => {onRequest(offset)}}>
                <div className="inner">load more</div>
            </button>
        </div>
    )
}

CharList.propTypes = {
    onCharSelected: PropTypes.func.isRequired
}

export default CharList;