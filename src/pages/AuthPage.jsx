// Компонент регистрации/входа
import { useState } from "react";
import { getCurrentUser, getUsers, saveCurrentUser, saveUsers } from "../utils/users";

const AuthPage = () => {
    const [isLogin, setIsLogin] = useState(true);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [currentUser, setCurrentUser] = useState(getCurrentUser());
    
    const handleSubmit = (error) => {
        error.preventDefault();
        setError('');
        setSuccess('');

        if (isLogin) {
            const users = getUsers();
            const user = users.find(user => user.login === login && user.password === password);
            if (user) {
                saveCurrentUser(user);
                setCurrentUser(user);
                setSuccess('Вход выполнен учпешно!');
                setTimeout(() => {
                    window.location.href = '/';
                }, 1000);
            } else {
                setError('Неверный логин или пароль');
            }
        } else {
            if (!name || !email || !login || !password) {
                setError('Заполните все поля');
                return;
            }
            const users = getUsers();
            if (users.find(user => user.login === login)) {
                setError('Пользователь с таким логином уже существует');
                return;
            }
            if (users.find(user => user.email === email)) {
                setError('Пользователь с таким email уже существует');
                return;
            }
            const newUser = { name, email, login, password };
            users.push(newUser);
            saveUsers(users);
            saveCurrentUser(newUser);
            setCurrentUser(newUser);
            setSuccess('Регистрация успешна!');
            setTimeout(() => {
                window.location.href = '/';
            }, 1000);
        }
    };

    const handleLogout = () => {
        saveCurrentUser(null);
        setCurrentUser(null);
        window.location.href = '/';
    };

    if (currentUser) {
        return (
            <div className="auth-container">
                <p className="auth-name">Профиль</p>
                <div className="user-info">
                    <div>
                        <div className="user-name">Имя: {currentUser.name}</div>
                        <div >Email: {currentUser.email}</div>
                        <div>Логин: {currentUser.login}</div>
                    </div>
                    <button className="logout-btn" onClick={handleLogout}>Выйти</button>
                </div>
            </div>
        );
    }

        return (
            <div className="auth-container">
                <p className="auth-name">{isLogin ? 'Вход' : 'Регистрация'}</p>
                <form className="auth-form" onSubmit={handleSubmit}>
                    {!isLogin && (
                        <input
                            type="text"
                            placeholder="Имя"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                        />
                    )}
                    {!isLogin && (
                        <input
                            type="email"
                            placeholder="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    )}
                    <input
                        type="text"
                        placeholder="Логин"
                        value={login}
                        onChange={(e) => setLogin(e.target.value)}
                        required
                    />
                    <input
                        type="password"
                        placeholder="Пароль"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                    {error && <div className="error">{error}</div>}
                    {success && <div className="success">{success}</div>}
                    <button type="submit">{isLogin ? 'Войти' : 'Зарегистрироваться'}</button>
                </form>
                <div className="auth-toggle">
                    {isLogin ? 'Нет аккаунта? ' : 'Уже есть аккаунт? '}
                    <button onClick={() => { setIsLogin(!isLogin); setError(''); setSuccess(''); }}>
                        {isLogin ? 'Зарегистрироваться' : 'Войти'}
                    </button>
                </div>
            </div>
        );    



}

export default AuthPage;