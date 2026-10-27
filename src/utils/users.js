// ---------- АВТОРИЗАЦИЯ ----------

const USERS_KEY = 'icecream_users';
const CURRENT_USER_KEY = 'icecream_current_user';

export const getUsers = () => {
    try {
        const raw = localStorage.getItem(USERS_KEY);
        return raw ? JSON.parse(raw) : [];
    } catch {
        return [];
    }
};
    
export const saveUsers = (users) => {
    localStorage.setItem(USERS_KEY, JSON.stringify(users));
};
    
export const getCurrentUser = () => {
    try {
         const raw = localStorage.getItem(CURRENT_USER_KEY);
        return raw ? JSON.parse(raw) : null;
    } catch {
        return null;
    }
};
    
export const saveCurrentUser = (user) => {
    if (user) {
        localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(user));
    } else {
        localStorage.removeItem(CURRENT_USER_KEY);
    }
};