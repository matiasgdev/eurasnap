import {PhotoRecord} from '../store/type';

export const filterByLocation = (photos: PhotoRecord[], query: string) =>
  photos.filter(p =>
    p.location.toLowerCase().includes(query.trim().toLowerCase()),
  );
