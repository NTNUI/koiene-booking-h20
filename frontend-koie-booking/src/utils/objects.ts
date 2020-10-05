export const clone = (object: any) => Object.assign({}, object);

export const renameKey = (object: any, key: string, newKey: string): any => {
  const clonedObj = clone(object);
  const targetKey = clonedObj[key];
  delete clonedObj[key];
  clonedObj[newKey] = targetKey;
  return clonedObj;
};
