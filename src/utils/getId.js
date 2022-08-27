export const getId = (url = '') => {
  const arr = url.split('/');
  const lIndex = arr.lastIndexOf('/');
  const id = arr.slice(lIndex).join('');
  return id;
};
