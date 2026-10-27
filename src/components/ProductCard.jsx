import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addToCard, addToFavorites, removeFromFavorites, setAmount, decreaseQuantity} from '../reducers/productsSlice';


// Карточка товара
const ProductCard = ({ product }) => {

    const dispatch = useDispatch();
    const isInCart = useSelector(state => state.products.cart.includes(product.id));
    const isInFavorites = useSelector(state => state.products.favorites.includes(product.id));
    // const products = useSelector(state => state.products.items);
    
    const handleQtyChange = (amount) => {
        if (amount === -1) {
            // при нажатии минус используем специальный экшен
            dispatch(decreaseQuantity(product.id));
        } else {
             // при нажатии плюс просто увеличиваем
            const newAmount = product.amountToBuy + 1;
            dispatch(setAmount({ productId: product.id, newAmount }));
        }
    };

    const handleAddToCart = () => {
        if (!isInCart) { 
            dispatch(addToCard(product.id));
        }
    };

    const toggleFavorite = () => {
        if (isInFavorites) {
            dispatch(removeFromFavorites(product.id));
        } else {
            dispatch(addToFavorites(product.id));
        }
    };

    return (
        <div key={product.id} className="ice_box">
            <div className="img_box">
                <img
                src={product.image} 
                alt={product.name} 
                className="ice_img"
                loading="lazy"/>
            </div>
            <div className="ice_info">
                <div className="ice_box_name">{product.name}
                    <button className={`btn-icon ${isInFavorites ? 'fav-active' : 'fav'}`} onClick={toggleFavorite}>
                                {isInFavorites ? '❤️' : '🤍'}
                </button>
                </div>
            <div className="text_about_ice">{product.description}</div>
            <div className="price_mix rub">{product.price} ₽</div>
            <div className="buy_count">
                <div className="qty-control">
                    <button className="plus-minus-button" onClick={() => handleQtyChange(-1)} disabled={product.amountToBuy <= 1 && !isInCart}>−</button>
                    <span>{product.amountToBuy}</span>
                    <button className="plus-minus-button" onClick={() => handleQtyChange(1)} >+</button>
                </div>
                <button className="buy_btn white" onClick={handleAddToCart} disabled={isInCart || product.amountToBuy <= 0}>
                                {isInCart ? 'В корзине' : 'В корзину'}
                    </button>
            </div>
        </div>
    </div>
    )
};

export default ProductCard;

