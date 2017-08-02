import Ember from 'ember';

const {
  Component,
  get,
  isEmpty,
  run,
  $,
  set,
  A
} = Ember;

export default Component.extend({

  items: null,
  activeItems: [],
  openMultiple: false,
  isOpenByDefault: true,

  init() {
    this._super(...arguments);
    set(this, 'activeItems', A([]));
    this.setAccordianState();
  },

  // check whether the first accordian item should be open by default
  setAccordianState() {
    if (get(this, 'isOpenByDefault')) {
      let [firstItem] = get(this, 'items');
      if (isEmpty(get(this, 'activeItems'))) {
        get(this, 'activeItems').pushObject(firstItem);
      }
    }
  },

  scrollToItem(item) {
    let index = this.get('items').indexOf(item);
    if (index > 0) {
      run.later(() => {
        let selected = $(`.accordion-details-${index}`);
        if (selected.length) {
          selected.get(0).scrollIntoView({ block: 'start', behavior: 'smooth' });
        }
      }, 10);
    }
  },

  actions: {
    toggleActiveItem(item) {
      if (get(this, 'activeItems').includes(item)) {
        get(this, 'activeItems').removeObject(item);
      } else {
        if (!get(this, 'openMultiple')) {
          get(this, 'activeItems').clear();
        }
        get(this, 'activeItems').pushObject(item);
        this.scrollToItem(item);
      }
    }
  }
});
