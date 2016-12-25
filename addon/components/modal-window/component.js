import Ember from 'ember';
import layout from './template';

export default Ember.Component.extend({
  layout: layout,
  tagName: 'div',
  component: Ember.computed.alias('service.component'),
  model: Ember.computed.alias('service.model'),
  isVisible: Ember.computed.alias('service.isVisible'),

  success() {
    let modal = this.get("service");
    modal.success(...arguments);
  },
  failure() {
    let modal = this.get("service");
    modal.failure(...arguments);
  }

});
