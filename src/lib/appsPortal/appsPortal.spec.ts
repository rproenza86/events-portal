import test from 'ava';

import { AppEventPortal } from '../appEventPortal/appEventPortal';
import { NotificationStrategy } from '../constants';
import { EventFoundationConstructorParams } from '../eventFoundation/eventFoundation';
import { Traces } from '../traces/traces';
import { AppsPortal } from './appsPortal';

// tslint:disable: no-let
// setups
let appsPortal: AppsPortal;
const appNameA = 'SuperMicroUI';
const appNameB = 'SuperMicroFrontend';

const params2: EventFoundationConstructorParams = {
  eventPayload: {
    price: 563
  },
  eventType: 'TEST2_EVENT_PORTAL-SuperMicroFrontend'
};

let dispatchedAction: any;
const mockStore: any = {
  dispatch: (action: any) => {
    dispatchedAction = action;
  }
};

let appAEventPortal: AppEventPortal;
let appBEventPortal: AppEventPortal;

const registrationObjectAppA = {
  appName: appNameA,
  callBack: mockStore,
  feedbackType: NotificationStrategy.REDUX
};
const registrationObjectAppB = {
  appName: appNameB,
  callBack: mockStore,
  feedbackType: NotificationStrategy.REDUX
};

test.before(() => {
  appsPortal = new AppsPortal();

  appAEventPortal = appsPortal.registerApp(registrationObjectAppA);
  appBEventPortal = appsPortal.registerApp(registrationObjectAppB);
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
    registrationObjectAppA
  );
  t.is(appAEventPortal === appASingletonEventPortal, true);
});

test('Should register app with its own traceLogs instance', t => {
  const theAppsPortal = new AppsPortal();
  const registrationObjectAppAClone = {
    ...registrationObjectAppA,
    traceLogs: new Traces()
  };

  const appCloneAEventPortal = theAppsPortal.registerApp(
    registrationObjectAppAClone
  );

  t.is(appCloneAEventPortal.constructor.name, 'AppEventPortal');
});
