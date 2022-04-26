import Vuetify from 'vuetify';
import {
  mount,
  shallowMount,
} from '@vue/test-utils';
import HeadlineBox from '../../src/components/HeadlineBox.vue';
import HeadlineEditModal from '../../src/components/HeadlineEditModal.vue';
import HistoryDrawer from '../../src/components/HistoryDrawer.vue';

const vuetify = new Vuetify();

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
