import {Dispatch, SetStateAction} from 'react';
import {State} from '../hooks/useAsync';

export interface PhotoRecord {
  id: string;
  location: string;
  uri: string;
}

export interface PhotoStoreState {
  pictures: PhotoRecord[];
  savePicture: (picture: PhotoRecord) => void;
  error: Error | null;
  status: State['status'];
  setQuery: Dispatch<SetStateAction<string>>;
  query: string;
}
