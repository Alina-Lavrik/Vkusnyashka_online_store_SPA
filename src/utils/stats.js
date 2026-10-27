// ---------- СТАТИСТИКА (LocalStorage) ----------

export const STATS_KEY = 'icecream_stats';

export const getDefaultStats = () => ({
    products: {}    
});

export const loadStats = () => {
    try {
        const raw = localStorage.getItem(STATS_KEY);
        if (raw) {
            const parsed = JSON.parse(raw);
            if (!parsed.products) {
                parsed.products = {};
            }
            return parsed;
        }
    } catch (error) {
        console.error('Error loading stats:', error);
    }
    return getDefaultStats();           
};  

export const saveStats = (stats) => {
    localStorage.setItem(STATS_KEY, JSON.stringify(stats));
};

/**
    * Синхронизация статистики с корзиной.
    * Пересчитывает статистику на основе текущего состояния корзины.
*/

export const syncStatsWithCart = (items, cart) => {
    const stats = getDefaultStats();
    const cartItems = items.filter(item => cart.includes(item.id));
        
    cartItems.forEach(product => {
        stats.products[product.id] = {
            name: product.name,
               image: product.image,
            totalQuantity: product.amountToBuy,
            totalSum: product.price * product.amountToBuy
        };
    });
        
    saveStats(stats);
    return stats;
};