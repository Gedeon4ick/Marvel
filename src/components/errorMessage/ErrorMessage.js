import img from './error.gif'
import './erorr.scss'

const ErrorMessage = () => {
    return (
        <div>
            <img className="imgError" src={img} alt="Error"/>     
        </div>
    );
};

export default ErrorMessage;

