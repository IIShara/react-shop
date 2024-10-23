function BasketItem(props) {
    const {
        mainId, 
        displayName, 
        priceToFunc,
        quantity,
        removeFromBasket = Function.prototype,
        editQuantity = Function.prototype,
    } = props;

    return <li className="collection-item">
        {displayName} <button className="btn-small" onClick={() => editQuantity(mainId, 'del')}>-</button> x{quantity} <button className="btn-small" onClick={() => editQuantity(mainId, 'add')}>+</button>= {priceToFunc * quantity} руб.
        <span class="secondary-content">
            <i class="material-icons basket-delete" onClick={() => removeFromBasket(mainId)}>close</i>
        </span>
    </li>;
}

export {BasketItem};