// ---------- ИСТОРИЯ ПОКУПОК (LocalStorage) ----------

const PURCHASES_KEY = 'icecream_purchases';
export const PLAN_PER_PRODUCT = 5; // План: 5 штук каждого наименования за период

export const loadPurchases = () => {
    try {
        const raw = localStorage.getItem(PURCHASES_KEY);
        return raw ? JSON.parse(raw) : [];
    } catch {
        return [];
    }
};

export const savePurchases = (purchases) => {
    localStorage.setItem(PURCHASES_KEY, JSON.stringify(purchases));
};

/**
     * Записать покупку (вызывается при нажатии "Купить")
     * Каждая покупка — отдельная запись с датой и товарами.
*/

export const recordPurchase = (cartItems) => {
    const purchases = loadPurchases();
    const now = new Date();

    const purchase = {
        id: `purchase_${now.getTime()}_${Math.random().toString(36).slice(2, 8)}`,
        date: now.toISOString(),
        items: cartItems.map(item => ({
            productId: item.id,
            name: item.name,
            image: item.image,
            price: item.price,
            quantity: item.amountToBuy,
            total: item.price * item.amountToBuy
        })),
        totalSum: cartItems.reduce((sum, item) => sum + item.price * item.amountToBuy, 0),
        totalQuantity: cartItems.reduce((sum, p) => sum + p.amountToBuy, 0)
    }

    purchases.push(purchase);
    savePurchases(purchases);
    return purchase;

};

