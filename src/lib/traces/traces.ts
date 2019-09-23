import { ActionType } from '../constants';

// tslint:disable: no-let
export class Traces {
  /**
   * Store the application events with the next structure:
   *
   * ```js
   * {
   *    'ShopperPlatform': { // MUI app name
   *        'published': {
   *            'SUCCESSFUL_OFFER_SAVE': [{eventDetailObject1}, {eventDetailObject2}] // Events published
   *        }
   *        'notified': undefined // undefined by default, undefined = not subscribed to any event
   *    },
   *    'IncentivesMUI': { // MUI app name
   *        'published': undefined // undefined by default, no event published
   *        'notified': {
   *            'SUCCESSFUL_PAYMENT': [{eventDetailObject3}, {eventDetailObject6}, {eventDetailObject9}], // Events notified
   *            'INCENTIVE_SAVE_SUCCESS': [{eventDetailObject4}, {eventDetailObject22}], // Events notified
   *            'PAYMENT_FAILURE': [], // No event published
   *        }
   *    },
   *    'TestDrive': { // MUI app name
   *        'published': {
   *            'SUCCESSFUL_OFFER_SAVE': [{eventDetailObject1}, {eventDetailObject2}] // Events published
   *        }
   *        'notified': {
   *            'SUCCESSFUL_PAYMENT': [{eventDetailObject3}, {eventDetailObject6}, {eventDetailObject9}], // Events notified
   *            'INCENTIVE_SAVE_SUCCESS': [{eventDetailObject4}, {eventDetailObject22}], // Events notified
   *            'PAYMENT_FAILURE': [], // No event published
   *        }
   *    }
   * }
   * ```
   */
  private logs = new Map();

  /**
   * Method to store on the logs a publishing event type.
   *
   * @param {string} publisherName - Name of the micro frontend app or component which published the event
   * @param {CustomEvent} event - Published event
   */
  public logPublishedEvent(publisherName: string, event: CustomEvent): void {
    this.saveAppLogByActionType(publisherName, event, ActionType.Publishing);
  }

  /**
   * Method to store on the logs a notifying event type.
   *
   * @param {string} publisherName - Name of the micro frontend app or component which published the event
   * @param {CustomEvent} event - Published event
   */
  public logNotifiedEvent(subscriberName: string, event: CustomEvent): void {
    this.saveAppLogByActionType(subscriberName, event, ActionType.Notifying);
  }

  /**
   * Method to get the apps logs
   */
  public getTraceLogs(): Map<string, any> {
    return this.logs;
  }

  /**
   * Method to get the a given app logs by its name
   *
   * @param {string} appName - Name of the micro frontend app or component
   */
  public getAppTraceLogs(appName: string): Map<string, any> {
    return this.logs.get(appName);
  }

  /**
   * Return the published events log of a given app.
   *
   * @param {string} appName - Name of the micro frontend app or component
   */
  public getAppPublishedEvents(appName: string): Map<string, any> | undefined {
    return this.getAppEventsByActionType(appName, ActionType.Publishing);
  }

  /**
   * Return the notified events log of a given app.
   *
   * @param {string} appName - Name of the micro frontend app or component
   */
  public getAppNotifiedEvents(appName: string): Map<string, any> | undefined {
    return this.getAppEventsByActionType(appName, ActionType.Notifying);
  }

  /**
   * Return the published or notified events log of a given app.
   *
   * @param {string} publisherName - Name of the micro frontend app or component which published the event
   * @param {ActionType = 'published' | 'notified'} actionType The log action type
   */
  private getAppEventsByActionType(
    appName: string,
    actionType: ActionType
  ): Map<string, any> | undefined {
    const appTraceLogs = this.getAppTraceLogs(appName);
    if (appTraceLogs) {
      return appTraceLogs.get(actionType);
    } else {
      return undefined;
    }
  }

  /**
   * Save an app log into the corresponding action type section.
   *
   * @param {string} publisherName - Name of the micro frontend app or component which published the event
   * @param {CustomEvent} event - Published event
   * @param {ActionType = 'published' | 'notified'} actionType The log action type
   */
  private saveAppLogByActionType(
    appName: string,
    event: CustomEvent,
    actionType: ActionType
  ): void {
    const isPublishingTrace = actionType === ActionType.Publishing;
    const appLogs = isPublishingTrace
      ? this.getPublishedLogsByPublisherName(appName)
      : this.getNotifiedLogsByPublisherName(appName);

    const currentEventLog = appLogs.has(event.type)
      ? appLogs.get(event.type)
      : [];
    const newEventLog: readonly any[] = [...currentEventLog, event.detail];

    appLogs.set(event.type, newEventLog);

    this.updateActionTypeLogByAppName(appName, appLogs, isPublishingTrace);
  }

  /**
   * Method to get a publisher's' published events.
   *
   * @param {string} publisherName - Name of the micro frontend app or component which published the event
   */
  // TODO: Define type
  private getPublishedLogsByPublisherName(
    publisherName: string
  ): Map<string, any> {
    return this.getLogsByPublisherNameAndActionType(
      publisherName,
      ActionType.Publishing
    );
  }

  /**
   * Method to get a subscriber's notified events.
   *
   * @param {string} publisherName - Name of the micro frontend app or component which published the event
   */
  private getNotifiedLogsByPublisherName(
    publisherName: string
  ): Map<string, any> {
    return this.getLogsByPublisherNameAndActionType(
      publisherName,
      ActionType.Notifying
    );
  }

  /**
   * Method to get a subscriber notified or published events.
   *
   * @param {string} publisherName - Name of the micro frontend app or component which published the event
   * @param {ActionType} actionType - Valid trace action
   */
  private getLogsByPublisherNameAndActionType(
    publisherName: string,
    actionType: ActionType
  ): Map<string, any> {
    let publishedLogs = new Map();

    if (this.logs.has(publisherName)) {
      const currentPublisherLogs = this.logs.get(publisherName);

      if (currentPublisherLogs && currentPublisherLogs.has(actionType)) {
        publishedLogs = currentPublisherLogs.get(actionType);
      }
    }

    return publishedLogs;
  }

  /**
   * Method to update an app notified or published events log.
   *
   * @param {string} appName - Name of the micro frontend app or component which published the event
   * @param {Map<string, any>} publishedEventsMap - Map object containing the published events log for this publisher
   * @param {boolean} isPublishingTrace - Use to determine what part of the map update
   */
  private updateActionTypeLogByAppName(
    appName: string,
    publishedEventsMap: Map<string, any>,
    isPublishingTrace: boolean
  ): void {
    let newActionTypeEventsLog: Map<string, any>;
    const actionType: ActionType = isPublishingTrace
      ? ActionType.Publishing
      : ActionType.Notifying;

    if (this.logs.has(appName)) {
      newActionTypeEventsLog = this.logs.get(appName);
      if (newActionTypeEventsLog.has(actionType)) {
        newActionTypeEventsLog.set(
          actionType,
          new Map([
            ...newActionTypeEventsLog.get(actionType),
            ...publishedEventsMap
          ])
        );
      } else {
        newActionTypeEventsLog.set(actionType, publishedEventsMap);
      }
    } else {
      newActionTypeEventsLog = new Map();
      newActionTypeEventsLog.set(actionType, publishedEventsMap);
    }

    this.logs.set(appName, newActionTypeEventsLog);
  }
}
