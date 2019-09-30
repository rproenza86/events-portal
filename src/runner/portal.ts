import { AppsPortal } from '../lib/appsPortal/appsPortal';
import { NotificationStrategy } from '../lib/constants';

// tslint:disable-next-line: no-debugger
// debugger;

// tslint:disable-next-line: no-var-requires
const browserEnv = require('browser-env');
browserEnv();

// tslint:disable-next-line: no-let
let dispatchedAction: any;
const mockStore: any = {
  dispatch: (action: any) => {
    dispatchedAction = action;
  }
};

const appAName = 'SuperMicroUI';
const appBName = 'SuperMicroFrontend';

const eventParams = {
  eventPayloadA: {
    appAName,
    price: 111
  },
  eventPayloadB: {
    appBName,
    price: 999
  },
  eventType: 'TEST2_EVENT_PORTAL-SuperMicroFrontend'
};

const registrationObjectAppA = {
  appName: appAName,
  callBack: mockStore.dispatch,
  feedbackType: NotificationStrategy.CALLBACK
};
const registrationObjectAppB = {
  appName: appBName,
  callBack: mockStore,
  feedbackType: NotificationStrategy.REDUX
};

// Create portals controller
const appsPortal = new AppsPortal();

// Register app into the portals controller
const appAEventPortal = appsPortal.registerApp(registrationObjectAppA);
// Subscribe app to events of interest
appAEventPortal
  .listenEvent('EVENT_APP_B-ADDED-Bss') // => appAEventPortal is now listening for 'EVENT_APP_B-ADDED-Bss' events
  .listenEvent('EVENT_APP_B-DELETED-Bss'); // => appAEventPortal is now listening for 'EVENT_APP_B-DELETED-Bss' events

// Register app into the portals controller
const appBEventPortal = appsPortal.registerApp(registrationObjectAppB);
// Subscribe app to events of interest
appBEventPortal
  .listenEvent('EVENT_APP_A-ADDED-Ass') // => appBEventPortal is now listening for 'EVENT_APP_A-ADDED-Ass' events
  .listenEvent('EVENT_APP_A-DELETED-Ass'); // => appBEventPortal is now listening for 'EVENT_APP_A-DELETED-Ass' events

// Publishing apps events
appAEventPortal.notifyEvent('EVENT_APP_A-ADDED-Ass', eventParams.eventPayloadA); // => appBEventPortal is notified about the 'EVENT_APP_A-ADDED-Ass' event
appBEventPortal.notifyEvent(
  'EVENT_APP_B-DELETED-Bss',
  eventParams.eventPayloadB
); // => appAEventPortal is notified about the 'EVENT_APP_B-DELETED-Bss event

const appANotifiedLogs = appsPortal.logs.getAppNotifiedEvents(appAName);
/**
 * => appANotifiedLogs =
 * ```js
 *         {
 *            'EVENT_APP_B-DELETED-Bss': [{appBName:"SuperMicroFrontend", price:999}], // Events notified
 *        }
 * ```
 */
const appBPublishedLogs = appsPortal.logs.getAppPublishedEvents(appBName);
/**
 * =>
 * ```js
 *    appBPublishedLogs =
 *         {
 *            'EVENT_APP_B-DELETED-Bss': [{appBName:"SuperMicroFrontend", price:999}], // Events notified
 *        }
 * ```
 */

// tslint:disable: no-console
console.log(appANotifiedLogs, appBPublishedLogs);
console.log(dispatchedAction);
