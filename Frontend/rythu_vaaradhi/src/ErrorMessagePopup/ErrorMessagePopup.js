import './ErrorMessagePopup.css'

function ErrorMessagePuop({text,color}){
    return(
        <div className="CommingSoon-Popup" style={{backgroundColor:color}}>
        <h3 className="CommingSoon-Head">{text}</h3></div>
    )
}

export default ErrorMessagePuop