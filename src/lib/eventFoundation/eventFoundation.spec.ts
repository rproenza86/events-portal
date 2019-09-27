import test from 'ava';
import {
  EventFoundation,
  EventFoundationConstructorParams
} from './eventFoundation';

// tslint:disable-next-line: no-let
let event: EventFoundation;

test.before(() => {
  const params: EventFoundationConstructorParams = {
    eventPayload: {
      price: 10
    },
    eventType: 'TEST_EVENT'
  };

  event = new EventFoundation(params);
});

test('Should create object', t => {
  t.is(typeof event, 'object');
});

test('Should create EventFoundation object', t => {
  t.is(event.constructor.name, 'EventFoundation');
});

test('Should return the eventType', t => {
  t.is(event.eventType, 'TEST_EVENT');
});

test('Should return the eventPayload', t => {
  t.deepEqual(event.eventPayload, {
    price: 10
  });
});

test('Should return the event object', t => {
  const myCustomEvent = event.getEvent();

  t.plan(2);

  t.deepEqual(myCustomEvent.detail, {
    price: 10
  });

  t.deepEqual(myCustomEvent.type, 'TEST_EVENT');
});

test('Should throws error when missing the "eventType" param', t => {
  const error = t.throws(() => {
    // tslint:disable-next-line: no-object-literal-type-assertion
    const emptyObject = {} as EventFoundationConstructorParams;
    const testThrow = new EventFoundation(emptyObject);
    return testThrow;
  }, Error);

  t.is(
    error.message,
    'Error instantiating EventFoundation\'s class. Missing "eventType" param.'
  );
});
