import React, {
  createContext,
  PropsWithChildren,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import {STORAGE_PHOTOS_KEY} from '../const/key-storage';
import {useAsync} from '../hooks/useAsync';
import {useStorage} from '../hooks/useStorage';
import {filterByLocation} from '../lib/filterByLocation';
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

  const filteredPictures = useMemo(
    () => filterByLocation(pictures, globalQuery),
    [pictures, globalQuery],
  );

  return (
    <PhotoStore.Provider
      value={{
        error,
        status,
        pictures: filteredPictures,
        savePicture,
        setQuery: setGlobalQuery,
        query: globalQuery,
      }}>
      {children}
    </PhotoStore.Provider>
  );
};

export const useStore = () => useContext(PhotoStore) as PhotoStoreState;
