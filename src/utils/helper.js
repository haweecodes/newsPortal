const attachOrExtendParam = (url) => (url.includes('?') ? '&' : '?');

const addApiKeyToUrl = (url, apiKey) => `${url}${attachOrExtendParam(url)}apiKey=${apiKey}`;

const insertParamToUrl = (url, searchParam) => `${url}${attachOrExtendParam(url)}${searchParam}`;

let throttlePause;
const throttleFunction = (callback, delay) => {
  if (throttlePause) return;
  throttlePause = true;
  setTimeout(() => {
    callback();
    throttlePause = false;
  }, delay);
};

const setHistoryToLocalStorage = (headline) => {
  const history = JSON.parse(localStorage.getItem('headlineStorageList')) || [];
  const newItem = {
    title: headline.title,
    url: headline.url,
    time: new Date(),
  };
  history.push(newItem);
  localStorage.setItem('headlineStorageList', JSON.stringify(history));
};

const getHistoryFromLocalStorage = () => JSON.parse(localStorage.getItem('headlineStorageList')) || [];

export {
  attachOrExtendParam,
  addApiKeyToUrl,
  insertParamToUrl,
  throttleFunction,
  setHistoryToLocalStorage,
  getHistoryFromLocalStorage,
};
