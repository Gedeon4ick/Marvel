import './charList.scss';
import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import useMarvelService from '../../services/MarvelService';
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';

const CharList = ({onCharSelected, selectedChar}) => {
    const [charList, setCharList] = useState([]);
    const [newItemLoading, setNewItemLoading] = useState(false);
    const [offset, setOffset] = useState(210);
    const [charEnded, setCharEnded] = useState(false);

    const {loading, error, getAllCharacters}= useMarvelService();

    useEffect(()=> {
        onRequest(offset, true);
    }, [])


    const onRequest = (offset, initial) => {
        // if (initial) {
        //     getAllCharacters(offset)
        //     .then(onCharListLoaded)
        // }
        initial ? setNewItemLoading(false) :
        setNewItemLoading(true);
        getAllCharacters(offset)
        .then(result => onCharListLoaded(result))
    } 


    const onCharListLoaded = (newCharList) => {
        let ended = false;
        if(newCharList.length < 9) {
            ended = true;
        }

        setCharList(charList => [...charList, ...newCharList]);
        setNewItemLoading(newItemLoading => false);
        setOffset(offset => offset + 9);
        setCharEnded(charEnded => ended);
    }

    const errorMessage = error ? <ErrorMessage/> : null;
    const spiner = loading && !newItemLoading ? <Spinner/> : null;
    const content = charList.map((element) => {
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
    });


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
                onClick={() => {onRequest(offset)}}
                >
                <div className="inner">load more</div>
            </button>
        </div>
    )
}

CharList.propTypes = {
    onCharSelected: PropTypes.func.isRequired
}

export default CharList;