import test from 'ava';
import { NotificationStrategy } from '../../constants';
import {
  EventFoundation,
  EventFoundationConstructorParams
} from '../../eventFoundation/EventFoundation';
import { CallbackStrategy } from './callBackStrategy';

// tslint:disable: no-let
// setups
let event: EventFoundation;
let dispatchedAction: any;
const mockCallback: any = (action: any) => (dispatchedAction = action);

test.before(() => {
  const params: EventFoundationConstructorParams = {
    eventPayload: {
      price: 50
    },
    eventType: 'TEST_EVENT-CALLBACK_STRATEGY'
  };

  // resets
  dispatchedAction = null;
  event = new EventFoundation(params);
});

// tests
test('Should create and return an CallbackStrategy object', t => {
  t.plan(2);

  const reduxStrategy: CallbackStrategy = new CallbackStrategy(mockCallback);

  t.is(typeof reduxStrategy, 'object');
  t.is(reduxStrategy.constructor.name, 'CallbackStrategy');
});

test('Should create new Redux strategy', t => {
  const reduxStrategy: CallbackStrategy = new CallbackStrategy(mockCallback);

  t.is(reduxStrategy.getStrategyName(), NotificationStrategy.CALLBACK);
});

test('Should invoke event listener notification method', t => {
  const reduxStrategy: CallbackStrategy = new CallbackStrategy(mockCallback);
  reduxStrategy.onNotification(event.getEvent());

  t.is(dispatchedAction.type, 'TEST_EVENT-CALLBACK_STRATEGY');
});
