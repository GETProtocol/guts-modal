import Ember from 'ember';
import { moduleFor, test } from 'ember-qunit';

moduleFor('service:modal', 'Unit | Service | modal', {
});

test('it exists', function(assert) {
  let service = this.subject();
  assert.ok(service);
});

test('it is invisible by default', function(assert) {
  let service = this.subject();
  assert.notOk(service.get("isVisible"));
});

test('it becomes visible through show()', function(assert) {
  let service = this.subject();
  service.show();
  assert.ok(service.get("isVisible"));
});

test("it has a promise that results in success", function(assert) {
  assert.expect(1);
  let service = this.subject();
  service.show().then(() => {
    assert.ok(true);
  }).catch(() => {
    assert.notOk(true);
  });
  Ember.run(() => {
    service.success();
  });
});

test("it has a promise that results in failure", function(assert) {
  assert.expect(1);
  let service = this.subject();
  service.show().then(() => {
    assert.notOk(true);
  }).catch(() => {
    assert.ok(true);
  });
  Ember.run(() => {
    service.failure();
  });
});

test("it clears the component when hidden", function(assert) {
  assert.expect(2);
  let service = this.subject();
  service.show("some-component", {some:"data"});
  assert.equal(service.get("component"), "some-component");
  service.hide();
  assert.equal(service.get("component"), null);
});
