import {useEffect, useState} from 'react';

export function useDebouncedValue<T>(value: T, time = 500) {
  const [debounced, set] = useState(value);

  useEffect(() => {
    const timer = setTimeout(() => {
      set(value);
    }, time);

    return () => {
      if (timer) {
        clearTimeout(timer);
      }
    };
  }, [value, time]);

  return debounced;
}
