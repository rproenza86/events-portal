import test from 'ava';
import { AppEventPortal } from '../../appEventPortal/AppEventPortal';
import { NotificationStrategy } from '../../constants';
import { EventFoundationConstructorParams } from '../../eventFoundation/EventFoundation';
import { Traces } from '../../traces/traces';
import { AppsPortalFactory } from './appsPortalFactory';

// setup
// tslint:disable: no-let
const appNameA = 'AppASuperMicroUI';
const appNameB = 'AppBSuperMicroFrontend';

const params2: EventFoundationConstructorParams = {
  eventPayload: {
    price: 6454
  },
  eventType: 'TEST1_EVENT_PORTAL-AppsPortalFactory'
};

let dispatchedAction: any;
const callBack = (action: any) => {
  dispatchedAction = action;
};
const mockStore: any = {
  dispatch: callBack
};

let appAEventPortal: AppEventPortal;
let appBEventPortal: AppEventPortal;

const traceLogs = new Traces();
const registrationObjectAppA = {
  appName: appNameA,
  callBack: mockStore,
  traceLogs,
  type: NotificationStrategy.REDUX
};
const registrationObjectAppB = {
  appName: appNameB,
  callBack,
  traceLogs,
  type: NotificationStrategy.CALLBACK
};

// tests
test.before(() => {
  appAEventPortal = AppsPortalFactory.create(registrationObjectAppA);
  appBEventPortal = AppsPortalFactory.create(registrationObjectAppB);
});

test('Should publish event and notify subscriber', t => {
  t.plan(2);

  appAEventPortal.listenEvent(params2.eventType);
  appBEventPortal.notifyEvent(params2.eventType, params2.eventPayload);

  t.is(dispatchedAction.type, params2.eventType);
  t.is(dispatchedAction.price, 6454);
});

test('Should throws error when missing or unsupported the strategy "type" param', t => {
  const error = t.throws(() => {
    return AppsPortalFactory.create({
      ...registrationObjectAppB,
      type: 'FakeNotificationStrategy' as NotificationStrategy
    });
  }, Error);

  t.is(error.message, 'Unsupported strategy notification type.');
});
