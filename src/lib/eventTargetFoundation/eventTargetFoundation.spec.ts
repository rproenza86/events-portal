import test from 'ava';
import {
  EventFoundation,
  EventFoundationConstructorParams
} from '../eventFoundation/eventFoundation';
import { EventTargetFoundation } from './eventTargetFoundation';

const eventName = 'TEST_EVENT';

// Mock event setup
const params: EventFoundationConstructorParams = {
  eventPayload: {
    price: 10
  },
  eventType: 'TEST_EVENT'
};
const event: EventFoundation = new EventFoundation(params);

// tslint:disable: no-let no-object-literal-type-assertion
let eventTarget: EventTargetFoundation;

test.before(() => {
  eventTarget = new EventTargetFoundation();
});

test('Should publish event properly', t => {
  let eventPublished = {} as CustomEvent;
  const eventSubscriptionHandler = (e: CustomEvent) => (eventPublished = e);

  eventTarget.subscribeEventListener({
    listener: eventSubscriptionHandler as any,
    type: eventName
  });
  eventTarget.publishEvent(event.getEvent());

  t.deepEqual(eventPublished.detail, {
    price: 10
  });
});

test('Should unsubscribe event properly', t => {
  let eventPublished = {} as CustomEvent;
  function eventSubscriptionHandler(e: CustomEvent): void {
    eventPublished = e;
  }

  eventTarget.subscribeEventListener({
    listener: eventSubscriptionHandler as any,
    type: eventName
  });

  eventTarget.unsubscribeEventListener({
    callback: eventSubscriptionHandler as any,
    type: eventName
  });

  eventTarget.publishEvent(event.getEvent());

  t.deepEqual(eventPublished.detail, undefined);
});
