// ключ, по которому мы сохраним токен в LocalStorage
const ID_TOKEN_KEY = "token";

// метод для получения токена по ключу из LocalStorage
export const getToken = () => {
  return window.localStorage.getItem(ID_TOKEN_KEY);
};

// метод для сохранения токена по ключу в LocalStorage
export const saveToken = (token) => {
  window.localStorage.setItem(ID_TOKEN_KEY, token);
};
// метод для удаления токена по ключу из LocalStorage
export const destroyToken = () => {
  window.localStorage.removeItem(ID_TOKEN_KEY);
};

// экспортируем сервис как объект с 3-мя методами
export default { getToken, saveToken, destroyToken };
