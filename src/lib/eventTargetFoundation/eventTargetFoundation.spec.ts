import test from 'ava';
import {
  EventFoundation,
  EventFoundationConstructorParams
} from '../eventFoundation/eventFoundation';
import { EventTargetFoundation } from './EventTargetFoundation';

const eventName = 'TEST_EVENT';

// Mock event setup
const params: EventFoundationConstructorParams = {
  eventPayload: {
    price: 10
  },
  eventType: 'TEST_EVENT'
};
const event: EventFoundation = new EventFoundation(params);

let eventTarget: EventTargetFoundation;

test.before(() => {
  eventTarget = new EventTargetFoundation();
});

test('Should publish event properly', t => {
  let eventPublished = {} as CustomEvent;
  const eventSubscriptionHandler = (e: CustomEvent) => (eventPublished = e);

  eventTarget.subscribeEventListener(
    eventName,
    eventSubscriptionHandler as any
  );
  eventTarget.publishEvent(event.getEvent());

  t.deepEqual(eventPublished.detail, {
    price: 10
  });
});

test('Should unsubscribe event properly', t => {
  let eventPublished = {} as CustomEvent;
  function eventSubscriptionHandler(e: CustomEvent) {
    eventPublished = e;
  }

  eventTarget.subscribeEventListener(
    eventName,
    eventSubscriptionHandler as any
  );

  eventTarget.unsubscribeEventListener(
    eventName,
    eventSubscriptionHandler as any
  );

  eventTarget.publishEvent(event.getEvent());

  t.deepEqual(eventPublished.detail, undefined);
});
