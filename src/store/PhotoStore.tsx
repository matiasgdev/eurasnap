import React, {
  createContext,
  PropsWithChildren,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';
import {useAsync} from '../hooks/useAsync';
import {useDebouncedValue} from '../hooks/useDebouncedValue';
import {PhotoRecord, PhotoStoreState} from './type';

const PhotoStore = createContext<PhotoStoreState | null>(null);

export const PhotoProvider: React.FC<PropsWithChildren> = ({children}) => {
  const {run, status, data: pictures, error} = useAsync<PhotoRecord[]>([]);
  const [globalQuery, setGlobalQuery] = useState('');
  const debouncedQuery = useDebouncedValue(globalQuery, 500);

  useEffect(() => {
    // retrieve photos from storage
    // run(getStorageMetadata());
  }, []);

  return (
    <PhotoStore.Provider
      value={{
        error,
        status,
        pictures,
        setQuery: setGlobalQuery,
        query: globalQuery,
        debouncedQuery,
      }}>
      {children}
    </PhotoStore.Provider>
  );
};

export const useStore = () => useContext(PhotoStore) as PhotoStoreState;
