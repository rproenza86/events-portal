import test from 'ava';
import { NotificationStrategy } from '../../constants';
import {
  EventFoundation,
  EventFoundationConstructorParams
} from '../../eventFoundation/EventFoundation';
import { ReduxStrategy } from './reduxStrategy';

// tslint:disable: no-let
// setups
let event: EventFoundation;
let dispatchedAction: any;
const mockStore: any = {
  dispatch: (action: any) => (dispatchedAction = action)
};

test.before(() => {
  const params: EventFoundationConstructorParams = {
    eventPayload: {
      price: 10
    },
    eventType: 'TEST_EVENT'
  };

  // resets
  dispatchedAction = null;
  event = new EventFoundation(params);
});

// tests
test('Should create and return an ReduxStrategy object', t => {
  t.plan(2);

  const reduxStrategy: ReduxStrategy = new ReduxStrategy(mockStore);

  t.is(typeof reduxStrategy, 'object');
  t.is(reduxStrategy.constructor.name, 'ReduxStrategy');
});

test('Should create new Redux strategy', t => {
  const reduxStrategy: ReduxStrategy = new ReduxStrategy(mockStore);

  t.is(reduxStrategy.getStrategyName(), NotificationStrategy.REDUX);
});

test('Should invoke event listener notification method', t => {
  const reduxStrategy: ReduxStrategy = new ReduxStrategy(mockStore);
  reduxStrategy.onNotification(event.getEvent());

  t.is(dispatchedAction.type, 'TEST_EVENT');
});
