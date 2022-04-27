import {
  attachOrExtendParam,
  addApiKeyToUrl,
  insertParamToUrl,
  // throttleFunction,
  setHistoryToLocalStorage,
  getHistoryFromLocalStorage,
  formatDate,
} from '../../src/utils/helper';

import {
  headlineApi,
  sourceApi,
} from '../../src/utils/api';

describe('test url functions', () => {
  describe('test param extension', () => {
    const urlWithParam = `${sourceApi}/?lang=us`;
    const urlWithoutParam = `${sourceApi}/more-url`;
    it('test to extend url', () => {
      expect(attachOrExtendParam(urlWithParam)).toBe('&');
    });

    it('test to attach param', () => {
      expect(attachOrExtendParam(urlWithoutParam)).toBe('?');
    });
  });

  describe('test attachment of api key to url', () => {
    const urlWithParam = `${sourceApi}/?lang=us`;
    it('test correct inclusion of apikey', () => {
      expect(addApiKeyToUrl(urlWithParam, 'abc')).toBe(`${sourceApi}/?lang=us&apiKey=abc`);
    });
  });

  describe('test search extension', () => {
    it('test to return search param added', () => {
      expect(insertParamToUrl(headlineApi, 'q=searchtext')).toBe('top-headlines?country=us&q=searchtext');
    });

    it('test to return undefined param', () => {
      expect(insertParamToUrl(headlineApi)).toBe('top-headlines?country=us&undefined');
    });
  });

  describe('test local storage', () => {
    const payload = {
      title: 'Test title',
      url: 'www.google.com',
    };

    it('gets empty local storage', () => {
      expect(getHistoryFromLocalStorage()).toEqual([]);
    });

    it('set local storage', () => {
      setHistoryToLocalStorage(payload);
    });

    it('get local storage', () => {
      expect(getHistoryFromLocalStorage()[0]).toHaveProperty('title', 'url', 'time');
    });
  });

  describe('test date transform', () => {
    it('show correct date format', () => {
      expect(formatDate('2022-04-27T18:31:51.226Z')).toEqual('2022-04-28');
    });
  });
});
