import {useState} from "react";

export function useLocalStorage(key, initialValue) {
    return usePersistentStorage(key, initialValue, window.localStorage)

}

export function useSessionStorage(key, initialValue) {
    return usePersistentStorage(key, initialValue, window.sessionStorage)
}

function usePersistentStorage(key, initialValue, storage) {
    const [storedValue, setStoredValue] = useState(() => {
        try {
            const item = storage.getItem(key);
            return item ? JSON.parse(item) : initialValue;
        } catch (error) {
            console.log(error);
            return initialValue;
        }
    });
    const setValue = (value) => {
        try {
            const valueToStore =
                value instanceof Function ? value(storedValue) : value;
            setStoredValue(valueToStore);
            storage.setItem(key, JSON.stringify(valueToStore));
        } catch (error) {
            console.log(error);
        }
    };
    return [storedValue, setValue];
}