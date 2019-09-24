import test from 'ava';
import { NotificationStrategy } from '../../constants';
import { EventPortal } from '../../eventPortal/eventPortal';
import { EventPortalFactory } from './eventPortalFactory';

// tslint:disable: no-let
test('Should create and return an EventPortal object', t => {
  t.plan(2);

  const eventPortalFactory: EventPortal = EventPortalFactory.create(
    NotificationStrategy.REDUX,
    (event: CustomEvent) => event
  );

  t.is(typeof eventPortalFactory, 'object');
  t.is(eventPortalFactory.constructor.name, 'EventPortal');
});

test('Should create event EventPortal with Redux strategy', t => {
  const eventPortalFactory: EventPortal = EventPortalFactory.create(
    NotificationStrategy.REDUX,
    (event: CustomEvent) => event
  );

  t.is(eventPortalFactory.notificationStrategyType, NotificationStrategy.REDUX);
});

test('Should create event EventPortal with Callback strategy', t => {
  const eventPortalFactory: EventPortal = EventPortalFactory.create(
    NotificationStrategy.CALLBACK,
    (event: CustomEvent) => event
  );

  t.is(
    eventPortalFactory.notificationStrategyType,
    NotificationStrategy.CALLBACK
  );
});

test('Should throws error when missing or unsupported the strategy "type" param', t => {
  const error = t.throws(() => {
    return EventPortalFactory.create(
      'FakeNotificationStrategy' as NotificationStrategy,
      (event: CustomEvent) => event
    );
  }, Error);

  t.is(error.message, 'Unsupported strategy notification type.');
});
