import axios from 'axios';
import Vue from 'vue';
import Vuex from 'vuex';

// api call list
import {
  headlineApi,
  sourceApi,
} from '../utils/api';
import {
  addApiKeyToUrl,
  insertParamToUrl,
} from '../utils/helper';

Vue.use(Vuex);

const axiosInstance = axios.create({
  baseURL: 'https://newsapi.org/v2/',
});

axiosInstance.interceptors.request.use((config) => {
  const customConfig = config;
  customConfig.url = `${addApiKeyToUrl(config.url, process.env.VUE_APP_NEWSAPI_API_KEY)}`;
  return customConfig;
}, (error) => Promise.reject(error));

export const state = {
  loading: false,
  newsHeadlineList: [],
  sourceList: [],
  sourceFilter: null,
  totalHeadlineCount: 0,
  headlineDetail: {},
};

export const mutations = {
  setHeadlineList(state, headlinePayload) {
    state.newsHeadlineList = [...headlinePayload.articles];
    state.totalHeadlineCount = headlinePayload.totalResults;
  },
  setSourceList(state, sourcePayload) {
    state.sourceList = [...sourcePayload.sources];
  },
  setFilterSource(state, sourceFilter) {
    state.sourceFilter = sourceFilter;
  },
  setViewHeadlineDetail(state, headline) {
    Object.assign(state.headlineDetail, headline);
  },
  editViewHeadline(state, {
    title,
    index,
  }) {
    const tempList = [...state.newsHeadlineList];
    const headline = tempList[index];
    headline.title = title;

    tempList.splice(index, 1, headline);
    state.newsHeadlineList = [...tempList];
  },
  setLoadingState(state, loadingState) {
    state.loading = loadingState;
  },
};

export const actions = {
  async fetchHeadlineList(context) {
    try {
      await axiosInstance.get(headlineApi).then((response) => {
        context.commit('setHeadlineList', response.data);
        context.commit('setLoadingState', false);
      });
    } catch (error) {
      console.error(error);
      context.commit('setLoadingState', false);
    }
  },
  async fetchSourceList(context) {
    try {
      await axiosInstance.get(sourceApi).then((response) => {
        context.commit('setSourceList', response.data);
        console.log(response);
      });
    } catch (error) {
      console.error(error);
    }
  },
  async fetchSearchedHeadline(context, payload) {
    try {
      await axiosInstance.get(insertParamToUrl(headlineApi, `q=${payload}`)).then((response) => {
        context.commit('setHeadlineList', response.data);
        console.log(response);
      });
    } catch (error) {
      console.error(error);
    }
  },
  async wrongApiCall() {
    try {
      return await axiosInstance.get(`${sourceApi}/s/`);
    } catch (error) {
      return new Error(
        'Error! Please check your request',
      );
    }
  },
};

export default new Vuex.Store({
  state,
  mutations,
  actions,
  modules: {},
});
