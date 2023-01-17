import { useState, useEffect } from 'react/cjs/react.development';
import PropTypes from 'prop-types';
import './charInfo.scss';
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';
import Skeleton from '../skeleton/Skeleton';
import MarvelService from '../../services/MarvelService';

const CharInfo = (props) =>{
    const [char, setChar] = useState(null)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(false)

    const marvelService = new MarvelService();

    useEffect(() => {
        updateChar();
    }, [props.charId])


    const updateChar = () => {
        const {charId} = props;
        if (!charId) {
            return;
        }
        onCharLoading();
        marvelService
        .getCharacter(charId)
        .then(onChatLoaded)
        .catch(onError)
    }

    
    const onChatLoaded = (char) => {
        setLoading(false);
        setChar(char);
    }

    const onCharLoading = () => {
        setLoading(true);
    }

    const onError = () => {
        setLoading(false);
        setError(true)
    }
    
    const skeleton = char || loading || error ? null : <Skeleton/>
    const errorMessage = error ? <ErrorMessage/> : null;
    const spiner = loading ? <Spinner/> : null;
    const content = !(loading || error || !char) ? <View char={char}/> : null;
  


    return (
        <div className="char__info">
            {skeleton}
            {errorMessage}
            {spiner}
            {content}
        </div>
    )
}

const View = ({char}) => {
    const {name, description, thumbnail, homepage, wiki, comics} = char;
    return (
    <>
        <div className="char__basics">
            <img src={thumbnail} alt={name} className={thumbnail == null ? null : "active"}/>
            <div>
                <div className="char__info-name">{name}</div>
                <div className="char__btns">
                    <a href={homepage} className="button button__main">
                        <div className="inner">homepage</div>
                    </a>
                    <a href={wiki} className="button button__secondary">
                        <div className="inner">Wiki</div>
                    </a>
                </div>
            </div>
        </div>
        <div className="char__descr">
           {description}
        </div>
        <div className="char__comics">Comics:</div>
        <ul className="char__comics-list">
            {comics.lenght > 0 ? null : "There is no comics with this character"} 

            {
                comics.map((item, i) => {
                    if (i > 10) return;
                    return (
                        <li key={i} className="char__comics-item">
                            {item.name}
                        </li>
                    )
                })
            }
            
        </ul>
    </>
    )
    
}


CharInfo.propTypes = {
    charId: PropTypes.number
}

export default CharInfo;