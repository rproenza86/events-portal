import test from 'ava';
// import { ActionType } from '../constants';
import {
  EventFoundation,
  EventFoundationConstructorParams
} from '../eventFoundation/EventFoundation';
import { Traces } from './traces';

// tslint:disable: no-let

// setup
let traceLogs: Traces;
const appA = 'ShopperPlatform';
const appB = 'TestDrive';
const appC = 'Incentive';

const params1: EventFoundationConstructorParams = {
  eventPayload: {
    price: 101
  },
  eventType: 'TEST1_EVENT_PORTAL-'
};
const event1 = new EventFoundation(params1);

const params2: EventFoundationConstructorParams = {
  eventPayload: {
    price: 303
  },
  eventType: 'TEST2_EVENT_PORTAL'
};
const event2 = new EventFoundation(params2);

test.before(() => {
  traceLogs = new Traces();
});

test('Should create and return an Traces object', t => {
  t.plan(2);
  t.is(typeof traceLogs, 'object');
  t.is(traceLogs.constructor.name, 'Traces');
});

test('Should not have any log', t => {
  t.is(traceLogs.getTraceLogs().size, 0);
});

test('Should log a publishing event', t => {
  t.plan(3);

  traceLogs.logPublishedEvent(appA, event1.getEvent());
  t.is(traceLogs.getTraceLogs().size, 1);
  t.is(traceLogs.getTraceLogs().has(appA), true);

  const appAPublishedEvents = traceLogs.getAppPublishedEvents(appA) as Map<
    string,
    any
  >;
  t.is(appAPublishedEvents.has(params1.eventType), true);
});

test('Should log a notifying event', t => {
  t.plan(5);

  traceLogs.logNotifiedEvent(appB, event1.getEvent());
  t.is(traceLogs.getTraceLogs().size, 2);
  t.is(traceLogs.getTraceLogs().has(appB), true);

  const appAPublishedEvents = traceLogs.getAppNotifiedEvents(appB) as Map<
    string,
    any
  >;
  t.is(appAPublishedEvents.has(params1.eventType), true);
  t.deepEqual(appAPublishedEvents.get(params1.eventType)[0], { price: 101 });
  t.is(appAPublishedEvents.get(params1.eventType).length, 1);
});

test("Should get the TestDrive's app notified events", t => {
  const appNotifiedEvents = traceLogs.getAppNotifiedEvents(appB) as Map<
    string,
    any
  >;
  t.is(appNotifiedEvents.has(params1.eventType), true);
});

test("Should return undefined TestDrive's app published events", t => {
  const appNotifiedEvents = traceLogs.getAppPublishedEvents(appB) as Map<
    string,
    any
  >;
  t.is(appNotifiedEvents, undefined);
});

test("Should return undefined Incentive's app published events", t => {
  const appNotifiedEvents = traceLogs.getAppPublishedEvents(appC) as Map<
    string,
    any
  >;
  t.is(appNotifiedEvents, undefined);
});

test("Should save a second notification on TestDrive's app notified events log", t => {
  traceLogs.logNotifiedEvent(appB, event1.getEvent());
  const appNotifiedEvents = traceLogs.getAppNotifiedEvents(appB) as Map<
    string,
    any
  >;
  t.is(appNotifiedEvents.get(params1.eventType).length, 2);
});

test('Should log a notifying event into TestDrive events log', t => {
  t.plan(3);

  traceLogs.logPublishedEvent(appB, event2.getEvent());

  const appBNotifiedEvents = traceLogs.getAppPublishedEvents(appB) as Map<
    string,
    any
  >;
  t.is(appBNotifiedEvents.has(params2.eventType), true);
  t.is(appBNotifiedEvents.get(params2.eventType).length, 1);
  t.deepEqual(appBNotifiedEvents.get(params2.eventType)[0], { price: 303 });
});
