import test from 'ava';

import { NotificationStrategy } from '../constants';
import {
  EventFoundation,
  EventFoundationConstructorParams
} from '../eventFoundation/EventFoundation';
import { ReduxStrategy } from '../strategies/notification/reduxStrategy';
import { EventPortal } from './eventPortal';

// tslint:disable: no-let
// setups
let event: EventFoundation;
let dispatchedAction: any;
let eventPortal: EventPortal;
const mockStore: any = {
  dispatch: (action: any) => {
    dispatchedAction = action;
  }
};

test.before(() => {
  const params: EventFoundationConstructorParams = {
    eventPayload: {
      price: 101
    },
    eventType: 'TEST_EVENT_PORTAL'
  };

  // resets
  dispatchedAction = null;
  event = new EventFoundation(params);

  const reduxStrategy: ReduxStrategy = new ReduxStrategy(mockStore);
  eventPortal = new EventPortal(reduxStrategy);
  eventPortal.listenEvent(params.eventType);
});

// tests
test('Should create and return an EventPortal object', t => {
  t.plan(2);
  t.is(typeof eventPortal, 'object');
  t.is(eventPortal.constructor.name, 'EventPortal');
});

test('Should create event EventPortal with Redux strategy', t => {
  t.is(eventPortal.notificationStrategyType, NotificationStrategy.REDUX);
});

test('Should publish event and notify subscriber', t => {
  t.plan(2);

  eventPortal.notifyEvent(event.eventType, event.eventPayload);

  t.is(dispatchedAction.type, 'TEST_EVENT_PORTAL');
  t.is(dispatchedAction.price, 101);
});
