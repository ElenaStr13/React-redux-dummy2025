//створюємо метод, де зможемо діставати потрібні нам дані з localStorage, в частності accessToken
export  const retriveLocalStorage = <T>(key: string) => {
    const object = localStorage.getItem(key) || '';
    if (!object) {
        return {} as T;
    }
    const parse = JSON.parse(object);
    return parse as T;
}