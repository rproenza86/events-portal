import { AppEventPortal } from '../../appEventPortal/appEventPortal';
import { NotificationStrategy } from '../../constants';
import { CallbackStrategy } from '../../strategies/notification/callBackStrategy';
import { ReduxStrategy } from '../../strategies/notification/reduxStrategy';
import { Traces } from '../../traces/traces';

/**
 * Class factory to abstract the AppEventPortal instances based on
 * the notification strategy and the app name.
 *
 * Implementation of the Creational's GoF Pattern Factory Method.
 */
export class AppsPortalFactory {
  /**
   * Method to create AppEventPortal objects
   *
   * @param {Object} registrationObject
   * @param {string} registrationObject.appName - The name of the app to register into the portal
   * @param {NotificationStrategy} registrationObject.feedbackType - Supported strategy notification type
   * @param {function | object} registrationObject.callBack - Callback strategy to notify a given event listener on events publishing
   * @param {Traces} registrationObject.traceLogs - Traces instance used to log the publishing and listening activities of each registered app
   * @returns {AppEventPortal} Return the registered app event portal instance object
   */
  // tslint:disable: no-let
  public static create({
    type,
    callBack,
    appName,
    traceLogs
  }: {
    type: NotificationStrategy;
    callBack: any;
    appName: string;
    traceLogs?: Traces;
  }): AppEventPortal {
    let strategy: ReduxStrategy | CallbackStrategy;

    switch (type) {
      case NotificationStrategy.REDUX: {
        strategy = new ReduxStrategy(callBack);
        break;
      }
      case NotificationStrategy.CALLBACK: {
        strategy = new CallbackStrategy(callBack);
        break;
      }
      default:
        throw new Error('Unsupported strategy notification type.');
    }

    return new AppEventPortal({ strategy, appName, tracesInstance: traceLogs });
  }
}
