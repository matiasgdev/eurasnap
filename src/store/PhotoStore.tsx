import React, {
  createContext,
  PropsWithChildren,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';
import {STORAGE_PHOTOS_KEY} from '../const/key-storage';
import {useAsync} from '../hooks/useAsync';
import {useDebouncedValue} from '../hooks/useDebouncedValue';
import {useStorage} from '../hooks/useStorage';
import {PhotoRecord, PhotoStoreState} from './type';

const PhotoStore = createContext<PhotoStoreState | null>(null);

export const PhotoProvider: React.FC<PropsWithChildren> = ({children}) => {
  const {
    run,
    status,
    data: pictures,
    error,
    setData,
  } = useAsync<PhotoRecord[]>([]);
  const {getValue, saveValue} = useStorage<PhotoRecord[]>(
    STORAGE_PHOTOS_KEY,
    [],
  );

  const [globalQuery, setGlobalQuery] = useState('');
  const debouncedQuery = useDebouncedValue(globalQuery, 500);

  useEffect(() => {
    // retrieve photos from storage
    run(getValue());
  }, []);

  const savePicture = useCallback(
    async (picture: PhotoRecord) => {
      await saveValue(prevPictures => [...prevPictures, picture]);
      setData([...pictures, picture]);
    },
    [pictures],
  );

  return (
    <PhotoStore.Provider
      value={{
        error,
        status,
        pictures,
        savePicture,
        setQuery: setGlobalQuery,
        query: globalQuery,
        debouncedQuery,
      }}>
      {children}
    </PhotoStore.Provider>
  );
};

export const useStore = () => useContext(PhotoStore) as PhotoStoreState;
