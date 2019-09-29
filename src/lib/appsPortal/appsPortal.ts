import { AppEventPortal } from '../appEventPortal/appEventPortal';
import { AppsPortalFactory } from '../factories/appsPortalFactory/appsPortalFactory';

import { NotificationStrategy } from '../constants';
import { Traces } from '../traces/traces';

interface AppsPortals {
  [keys: string]: AppEventPortal;
}

/**
 * Class to use an unique events portal system on all the micro frontend apps enabling
 * a centralized login system.
 *
 * ### Example (es module)
 * ```js
 * import { AppsPortal } from '@rproenza/micro-frontend-events-portal';
 *
 * const appsPortal = new AppsPortal();
 *
 * const appAEventPortal = appsPortal.registerApp(registrationObjectAppA);
 * appAEventPortal
 *    .listenEvent('EVENT_APP_B-ADDED-Bss') // => appAEventPortal is now listening for 'EVENT_APP_B-ADDED-Bss' events
 *    .listenEvent('EVENT_APP_B-DELETED-Bss'); // => appAEventPortal is now listening for 'EVENT_APP_B-DELETED-Bss' events
 *
 * const appBEventPortal = appsPortal.registerApp(registrationObjectAppB);
 * appBEventPortal
 *    .listenEvent('EVENT_APP_A-ADDED-Ass') // => appBEventPortal is now listening for 'EVENT_APP_A-ADDED-Ass' events
 *    .listenEvent('EVENT_APP_A-DELETED-Ass'); // => appBEventPortal is now listening for 'EVENT_APP_A-DELETED-Ass' events
 *
 * appAEventPortal.notifyEvent('EVENT_APP_A-ADDED-Ass', eventPayload); // => appBEventPortal is notified about the 'EVENT_APP_A-ADDED-Ass' event
 * appBEventPortal.notifyEvent('EVENT_APP_B-DELETED-Bss', eventPayload); // => appAEventPortal is notified about the 'EVENT_APP_B-DELETED-Bss event
 * ```
 *
 * ### Example (commonjs)
 * ```js
 * var AppsPortal = require('@rproenza/micro-frontend-events-portal').AppsPortal;
 *
 * var appsPortal = new AppsPortal();
 *
 * var appAEventPortal = appsPortal.registerApp(registrationObjectAppA);
 * appAEventPortal
 *    .listenEvent('EVENT_APP_B-ADDED-Bss') // => appAEventPortal is now listening for 'EVENT_APP_B-ADDED-Bss' events
 *    .listenEvent('EVENT_APP_B-DELETED-Bss'); // => appAEventPortal is now listening for 'EVENT_APP_B-DELETED-Bss' events
 *
 * var appBEventPortal = appsPortal.registerApp(registrationObjectAppB);
 * appBEventPortal
 *    .listenEvent('EVENT_APP_A-ADDED-Ass') // => appBEventPortal is now listening for 'EVENT_APP_A-ADDED-Ass' events
 *    .listenEvent('EVENT_APP_A-DELETED-Ass'); // => appBEventPortal is now listening for 'EVENT_APP_A-DELETED-Ass' events
 *
 * appAEventPortal.notifyEvent('EVENT_APP_A-ADDED-Ass', eventPayload); // => appBEventPortal is notified about the 'EVENT_APP_A-ADDED-Ass' event
 * appBEventPortal.notifyEvent('EVENT_APP_B-DELETED-Bss', eventPayload); // => appAEventPortal is notified about the 'EVENT_APP_B-DELETED-Bss event
 * ```
 *
 */
export class AppsPortal {
  private readonly appsPortals: AppsPortals = {};
  /**
   * @property {Traces} traceLogs - Traces instance used to save the publishing and notifying events by apps
   */
  private readonly traceLogs = new Traces();

  /**
   * Register an app into the AppsPortal.
   *
   * @param {Object} registrationObject
   * @param {string} registrationObject.appName - The name of the app to register into the portal
   * @param {NotificationStrategy} registrationObject.feedbackType - Supported strategy notification type
   * @param {function | object} registrationObject.callBack - Callback strategy to notify a given event listener on events publishing
   * @param {Traces} registrationObject.traceLogs - Traces instance used to log the publishing and listening activities of each registered app
   * @returns {AppEventPortal} Return the registered app event portal instance object
   */
  public registerApp({
    feedbackType,
    callBack,
    appName,
    traceLogs
  }: {
    feedbackType: NotificationStrategy;
    callBack: any;
    appName: string;
    traceLogs?: Traces;
  }): AppEventPortal {
    if (this.appsPortals.hasOwnProperty(appName)) {
      return this.appsPortals[appName];
    } else {
      const appEventPortal = AppsPortalFactory.create({
        appName,
        callBack,
        traceLogs: traceLogs ? traceLogs : this.traceLogs,
        type: feedbackType
      });
      // tslint:disable-next-line: no-object-mutation
      this.appsPortals[appName] = appEventPortal;

      return appEventPortal;
    }
  }

  /**
   * Return an instance of the Traces class to which the
   * app logs can be fetch.
   */
  public get logs(): Traces {
    return this.traceLogs;
  }
}
