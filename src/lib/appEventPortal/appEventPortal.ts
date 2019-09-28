import {
  EventFoundation,
  EventFoundationConstructorParams
} from '../eventFoundation/eventFoundation';
import { EventPortal } from '../eventPortal/eventPortal';
import { NotificationStrategyFoundation } from '../strategies/notification/notificationStrategyFoundation';
import { Traces } from '../traces/traces';

/**
 * Children class @EventPortal which is a Controller class to abstract the events subscription and publishing actions.
 *
 * This class has the login feature as an enhancement.
 */
export class AppEventPortal extends EventPortal {
  /**
   * @property {Traces} traceLogs - Traces instance used to save the publishing and notifying events by apps
   */
  protected readonly traceLogs: Traces = new Traces();
  // Application name
  private readonly appName: string;

  /**
   * Creates AppEventPortal instance objects
   *
   * @param {Object} constructorObject
   * @param {NotificationStrategyFoundation} constructorObject.strategy - NotificationStrategyFoundation instance object to use on notification times
   * @param {string} constructorObject.appName - The application name
   * @param {Traces} constructorObject.tracesInstance -  Traces Instance object to store all the publishing and notification events
   */
  constructor({
    strategy,
    appName,
    tracesInstance
  }: {
    strategy: NotificationStrategyFoundation;
    appName: string;
    tracesInstance?: Traces;
  }) {
    super(strategy);
    this.appName = appName;
    if (tracesInstance) {
      this.traceLogs = tracesInstance;
    }
  }

  /**
   * Method to register/subscribe listeners to events. After this method execution the
   * listeners/subscribers will be notified about events occurrences using the corresponding
   * strategyCallBack.
   *
   * On event publishing, each the notification action will be logged into the traces instance.
   *
   * @param {string} eventName - The name of the event of interest
   * @param {any} strategyCallBack - Payload object with data to send into the published event
   */
  public listenEvent(
    eventName: string,
    strategyCallBack: any = this.notificationStrategy // TODO: Check how to change the 'any' for 'NotificationStrategyFoundation' as proper type
  ): EventPortal {
    const callBack = (event: any) => {
      this.traceLogs.logNotifiedEvent(this.appName, event);
      strategyCallBack.onNotification.call(strategyCallBack, event); // Avoiding scoping problems
    };

    this.eventTarget.subscribeEventListener({
      listener: callBack,
      type: eventName
    });

    return this;
  }

  /**
   * Method to publish events and notify subscribers about events occurrences.
   *
   * Each publication action will be logged into the traces instance.
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
    this.traceLogs.logPublishedEvent(this.appName, notification.getEvent());

    return this;
  }

  /**
   * Return an instance of the Traces class to which the
   * app logs can be fetch.
   */
  public get logs(): Traces {
    return this.traceLogs;
  }
}
