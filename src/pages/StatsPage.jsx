import { useEffect, useState } from "react";
import { loadPurchases, PLAN_PER_PRODUCT, savePurchases } from "../utils/purchases";
import { buildStats } from '../utils/periods';


    // Статистика (таблица)
const StatsPage = () => {
    const [period, setPeriod] = useState('daily'); 
    const [purchases, setPurchases] = useState(loadPurchases());

    // обновление при монтировании и после записи
    
    useEffect(() => {
        const handleStorage = () => setPurchases(loadPurchases());
        window.addEventListener('storage', handleStorage);

        // перечитываем при любом изменении (внутри приложения)
        const interval = setInterval(() => setPurchases(loadPurchases()), 1500);
        return () => {
            window.removeEventListener('storage', handleStorage);
            clearInterval(interval);
        };
    }, []);

    // ручной сброс (очистка статистики)

    const resetStats = () => {
       if (window.confirm('Вы уверены, что хотите сбросить всю статистику?')) {
            savePurchases([]);
            setPurchases([]);
        }
    };

    const stats = buildStats(purchases, period);
    const periods = Object.keys(stats).sort((a, b) => b.localeCompare(a));

    const periodLabels = {
        daily: 'День',
        weekly: 'Неделя',
        monthly: 'Месяц',
        yearly: 'Год'
    };

    // Общий итог по всем периодам

    const grandTotalQty = periods.reduce((sum, key) => sum + stats[key].totalQty, 0);
    const grandTotalSum = periods.reduce((sum, key) => sum + stats[key].totalSum, 0);
    
    return (
        <div>
            <div className="stats-top">
                <p className="stats-top-name">Аналитика</p>
                <div className="stats-tabs" >  
                    {['daily', 'weekly', 'monthly', 'yearly'].map(item => (
                        <button key={item}
                            className={period === item ? 'active' : ''}
                            onClick={() => setPeriod(item)}>
                            {periodLabels[item]}
                        </button>
                    ))}
                </div>
            </div>
            <div className="stats-section black">
            {periods.length === 0 ? (
                <div className="empty-message" >Нет данных о покупках. Оформите заказ.</div>
                ) : (
                <div>
                    {periods.map(periodKey => {
                    const periodData = stats[periodKey];
                    const items = Object.values(periodData.items);
                    return (
                        <div key={periodKey} className="period-elem">
                            <p className="period-elem-name">{periodKey}</p>
                            <div className="stats-table-wrap">
                                <table className="stats-table">
                                    <thead>
                                        <tr>
                                            <th><input type="checkbox" /></th>
                                            <th>Товар</th>
                                            <th>Продано</th>
                                            <th>Сумма</th>
                                            <th>План ({PLAN_PER_PRODUCT} шт)</th>
                                             {/* <th>Статистика</th> */}
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {items.map(item => {
                                            const planDone = item.quantity >= PLAN_PER_PRODUCT;
                                            return (
                                                <tr key={item.productId}>
                                                    <td className="input-elem"><input type="checkbox" /></td>
                                                    <td>
                                                        <div className="product-cell">
                                                            <img src={item.image} alt={item.name} className="mini-image" />
                                                            <span className="stats-name">{item.name}</span>
                                                        </div>
                                                    </td>
                                                    <td><span className="qty-badge">{item.quantity} шт</span></td>
                                                    <td className="stat-total">{item.sum} ₽</td>
                                                    <td className="plan-elem"><span className={`plan-badge ${planDone ? 'plan-done' : 'plan-fail'}`}>
                                                        {planDone ? '✓ Выполнено' : `✗ Не выполнено ${item.quantity}/${PLAN_PER_PRODUCT}`}
                                                    </span>
                                                    </td>
                                                </tr>
                                            );
                                        })}
                                    </tbody>
                                    <tfoot>
                                        <tr>
                                             <td></td>
                                            <td><strong>Итого за период</strong></td>
                                            <td><strong>{periodData.totalQty} шт</strong></td>
                                            <td><strong className="stat-total">{periodData.totalSum} ₽</strong></td>
                                            <td></td>
                                        </tr>
                                    </tfoot>
                                </table>  
                            </div>
                        </div>
                    );
                    })}
                    <div className="total-result">
                            <span>Общий итог</span>
                            <span>Продано: {grandTotalQty} шт</span>
                            <span>Сумма: <span className="stat-total">{grandTotalSum} ₽</span></span>
                    </div> 
                    <button className="reset-stats" onClick={resetStats}>Сбросить статистику</button>        
                </div>
                )}
            </div>
     </div>
    );
 
};

export default StatsPage;