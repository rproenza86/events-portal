import {
  EventFoundation,
  EventFoundationConstructorParams
} from '../eventFoundation/eventFoundation';
import { EventTargetFoundation } from '../eventTargetFoundation/eventTargetFoundation';
import { NotificationStrategyFoundation } from '../strategies/notification/notificationStrategyFoundation';

/**
 * Controller class to abstract the events subscription and publishing actions.
 */
export class EventPortal {
  /**
   * @property {EventTargetFoundation} eventTarget - EventTargetFoundation instance used to publish/subscribe events
   */
  protected readonly eventTarget = new EventTargetFoundation();
  /**
   * @property {NotificationStrategyFoundation} notificationStrategy - NotificationStrategyFoundation instance used on subscribe time to encapsulate notifications strategies
   */
  protected readonly notificationStrategy: NotificationStrategyFoundation;

  /**
   * Creates @EventPortal objects initialized with a supported notification strategy.
   *
   * @param {NotificationStrategyFoundation} strategy - NotificationStrategyFoundation instance used on subscribe time to encapsulate notifications strategies
   */
  constructor(strategy: NotificationStrategyFoundation) {
    this.notificationStrategy = strategy;
  }

  /**
   * Getter method to retrieve the notification Strategy Type.
   *
   * Ex:
   * ```js
   *  const eventPortal = new EventPortal(reduxStrategy);
   *  eventPortal.notificationStrategyType; // return 'Redux'
   * ```
   */
  public get notificationStrategyType(): string {
    return this.notificationStrategy.getStrategyName();
  }

  /**
   * Method to publish events and notify subscribers about events occurrences.
   *
   * @param {string} eventName - The name of the event to publish
   * @param {object} eventPayload - Payload object with data to send into the published event
   */
  public notifyEvent(eventName: string, eventPayload: any): EventPortal {
    const eventConfig: EventFoundationConstructorParams = {
      eventPayload,
      eventType: eventName
    };
    const notification = new EventFoundation(eventConfig);

    this.eventTarget.publishEvent(notification.getEvent());

    return this;
  }

  /**
   * Method to register/subscribe listeners to events. After this method execution the
   * listeners/subscribers will be notified about events occurrences using the corresponding
   * strategyCallBack.
   *
   * @param {string} eventName - The name of the event of interest
   * @param {any} strategyCallBack - Payload object with data to send into the published event
   */
  public listenEvent(
    eventName: string,
    strategyCallBack: any = this.notificationStrategy // TODO: Check how to change the 'any' for 'NotificationStrategyFoundation' as proper type
  ): EventPortal {
    this.eventTarget.subscribeEventListener(
      eventName,
      strategyCallBack.onNotification.bind(strategyCallBack) // Avoiding scoping problems
    );

    return this;
  }
}
// TODO: Add unListenEvent method.
