import { NotificationStrategy } from '../../../constants';
import { NotificationStrategyFoundation } from './notificationStrategyFoundation';

/**
 * Class representing the listeners notification solution.
 *
 * Abstraction supporting javascript callback patterns.
 *
 * Ex: Given an event publication the listener will be notified via
 * ```js
 *    callBack(eventData);
 * ```
 */
export class CallbackStrategy extends NotificationStrategyFoundation {
  /**
   * Creates the @CallbackStrategy object.
   *
   * @param {function} callBack - Function to execute on events publishing
   */
  constructor(callBack: (event: CustomEvent) => void) {
    super(callBack);
  }
  /**
   * Method invoked when published an event to which the listener is registered.
   *
   * @param {CustomEvent} event - Published event to send to the listener
   */
  public onNotification(event: CustomEvent): void {
    this.callBack(event);
  }

  /**
   * Method that return the event strategy name.
   */
  public getStrategyName(): string {
    return NotificationStrategy.CALLBACK;
  }
}
