import { GoodsItem } from "./GoodsItem";

function GoodsList(props) {
    const {goods_ = [], addToBasket = Function.prototype} = props;

    if (!goods_.length) {
        return <h3>Ничего нет</h3>
    }

    return <div className="goods">
        {goods_.map(item => (
            <GoodsItem key={item.mainId} {...item} addToBasket={addToBasket} />
        ))}
    </div>
}

export {GoodsList};