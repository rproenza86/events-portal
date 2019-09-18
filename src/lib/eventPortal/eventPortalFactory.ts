import { NotificationStrategy } from '../constants';
import { EventPortal } from './eventPortal';
import { CallbackStrategy } from './strategies/notification/callBackStrategy';
import { ReduxStrategy } from './strategies/notification/reduxStrategy';

export class EventPortalFactory {
  public static create(type: NotificationStrategy, callBack: any): EventPortal {
    switch (type) {
      case NotificationStrategy.REDUX: {
        const strategy = new ReduxStrategy(callBack);
        return new EventPortal(strategy);
      }
      case NotificationStrategy.CALLBACK: {
        const strategy = new CallbackStrategy(callBack);
        return new EventPortal(strategy);
      }
      default:
        throw new Error('Unsupported strategy notification type.');
    }
  }
}
