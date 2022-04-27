import Vuetify from 'vuetify';
import {
  shallowMount,
  createLocalVue,
} from '@vue/test-utils';
import Vuex from 'vuex';
import Home from '../../src/views/Home.vue';
import Detail from '../../src/views/Detail.vue';

import {
  state,
  mutations,
  actions,
} from '../../src/store/index';

import {
  formatDate,
} from '../../src/utils/helper';

const vuetify = new Vuetify();
const localVue = createLocalVue();

describe('test Home', () => {
  let store;

  beforeEach(() => {
    localVue.use(Vuex);
    store = new Vuex.Store({
      actions,
      state,
      mutations,
    });
  });
  it('test Home mount', () => {
    const wrapper = shallowMount(Home, {
      localVue,
      store,
      mocks: {
        $vuetify: {
          breakpoint: {},
        },
      },
      vuetify,
    });

    expect(wrapper.html()).toMatchSnapshot();
  });
});

describe('test Detail', () => {
  let store;

  beforeEach(() => {
    localVue.use(Vuex);
    localVue.filter('transformDate', formatDate);

    store = new Vuex.Store({
      actions,
      state,
    });
  });
  it('test Detail mount', () => {
    const wrapper = shallowMount(Detail, {
      localVue,
      store,
      mocks: {
        $vuetify: {
          breakpoint: {},
        },
      },
      vuetify,
    });

    expect(wrapper.html()).toMatchSnapshot();
  });
});
