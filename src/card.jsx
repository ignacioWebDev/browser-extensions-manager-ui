function Card({ imgUrl, name, description, toggleOn, onToggle, onRemove }) {

    const toggleId = `toggle-${name.replace(/\s+/g, '-').toLowerCase()}`;

    return (
        
        <div className='card'>
            <div className="card__description">
                <img src={imgUrl} alt={`Logo ${name}`} />
                <div>
                    <h3>{name}</h3>
                    <p>{description}</p>
                </div>
            </div>
            <div className="card__actions">
                <button className="card__actions__btn-remove" onClick={onRemove}>Remove</button>
                <div className="toggle">
                    <input
                        type="checkbox"
                        id={toggleId}
                        className="toggle__input"
                        checked={toggleOn}
                        onChange={onToggle}
                    />
                    <label htmlFor={toggleId} className="toggle__label">
                        <span className="toggle__slider"></span>
                    </label>
                </div>
            </div>
        </div>
    );
}

export default Card;

