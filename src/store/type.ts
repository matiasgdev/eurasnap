import {Dispatch, SetStateAction} from 'react';
import {State} from '../hooks/useAsync';

export interface PhotoRecord {
  key: string;
  location: string;
  uri: string;
}

export interface PhotoStoreState {
  pictures: PhotoRecord[];
  error: Error | null;
  status: State['status'];
  setQuery: Dispatch<SetStateAction<string>>;
  query: string;
  debouncedQuery: string;
}
