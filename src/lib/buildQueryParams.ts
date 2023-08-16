export const buildQueryParams = (params: object) => {
  const urlParams = new URLSearchParams();
  for (const name of Object.keys(params)) {
    if (params[name as keyof typeof params]) {
      urlParams.append(name, params[name as keyof typeof params] as string);
    }
  }
  return urlParams;
};
