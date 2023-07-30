
const SuggestionItem = (props) => {

    return (
        <div>
            <img src='../../../../assets/images/onion.png' style={{display: 'block', height: '50px', width: '50px'}} alt='no image found'/>
            <h4>{props.name}</h4>
        </div>
    )
}

export default SuggestionItem;
