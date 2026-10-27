# React + Vite Интернет-магазин мороженого "Вкусняшка"

## Проект SPA (single page application)

### Функционал интернет-магазина

Магазин занимается продажей 4-х видов мороженого

1. Главная страница (/) — навигация по сайту, основной контент, карточки товаров

- В карточке товара доступно изменение количества товара к покупке, добавление в избранное, кнопка купить перемещает товар в корзину
- В навигации растет счетчик при добавлении товара в корзину и в избранное

2. Страница с корзиной (/cart)

- Доступно изменение количества и удаление товара
- После оформления покупки выходит сообщение: "Покупка оформлена! Кол-во шт на сумму ₽`" и идет очистка корзины

3. Страница с избранным (/favorites)

- Удаление товара из избранного

4. Страница с аналитикой (/stats)

- Отражаются данные о покупках по каждому наименованию в штуках / рублях в разрезе День/Неделя/Месяц/Год
- Отслеживается выполнение плана (5 шт/1 вид)
- Выводится общий итог в штуках и деньгах по всем наименованиям
- Кнопка для очистки статистики

5. Страница регистрации/входа (/auth)

- Проверка заполнения всех полей
- Проверка корректного ввода e-mail
- Данные пользователей сохраняются в localStorage

HMR — изменение любого компонента мгновенно отражается в браузере

Адаптив для просмотра:

- Небольшие ноутбуки/планшеты (альбомная ориентация) 767px - 1024px
- Мобильные устройства (портретная ориентация) и планшеты (портретная ориентация) 369px - 767px
- Мобильные устройства - 369px

### Структура проекта <br>

Vkusnyashka_store / <br>
├── index.html <br>
├── package.json <br>
├── vite.config.js <br>
├── .gitignore <br>
└── src / <br>
&nbsp; ├── main.jsx <br>
&nbsp; ├── App.jsx <br>
&nbsp; ├── index.css <br>
&nbsp; ├── store / <br>
&nbsp; │ &nbsp; └── store.js <br>
&nbsp; ├── reducers / <br>
&nbsp; │ &nbsp; └── productsSlice.js <br>
&nbsp; ├── utils / <br>
&nbsp; │ &nbsp; ├── data.js <br>
&nbsp; │ &nbsp; ├── periods.js <br>
&nbsp; │ &nbsp; ├── purchases.js <br>
&nbsp; │ &nbsp; ├── stats.js <br>
&nbsp; │ &nbsp; └── users.js <br>
&nbsp; └── components / <br>
&nbsp; │&nbsp; &nbsp; ├── Content.jsx <br>
&nbsp; │&nbsp; &nbsp; ├── Navigation.jsx <br>
&nbsp; │&nbsp; &nbsp; ├── ProductCard.jsx <br>
&nbsp; │&nbsp; &nbsp; ├── ProductList.jsx <br>
&nbsp; │&nbsp; &nbsp; └── Notification.jsx <br>
&nbsp; └── pages / <br>
&nbsp; │&nbsp; &nbsp; ├── HomePage.jsx <br>
&nbsp; |&nbsp; &nbsp; ├── CartPage.jsx <br>
&nbsp; |&nbsp; &nbsp; ├── FavoritesPage.jsx <br>
&nbsp; |&nbsp; &nbsp; ├── StatsPage.jsx <br>
&nbsp; |&nbsp; &nbsp; └── AuthPage.jsx <br>
&nbsp; └── images / <br>

### Макеты проекта <br>

![Главная страница](./src/images/ice_cream_page1.jpg) <br>
![Аналитика](./src/images/ice_cream_page2.jpg)

### QRcode - Visit page on mobile

![Visit page on mobile](./src/images/QRcode.png)
