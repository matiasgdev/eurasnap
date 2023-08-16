import AsyncStorage from '@react-native-async-storage/async-storage';
import {useCallback, useEffect, useState} from 'react';

export function useStorage<T = any>(
  key: string,
  defaultValue: T,
  storage = AsyncStorage,
): {
  value: T;
  saveValue: (newValue: T | ((prevValue: T) => T)) => Promise<void>;
  getValue: () => Promise<T>;
  clearStorage: () => void;
} {
  const [value, setValue] = useState<T>(defaultValue);

  const getValue = async () => {
    try {
      const jsonValue = await storage.getItem(key);
      return jsonValue !== null ? JSON.parse(jsonValue) : value;
    } catch (e) {
      throw new Error(`Error when trying to read ${key}`);
    }
  };

  const saveValue = useCallback(
    async (newValue: T | ((prevValue: T) => T)) => {
      const previousValue = await getValue();
      const valueToPersist =
        typeof newValue === 'function'
          ? (newValue as Function)(previousValue)
          : newValue;

      try {
        await storage.setItem(key, JSON.stringify(valueToPersist));
      } catch (e) {
        console.log(e);
        throw new Error(`Error when trying to save ${key}`);
      }
    },
    [value, getValue],
  );

  const clearStorage = useCallback(async () => {
    try {
      await AsyncStorage.removeItem(key);
    } catch (e) {
      throw new Error(`Error when trying to delete ${key}`);
    }
  }, []);

  useEffect(() => {
    (async () => {
      setValue(await getValue());
    })();
  }, []);

  return {value, saveValue, getValue, clearStorage};
}
