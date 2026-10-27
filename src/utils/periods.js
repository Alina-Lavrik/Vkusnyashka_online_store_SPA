// ============ ГЕТТЕРЫ ПЕРИОДОВ ============
const getDateKey = (date) => new Date(date).toISOString().slice(0, 10);

const getWeekKey = (date) => {
    const dateItem = new Date(date);
    const target = new Date(dateItem.valueOf());
    const dayNr = (dateItem.getDay() + 6) % 7;
    target.setDate(target.getDate() - dayNr + 3);
    const firstThursday = target.valueOf();
    target.setMonth(0, 1);
    if (target.getDay() !== 4) {
        target.setMonth(0, 1 + ((4 - target.getDay() + 7) % 7));
    }
    const week = 1 + Math.ceil((firstThursday - target) / 604800000);
    return `${dateItem.getFullYear()}-W${String(week).padStart(2, '0')}`;
};

const getMonthKey = (date) => {
    const dateItem = new Date(date);
    return `${dateItem.getFullYear()}-${String(dateItem.getMonth() + 1).padStart(2, '0')}`;
};

const getYearKey = (date) => String(new Date(date).getFullYear());

// ============ ДОПУСТИМЫЕ ПЕРИОДЫ ============

const PERIOD_GETTERS = {
    daily: getDateKey,
    weekly: getWeekKey,
    monthly: getMonthKey,
    yearly: getYearKey
};

// ============ ПОСТРОЕНИЕ СТАТИСТИКИ ============

export const buildStats = (purchases, periodType) => {
    const periodGetter = PERIOD_GETTERS[periodType];
    if (typeof periodGetter !== 'function') {
        console.warn(`buildStats: неизвестный период "${periodType}".`);
        return {};
    }

    const result = {};

    (Array.isArray(purchases) ? purchases : []).forEach(purchase => {
        if (!purchase || !purchase.items || !Array.isArray(purchase.items)) return;

        const key = periodGetter(purchase.date);
        if (!result[key]) {
            result[key] = { items: {}, totalQty: 0, totalSum: 0 }; 
        }

        purchase.items.forEach(item => {
            if (!result[key].items[item.productId]) {
                result[key].items[item.productId] = {
                    productId: item.productId,
                    name: item.name,
                    image: item.image,
                    quantity: 0,
                    sum: 0
                };
            }
            result[key].items[item.productId].quantity += item.quantity;
            result[key].items[item.productId].sum += item.total;
            result[key].totalQty += item.quantity;
            result[key].totalSum += item.total;
        });
    });

    return result;
};
