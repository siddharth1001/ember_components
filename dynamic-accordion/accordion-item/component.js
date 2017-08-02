import Ember from 'ember';

const {
  Component,
  computed,
  get,
  set
} = Ember;

export default Component.extend({
  classNames: ['accordion-item'],
  item: null,
  activeItems: [],
  selectedFieldsCount: 0,

  isExpanded: computed('activeItems.[]', 'item', function() {
    return get(this, 'activeItems').includes(get(this, 'item'));
  }),

  init() {
    this._super(...arguments);
    this.setCountIfCached(get(this, 'item'));
  },

  setCountIfCached(item) {
    let count = get(item, 'count');
    set(this, 'selectedFieldsCount', count);
  }

});
