import { AppEventPortal } from '../appEventPortal/appEventPortal';
import { NotificationStrategyFoundation } from '../eventPortal/strategies/notification/notificationStrategyFoundation';
import { Traces } from '../traces/traces';

interface AppsPortals {
  [keys: string]: AppEventPortal;
}

/**
 * Class to use an unique events portal system on all the micro frontend apps enabling
 * a centralized login system.
 */
export class AppsPortal {
  private readonly appsPortals: AppsPortals = {};
  /**
   * @property {Traces} traceLogs - Traces instance used to save the publishing and notifying events by apps
   */
  private readonly traceLogs = new Traces();

  /**
   * Register
   *
   * @param {string} appName - App name
   * @param {NotificationStrategyFoundation} strategy - NotificationStrategyFoundation instance used on subscribe time to encapsulate notifications strategies
   */
  public registerApp(
    appName: string,
    strategy: NotificationStrategyFoundation
  ): AppEventPortal {
    if (this.appsPortals.hasOwnProperty(appName)) {
      return this.appsPortals[appName];
    } else {
      const appEventPortal = new AppEventPortal(
        strategy,
        appName,
        this.traceLogs
      );
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
