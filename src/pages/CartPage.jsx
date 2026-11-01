import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { clearCart, decreaseQuantity, increaseQuantity, removeFromCart } from "../reducers/productsSlice";
import { recordPurchase } from '../utils/purchases';
import { Notification } from '../components/Notification';

 // Компонент корзины
const CartPage = () => {
    const dispatch = useDispatch();
    const { items, cart } = useSelector(state => state.products);
    const [notification, setNotification] = useState(null);
    const cartItems = items.filter(item => cart.includes(item.id));
    const totalCart = cartItems.reduce((sum, item) => sum + item.price * item.amountToBuy, 0);
    const totalItems = cartItems.reduce((sum, item) => sum + item.amountToBuy, 0);

    const handleRemoveFromCart = (item) => {
        dispatch(removeFromCart(item));
    };

    const handleBuy = () => {
        if (cartItems.length === 0) return;
        recordPurchase(cartItems);

        setNotification(`Покупка оформлена! ${totalItems} шт на ${totalCart} ₽`);
        setTimeout(() => setNotification(null), 3000);

        // Очищаем корзину
        dispatch(clearCart());
    };

    return (
        <div className="cart-box">
            
            <div className="card-fav-box black">
                <Notification message={notification} />
                <p className="cart-name">Корзина <span>{totalItems}</span></p>  
                {cartItems.length === 0 ? (
                    <div className="empty-message">Корзина пуста</div>
                ) : (
                    <div className="stats-table-wrap">
                    <table className="cart-table">
                    <thead>
                        <tr>
                            <th className="cart-table-left">Товар</th>
                            <th className="cart-table-center">Количество</th>
                            <th className="cart-table-center">Сумма</th>
                            <th className="cart-table-center">Удалить</th>
                        </tr>
                    </thead>
                    <tbody>  
                        {cartItems.map(item => (
                            <tr key={item.id}>
                                <td >
                                    <div className="cart-item">
                                        <img src={item.image} alt={item.name} className="mini-image" /><span className="product-cell-name">
                                        {item.name}</span>
                                    </div>
                                </td>
                                <td className="cart-table-center">
                                    <div className="qty-control">
                                        <button onClick={() => dispatch(decreaseQuantity(item.id))}>−</button>
                                        <span>{item.amountToBuy}</span>
                                        <button onClick={() => dispatch(increaseQuantity(item.id))}>+</button>
                                    </div> 
                                </td>
                                <td className="cart-table-center price">{item.price * item.amountToBuy} ₽</td>
                                <td className="cart-table-center"><button className="remove-btn" title="Удалить товар" onClick={() => handleRemoveFromCart(item.id)}>✕</button></td>
                            </tr>
                        ))}
                        </tbody>
                            <tfoot>
                                <tr>
                                    <td><strong>Итого</strong></td>
                                    <td className="cart-table-center"><strong>{totalItems} шт</strong></td>
                                    <td className="cart-table-center"><strong className="stat-total">{totalCart} ₽</strong></td>
                                    <td></td>
                                </tr>
                            </tfoot>
                        </table>
                <button className="btn-buy" onClick={handleBuy}>
                    💳 Купить ({totalItems} шт · {totalCart} ₽)
                </button>        
                </div>
                )}
            </div>
        </div>    
    );
};
    
export default CartPage;