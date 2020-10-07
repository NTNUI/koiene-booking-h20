export const clone = (object: any) => Object.assign({}, object);

export const renameKey = (object: any, key: string, newKey: string): any => {
  const value = object[key];
  delete object[key];
  object[newKey] = value;
  return object;
};
