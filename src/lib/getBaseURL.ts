export const getBaseURL = (): URL => {
  const url = new URL('/maps/api/geocode/json', 'https://maps.googleapis.com');
  return url;
};
