import Vuetify from 'vuetify';
import {
  mount,
  shallowMount,
  createLocalVue,
} from '@vue/test-utils';
import Vuex from 'vuex';
import HeadlineBox from '../../src/components/HeadlineBox.vue';
import HeadlineEditModal from '../../src/components/HeadlineEditModal.vue';
import HistoryDrawer from '../../src/components/HistoryDrawer.vue';
import LoaderWrapper from '../../src/components/LoaderWrapper.vue';
import SearchAndFilter from '../../src/components/SearchAndFilter.vue';

const vuetify = new Vuetify();
const localVue = createLocalVue();

describe('test HeadlineBox', () => {
  it('test headlinebox mount', () => {
    const wrapper = mount(HeadlineBox, {
      slots: {
        HeadlineTitle: '<div>title</div>',
        HeadlineContent: '<div>content</div>',
        HeadlineAction: '<div>action</div>',
      },
    });

    expect(wrapper.html()).toContain('<div>title</div>');
    expect(wrapper.html()).toContain('<div>content</div>');
    expect(wrapper.html()).toContain('<div>action</div>');
  });
});

describe('test HeadlineEditModal', () => {
  it('test HeadlineEditModal mount', () => {
    const wrapper = shallowMount(HeadlineEditModal, {
      props: {
        open: true,
        onHeadlineChange: () => {},
        onModalClose: () => {},
      },
      mocks: {
        $vuetify: {
          breakpoint: {},
        },
      },
    });

    expect(wrapper.html()).toMatchSnapshot();
  });
});

describe('test HistoryDrawer', () => {
  it('test HistoryDrawer mount', () => {
    const wrapper = shallowMount(HistoryDrawer, {
      props: {
        drawer: true,
      },
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

describe('test LoaderWrapper', () => {
  it('test LoaderWrapper mount', () => {
    const wrapper = shallowMount(LoaderWrapper, {
      props: {
        loading: true,
      },
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

describe('test SearchAndFilter', () => {
  let actions;
  let state;
  let store;

  beforeEach(() => {
    localVue.use(Vuex);

    state = {
      sourceList: [],
    };
    actions = {
      fetchSourceList: jest.fn(),
    };
    store = new Vuex.Store({
      actions,
      state,
    });
  });
  it('test SearchAndFilter mount', () => {
    const wrapper = shallowMount(SearchAndFilter, {
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
