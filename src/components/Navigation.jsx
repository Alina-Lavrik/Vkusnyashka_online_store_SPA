import { Link, useLocation} from 'react-router-dom';
import { useSelector } from 'react-redux';   
import React from 'react';
import logo from "../images/logo.png"
import text_gray from "../images/text_gray.png"
import text_white from "../images/text_white.png"
import user_1 from "../images/user_1.png"
import user_gray from "../images/user_gray.png"
import { getCurrentUser } from '../utils/users';


const Navigation = () => {
    const location = useLocation();
    const { cart, favorites, items } = useSelector(state => state.products);
    const currentUser = getCurrentUser();

    const totalItemsInCart = cart.reduce((sum, id) => {
            const product = items.find(item => item.id === id);
            return sum + (product ? product.amountToBuy : 0);
        }, 0);

    return (
        <nav className="header_menu">
            <div className="shop_icon_name">
                <div>
                    <img className="logo_ice" src={logo} alt="logo"/>
                </div>
                <div className="shop_name">
                    <Link to='/' className={location.pathname === '/' ? 'active' : ''}><p className="header_link white">ВКУСНЯШКА</p></Link>
                </div>
            </div>
            <div className="header_menu_link">
                <Link to='/cart' className={`header_link white ${location.pathname === '/cart' ? 'active' : ''}`}>Корзина {totalItemsInCart > 0 && (<span className="nav-badge">{totalItemsInCart}</span>)}</Link>

                <Link to='/favorites' className={`header_link white ${location.pathname === '/favorites' ? 'active' : ''}`}>Избранное {favorites.length > 0 && (<span className="nav-badge">{favorites.length}</span>)}</Link>

                <Link to='/stats' className={`header_link white ${location.pathname === '/stats' ? 'active' : ''}`}>Аналитика</Link>
                <Link to='/auth' className={location.pathname === '/auth' ? 'active' : ''}>
                    <span className={`user-icon ${currentUser ? 'is-auth' : ''}`}>
                    <img className="icon-white" src={user_gray} alt="user" />
                    <img className="icon-gray" src={user_1} alt="user" />
                    </span>
                </Link>
              
            </div>
            <div className="logo_menu">
            <span className="logo_menu_box">
              <img className="logo_menu_white" src={text_white} alt="menu"/>
              <img className="logo_menu_gray" src={text_gray} alt="menu"/>
            </span> 
            </div>
        </nav>
    );
};

export default Navigation;