export const clone = (object: any) => Object.assign({}, object);

export const renameKey = (object: any, key: string, newKey: string): any => {
  const value = object[key];
  delete object[key];
  object[newKey] = value;
  return object;
};

export const sortObjectByKey = (unordered: any) => {
  let ordered: any;
  ordered = {};
  Object.keys(unordered)
    .sort()
    .forEach(function(key) {
      ordered[key] = unordered[key];
    });
  return ordered;
};
