import test from 'ava';

import { AppEventPortal } from '../appEventPortal/AppEventPortal';
import {
  // EventFoundation,
  EventFoundationConstructorParams
} from '../eventFoundation/EventFoundation';
import { ReduxStrategy } from '../strategies/notification/reduxStrategy';
import { AppsPortal } from './AppsPortal';

// tslint:disable: no-let
// setups
let appsPortal: AppsPortal;
const appNameA = 'SuperMicroUI';
const appNameB = 'SuperMicroFrontend';

// const params1: EventFoundationConstructorParams = {
//   eventPayload: {
//     price: 867
//   },
//   eventType: 'TEST1_EVENT_PORTAL-SuperMicroUI'
// };
// const event1 = new EventFoundation(params1);

const params2: EventFoundationConstructorParams = {
  eventPayload: {
    price: 563
  },
  eventType: 'TEST2_EVENT_PORTAL-SuperMicroFrontend'
};
// const event2 = new EventFoundation(params2);

let dispatchedAction: any;
const mockStore: any = {
  dispatch: (action: any) => {
    dispatchedAction = action;
  }
};

let appAEventPortal: AppEventPortal;
let appBEventPortal: AppEventPortal;

let reduxStrategy: ReduxStrategy;

test.before(() => {
  reduxStrategy = new ReduxStrategy(mockStore);
  appsPortal = new AppsPortal();

  appAEventPortal = appsPortal.registerApp(appNameA, reduxStrategy);
  appBEventPortal = appsPortal.registerApp(appNameB, reduxStrategy);
});

// tests
test('Should publish event and notify subscriber', t => {
  t.plan(2);

  appAEventPortal.listenEvent(params2.eventType);
  appBEventPortal.notifyEvent(params2.eventType, params2.eventPayload);

  t.is(dispatchedAction.type, params2.eventType);
  t.is(dispatchedAction.price, 563);
});

test('Should have logs accessible from the appsPortal instance', t => {
  t.plan(3);

  const logs = appsPortal.logs.getTraceLogs();

  t.is(logs && logs.size, 2);
  t.is(logs && logs.has(appNameA), true);
  t.is(logs && logs.has(appNameB), true);
});

test('Should have logged the appNameA notified events', t => {
  t.plan(2);

  const appANotifiedEvents = appsPortal.logs.getAppNotifiedEvents(appNameA);
  t.is(appANotifiedEvents && appANotifiedEvents.has(params2.eventType), true);
  t.is(
    appANotifiedEvents && appANotifiedEvents.get(params2.eventType)[0].price,
    563
  );
});

test('Should have logged the appNameB published events', t => {
  t.plan(2);

  const appBPublishedEvents = appsPortal.logs.getAppPublishedEvents(appNameB);
  t.is(appBPublishedEvents && appBPublishedEvents.has(params2.eventType), true);
  t.is(
    appBPublishedEvents && appBPublishedEvents.get(params2.eventType)[0].price,
    563
  );
});

test('Should not have logged the appNameB notified events', t => {
  const appBNotifiedEvents = appsPortal.logs.getAppNotifiedEvents(appNameB);
  t.is(appBNotifiedEvents, undefined);
});

test('Should not have logged the appNameA published events', t => {
  const appAPublishedEvents = appsPortal.logs.getAppPublishedEvents(appNameA);
  t.is(appAPublishedEvents, undefined);
});

test('Should not register the same app twice', t => {
  const appASingletonEventPortal = appsPortal.registerApp(
    appNameA,
    reduxStrategy
  );
  t.is(appAEventPortal === appASingletonEventPortal, true);
});
