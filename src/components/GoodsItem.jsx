function GoodsItem(props) {
    const {
        mainId, 
        displayName, 
        displayDescription,
        price,
        displayAssets,
        addToBasket = Function.prototype
    } = props;

    const priceToFunc = price.regularPrice
    return <div className="card" >
    <div className="card-image waves-block waves-light">
      <img className="activator" src={displayAssets[0].full_background} alt={displayName} />
    </div>
    <div className="card-content">
      <span className="card-title activator grey-text text-darken-4">{displayName}<i className="material-icons right">more_vert</i></span>

    </div>
    <div className="card-action">
        <button className='btn' onClick={() => addToBasket({
          mainId,
          displayName,
          priceToFunc,
        })}>Купить</button>
        <span className='right' style={{fontSize: '1.8rem'}} >{price.regularPrice} руб.</span>
    </div>
    <div className="card-reveal">
      <span className="card-title grey-text text-darken-4">{displayName}<i className="material-icons right">close</i></span>
      <p>{displayDescription ? displayDescription : 'Нет описания'}</p>
    </div>
  </div>
}

export {GoodsItem};