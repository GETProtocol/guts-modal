import Ember from 'ember';
import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import testSelector from 'dummy/tests/helpers/ember-test-selectors';

moduleForComponent('modal-window', 'Integration | Component | modal window', {
  integration: true,
  beforeEach() {
    let owner = Ember.getOwner(this);
    let DummyComponent = Ember.Component.extend(
      {tagName: 'dummy',
       layout: hbs`injected component<button data-test-ok {{action "ok"}}></button><button data-test-cancel {{action "cancel"}}></button>`,
       actions: {
         ok() { this.get('success')(); },
         cancel() { this.get('failure')(); }
       }
       });
    owner.register('component:test-component', DummyComponent);
  }
});

test('it renders', function(assert) {

  this.render(hbs`{{modal-window}}`);

  assert.equal(this.$().text().trim(), '');

});

test('it includes a component from service', function(assert) {

  let dummy = Ember.Service.extend({
    component: 'test-component',
    model: {}
  }).create();
  // debugger;
  this.set('service', dummy);
  this.render(hbs`{{modal-window service=service}}`);
  assert.equal(this.$('dummy').length, 1);
  assert.equal(this.$().text().trim(), 'injected component');
});

test('it handles okay clicks', function(assert) {
  assert.expect(1);

  let dummy = Ember.Service.extend({
    component: 'test-component',
    model: {},
    success() {
      assert.ok(true);
    },
    failure() {
      assert.notOk(true);
    }
  }).create();
  this.set('service', dummy);
  this.render(hbs`{{modal-window service=service}}`);
  this.$(testSelector('ok')).click();
});

test('it handles cancel clicks', function(assert) {
  assert.expect(1);

  let dummy = Ember.Service.extend({
    component: 'test-component',
    model: {},
    success() {
      assert.notOk(true);
    },
    failure() {
      assert.ok(true);
    }
  }).create();
  this.set('service', dummy);
  this.render(hbs`{{modal-window service=service}}`);
  this.$(testSelector('cancel')).click();

});
