import {useState, useEffect} from 'react';
import {API_KEY, API_URL} from '../config';
import {Preloader} from './Preloader';
import { GoodsList } from './GoodsList';
import { Cart } from './Cart';
import { BasketList } from './BasketList';
import {Alert} from './Alert';

function Shop() {
    const [goods, setGoods] = useState([])
    const [loading, setLoading] = useState(true)
    const [order, setOrder] = useState([])
    const [isBasketShow, setBasketShow] = useState(false);
    const [alertName, setAlertName] = useState('');


    const editQuantity = (itemId, action) => {
        
        const newOrder = order.map(orderItem => {
            if(orderItem.mainId === itemId) {
                if(action === 'add'){
                    return {
                        ...orderItem,
                        quantity: orderItem.quantity + 1
                    }
                }
                if(action === 'del' && orderItem.quantity > 0) {
                    return {
                        ...orderItem,
                        quantity: orderItem.quantity - 1
                    }
                } return orderItem;               
            }
            return orderItem;
        })
        setOrder(newOrder)
    }
    

    const addToBasket = (item) => {
        const itemIndex = order.findIndex(
            orderItem => orderItem.mainId === item.mainId
        );
        console.log(itemIndex)

        if(itemIndex < 0) {
            const newItem = {
                ...item,
                quantity: 1,
            }
            setOrder([...order, newItem])
            setAlertName(item.displayName)

        } else {
            const newOrder = order.map((orderItem, index) => {
                if(index === itemIndex) {
                    return {
                        ...orderItem,
                        quantity: orderItem.quantity + 1
                    }
                } else {
                    return orderItem;
                }
            })

            setOrder(newOrder)
            setAlertName(item.displayName)
        }
    }


    const removeFromBasket = (itemId) => {
        const newOrder = order.filter(el => el.mainId !== itemId)
        setOrder(newOrder)
    }

    const handleBasketShow = () => {
        setBasketShow(!isBasketShow);
    }

    const closeAlert = () => {
        setAlertName('');
    }

    useEffect(function getGoods() {
        fetch(API_URL, {
            headers: {
                'Authorization': API_KEY,
            }
        }).then(response => response.json()).then(data => {
            data.shop && setGoods(data.shop);
            setLoading(false);
        })
    }, []);

    return <main className='container content'>
        <Cart quantity={order.length} handleBasketShow={handleBasketShow} />
        {
            loading ? 
                <Preloader /> 
            : 
                <div className='Shop'>
                    <GoodsList goods_={goods} addToBasket={addToBasket} />
                </div>
        }
        {
            isBasketShow && <BasketList order={order} handleBasketShow={handleBasketShow} removeFromBasket={removeFromBasket} editQuantity={editQuantity} />
        }
        {
            alertName && <Alert name={alertName} closeAlert={closeAlert} />
        }
    </main>
}

export {Shop};