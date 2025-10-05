import {ButtonProps} from '../../types/Types'


function Button({className, onClick, text, style}: ButtonProps){

    return(
        <button onClick={onClick} className={className} style={style}>
            {text}
        </button>
    )
}

export default Button