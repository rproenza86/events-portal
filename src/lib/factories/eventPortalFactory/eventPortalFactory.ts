import { NotificationStrategy } from '../../constants';
import { EventPortal } from '../../eventPortal/eventPortal';
import { CallbackStrategy } from '../../strategies/notification/callBackStrategy';
import { ReduxStrategy } from '../../strategies/notification/reduxStrategy';

/**
 * Class factory to abstract the EventPortal instances based on
 * the notification strategy.
 *
 * Implementation of the Creational's GoF Pattern Factory Method.
 */
export class EventPortalFactory {
  /**
   * Method to create EventPortal objects
   *
   * @param {NotificationStrategy} type - Supported strategy notification type
   * @param {function | object} callBack - Callback strategy to notify a given event listener on events publishing
   */
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
