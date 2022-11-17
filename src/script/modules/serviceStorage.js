

const getStorage = (key) => {
  let result;
  try {
    result = JSON.parse(localStorage.getItem(key));
  } catch {
    result = localStorage.getItem(key);
  }

  return result || [];
};

const setStorage = (key, newCont) => {
  const data = getStorage(key);
  data.push(newCont);
  window.localStorage.removeItem('data');
  window.localStorage.setItem('data', JSON.stringify(data));
};

const removeStorage = (phoneNumber) => {
  const data = getStorage('data');

  const newData = data.filter((elem) => phoneNumber !== elem.phone);

  window.localStorage.removeItem('data');
  window.localStorage.setItem('data', JSON.stringify(newData));
};


export default {
  setStorage,
  removeStorage,
  getStorage,
};
