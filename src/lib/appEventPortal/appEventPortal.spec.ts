import test from 'ava';

import {
  EventFoundation,
  EventFoundationConstructorParams
} from './../eventFoundation/eventFoundation';
import { ReduxStrategy } from './../strategies/notification/reduxStrategy';
import { AppEventPortal } from './appEventPortal';

// tslint:disable: no-let
// setups
let event: EventFoundation;
let dispatchedAction: any;
let appEventPortal: AppEventPortal;
const appName = 'SuperMicroUI';
const mockStore: any = {
  dispatch: (action: any) => {
    dispatchedAction = action;
  }
};

test.before(() => {
  const params: EventFoundationConstructorParams = {
    eventPayload: {
      price: 909
    },
    eventType: 'TEST_APP_EVENT_PORTAL'
  };

  // resets
  dispatchedAction = null;
  event = new EventFoundation(params);

  const reduxStrategy: ReduxStrategy = new ReduxStrategy(mockStore);
  appEventPortal = new AppEventPortal(reduxStrategy, appName);
  appEventPortal.listenEvent(params.eventType);
});

// tests
test('Should publish event and notify subscriber', t => {
  t.plan(2);

  appEventPortal.notifyEvent(event.eventType, event.eventPayload);

  t.is(dispatchedAction.type, 'TEST_APP_EVENT_PORTAL');
  t.is(dispatchedAction.price, 909);
});

test('Should log the published event', t => {
  t.plan(3);

  const logs = appEventPortal.logs.getAppPublishedEvents(appName);

  t.is(logs && logs.has('TEST_APP_EVENT_PORTAL'), true);
  t.is(logs && logs.size, 1);
  t.is(logs && logs.get('TEST_APP_EVENT_PORTAL')[0].price, 909);
});

test('Should log the notified event', t => {
  t.plan(3);

  const logs = appEventPortal.logs.getAppNotifiedEvents(appName);

  t.is(logs && logs.has('TEST_APP_EVENT_PORTAL'), true);
  t.is(logs && logs.size, 1);
  t.is(logs && logs.get('TEST_APP_EVENT_PORTAL')[0].price, 909);
});
