import { createSlice } from '@reduxjs/toolkit';
import { InitialProductList } from '../utils/data';

// Создаем slice (редьюсер + экшены)
export const productsSlice = createSlice({
    name: 'products',
    initialState: {
        items: InitialProductList,
        cart: [],
        favorites: [],
    },
    reducers: {
        // изменение количества к покупке (amountToBuy)
        setAmount: (state, action) => {
            const { productId, newAmount } = action.payload;
            const product = state.items.find(item => item.id === productId);
            // if (product) {
            //     // количество не может быть меньше 1
            //     product.amountToBuy = Math.max(1, newAmount);
            // }
            if (product) {
                const safeAmount = Number.isFinite(newAmount) ? Math.max(1, Math.floor(newAmount)) : 1;
                product.amountToBuy = safeAmount;
            }
        },
        // добавить в корзину 
        addToCard: (state, action) => {
            const id = action.payload;
            const product = state.items.find(item => item.id === id);
            if (product && product.amountToBuy > 0 && !state.cart.includes(id)) {
                state.cart.push(id);
            }
        },
        // удалить из корзины
        removeFromCart: (state, action) => {
            const id = action.payload;
            state.cart = state.cart.filter(item => item !== id);
            // сбрасываем количество до 1
            const product = state.items.find(item => item.id === id);
            if (product) {
                product.amountToBuy = 1;
            }
        },
        // добавить в избранное 
        addToFavorites: (state, action) => {
            const id = action.payload;
            if (!state.favorites.includes(id)) {
                state.favorites.push(id);
            }
        },
        // удалить из избранного
        removeFromFavorites: (state, action) => {
            const id = action.payload;
            state.favorites = state.favorites.filter(favoriteId => favoriteId !== id);
        },
        decreaseQuantity: (state, action) => {
            const id = action.payload;
            const product = state.items.find(item => item.id === id);
            if (!product) return;
    
            // если товар в корзине и количество == 1, удаляем из корзины
            if (state.cart.includes(id) && product.amountToBuy === 1) {
                state.cart = state.cart.filter(itemId => itemId !== id);
                product.amountToBuy = 1; // сбрасываем до 1
            } else if (product.amountToBuy > 1) {
                // иначе просто уменьшаем количество
                product.amountToBuy -= 1;
            }
        },
        increaseQuantity: (state, action) => {
            const id = action.payload;
            const product = state.items.find(item => item.id === id);
            if (product) {
                product.amountToBuy = Math.max(1, product.amountToBuy + 1);
            }
        },
        clearCart: (state) => {
            state.cart.forEach(id => {
                const product = state.items.find(item => item.id === id);
                if (product) {
                    product.amountToBuy = 1;
                }
            });
            state.cart = [];
        },

    }
});

// Экшены
export const { setAmount, addToCard, removeFromCart, addToFavorites, removeFromFavorites, decreaseQuantity, increaseQuantity, clearCart} = productsSlice.actions;

export default productsSlice.reducer;