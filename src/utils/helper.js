const isSingleParamURL = (url) =>
   url.includes('?') ? '&' : '?'

const addApiKeyToUrl = (url) => `${url}${isSingleParamURL(url)}apiKey=${process.env.VUE_APP_NEWSAPI_API_KEY}`;

const insertParamToUrl = (url, searchParam) => `${url}${isSingleParamURL(url)}${searchParam}`

let throttlePause;
const throttleFunction = (callback, delay) => {
   if (throttlePause) return;
   throttlePause = true;
   setTimeout(() => {
      callback();
      throttlePause = false;
   }, delay);
}

const setHistoryToLocalStorage = (headline) => {
   const history = JSON.parse(localStorage.getItem('headlineStorageList')) || [];
   const newItem = {
      title: headline.title,
      url: headline.url,
      time: new Date()
   }
   history.push(newItem);
   localStorage.setItem('headlineStorageList', JSON.stringify(history))
}

const getHistoryFromLocalStorage = () => {
   return JSON.parse(localStorage.getItem('headlineStorageList')) || [];
}

export {
   addApiKeyToUrl,
   isSingleParamURL,
   insertParamToUrl,
   throttleFunction,
   setHistoryToLocalStorage,
   getHistoryFromLocalStorage
}