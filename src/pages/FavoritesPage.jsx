import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { removeFromFavorites } from "../reducers/productsSlice";

 // Компонент избранного
const FavoritesPage = () => {
    const dispatch = useDispatch();
    const { items, favorites } = useSelector(state => state.products);

    const favItems = items.filter(item => favorites.includes(item.id));

    const handleRemoveFromFavorites = (item) => {
        dispatch(removeFromFavorites(item));   
    };


    return (
        <div className="fav-box">
            <div className="card-fav-box black">
            <p className="fav-name">❤️ Избранное <span>{favItems.length}</span></p>
            {favItems.length === 0 ? (
                <div className="empty-message">Нет избранных товаров</div>
            ) : (
                <table className="fav-table">
                    <thead>
                        <tr>
                            <th>Товар</th>
                            <th style={{ textAlign: 'center' }}>Стоимость</th>
                            <th style={{ textAlign: 'center' }}>Удалить</th>
                        </tr>
                    </thead>
                    <tbody>
                        {favItems.map(item => (
                            <tr key={item.id}>
                                <td>
                                    <div className="fav-item">
                                        <img src={item.image} alt={item.name} className="mini-image" /><span className="name">{item.name}</span></div>
                                </td>
                                <td style={{ textAlign: 'center' }}><span className="price">{item.price} ₽</span></td>
                                <td style={{ textAlign: 'center' }}>
                                    <button className="remove-btn" onClick={() => handleRemoveFromFavorites(item.id)}>✕</button></td>
                            </tr>
                        ))}
                    </tbody>
                </table>)}
        </div>        
        </div>
    );
};
    
export default FavoritesPage;