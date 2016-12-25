import Ember from 'ember';

export default Ember.Service.extend({
  isVisible: false,

  show(component, model) {
    this.set("isVisible", true);
    this.set('component', component);
    this.set('model', model);

    let defer = Ember.RSVP.defer();
    this.set('defer', defer);
    return defer.promise;
  },

  hide() {
    this.set("isVisible", false);
  },

  success() {
    let defer = this.get("defer");
    defer.resolve(...arguments);
    this.hide();
  },
  failure() {
    let defer = this.get("defer");
    defer.reject(...arguments);
    this.hide();
  }
});
